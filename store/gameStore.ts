import { create } from "zustand";
import { GameState, Player, Role, WordPair, GamePhase } from "@/types/game";
import { shuffleArray } from "@/lib/utils";

interface GameStore extends GameState {
  // Actions
  setPhase: (phase: GamePhase) => void;
  initializePlayers: (count: number) => void;
  assignRoles: (
    wordPair: WordPair,
    undercoverCount?: number,
    mrWhiteCount?: number
  ) => void;
  nextPlayer: () => void;
  setPlayerClueGiven: (playerId: string) => void;
  eliminatePlayer: (playerId: string) => void;
  checkVictoryCondition: () => void;
  resetGame: () => void;
  updateSettings: (settings: Partial<GameState["settings"]>) => void;
  setWordPair: (wordPair: WordPair) => void;
  updatePlayerNames: (names: string[]) => void;
}

const avatars = ["👤", "👨", "👩", "🧑", "👴", "👵", "🧔", "👱", "🧓", "👨‍🦱"];

const generatePlayers = (count: number): Player[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `player-${i}`,
    name: `Player ${i + 1}`,
    role: "civilian" as Role,
    word: null,
    isAlive: true,
    hasGivenClue: false,
    avatar: avatars[i % avatars.length],
  }));
};

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  phase: "home",
  players: [],
  currentPlayerIndex: 0,
  currentRound: 1,
  wordPair: null,
  eliminatedPlayer: null,
  winner: null,
  settings: {
    difficulty: "medium",
    soundEnabled: true,
    theme: "dark",
  },

  // Actions
  setPhase: (phase) => set({ phase }),

  initializePlayers: (count) => {
    const players = generatePlayers(count);
    set({ players, currentPlayerIndex: 0, currentRound: 1 });
  },

  assignRoles: (wordPair, undercoverCount = 1, mrWhiteCount = 1) => {
    const { players } = get();
    const shuffledPlayers = shuffleArray(players);

    // Separate players by role
    const roleAssignments: {
      player: Player;
      role: Role;
      word: string | null;
    }[] = [];

    // Add undercover players
    for (let i = 0; i < undercoverCount; i++) {
      roleAssignments.push({
        player: shuffledPlayers[i],
        role: "undercover" as Role,
        word: wordPair.undercover_word,
      });
    }

    // Add Mr. White players
    for (let i = 0; i < mrWhiteCount; i++) {
      roleAssignments.push({
        player: shuffledPlayers[undercoverCount + i],
        role: "mrwhite" as Role,
        word: null,
      });
    }

    // Add civilian players
    for (
      let i = undercoverCount + mrWhiteCount;
      i < shuffledPlayers.length;
      i++
    ) {
      roleAssignments.push({
        player: shuffledPlayers[i],
        role: "civilian" as Role,
        word: wordPair.civilian_word,
      });
    }

    // Shuffle all role assignments
    let shuffledRoles = shuffleArray(roleAssignments);

    // Create updated players array with randomized order
    const updatedPlayers = shuffledRoles.map(({ player, role, word }) => ({
      ...player,
      role,
      word,
    }));

    // CRITICAL: Ensure the first player (player-0 / Player 1) NEVER gets Mr. White role
    const firstPlayerIndex = updatedPlayers.findIndex(
      (p) => p.id === "player-0"
    );
    if (
      firstPlayerIndex !== -1 &&
      updatedPlayers[firstPlayerIndex].role === "mrwhite"
    ) {
      // Find any non-white player to swap with
      const nonWhiteIndex = updatedPlayers.findIndex(
        (p) => p.role !== "mrwhite"
      );
      if (nonWhiteIndex !== -1) {
        // Swap roles and words between first player and non-white player
        const tempRole = updatedPlayers[firstPlayerIndex].role;
        const tempWord = updatedPlayers[firstPlayerIndex].word;

        updatedPlayers[firstPlayerIndex].role =
          updatedPlayers[nonWhiteIndex].role;
        updatedPlayers[firstPlayerIndex].word =
          updatedPlayers[nonWhiteIndex].word;

        updatedPlayers[nonWhiteIndex].role = tempRole;
        updatedPlayers[nonWhiteIndex].word = tempWord;
      }
    }

    set({ players: updatedPlayers, wordPair });
  },

  nextPlayer: () => {
    const { currentPlayerIndex, players } = get();
    const alivePlayers = players.filter((p) => p.isAlive);
    const nextIndex = (currentPlayerIndex + 1) % alivePlayers.length;
    set({ currentPlayerIndex: nextIndex });
  },

  setPlayerClueGiven: (playerId) => {
    const { players } = get();
    const updatedPlayers = players.map((p) =>
      p.id === playerId ? { ...p, hasGivenClue: true } : p
    );
    set({ players: updatedPlayers });
  },

  eliminatePlayer: (playerId) => {
    const { players } = get();
    const updatedPlayers = players.map((p) =>
      p.id === playerId ? { ...p, isAlive: false } : p
    );
    const eliminatedPlayer = players.find((p) => p.id === playerId) || null;
    set({ players: updatedPlayers, eliminatedPlayer });
  },

  checkVictoryCondition: () => {
    const { players } = get();
    const alivePlayers = players.filter((p) => p.isAlive);

    const undercoverAlive = alivePlayers.filter(
      (p) => p.role === "undercover"
    ).length;
    const mrWhiteAlive = alivePlayers.filter(
      (p) => p.role === "mrwhite"
    ).length;
    const civiliansAlive = alivePlayers.filter(
      (p) => p.role === "civilian"
    ).length;
    const infiltratorsAlive = undercoverAlive + mrWhiteAlive;

    // Civilians win if ALL infiltrators are eliminated (both Undercover AND Mr. White)
    if (infiltratorsAlive === 0 && civiliansAlive > 0) {
      console.log("✓ Civilians win - all infiltrators eliminated");
      set({ winner: "civilians", phase: "victory" });
      return;
    }

    // Infiltrators win if only 1 civilian is left
    if (civiliansAlive === 1 && infiltratorsAlive > 0) {
      console.log("✓ Infiltrators win - only 1 civilian remains");
      set({ winner: "infiltrators", phase: "victory" });
      return;
    }

    // No victory condition met - game continues
    console.log(
      `Game continues - Civilians: ${civiliansAlive}, Infiltrators: ${infiltratorsAlive}`
    );
  },

  resetGame: () => {
    set({
      phase: "home",
      players: [],
      currentPlayerIndex: 0,
      currentRound: 1,
      wordPair: null,
      eliminatedPlayer: null,
      winner: null,
    });
  },

  updateSettings: (newSettings) => {
    const { settings } = get();
    set({ settings: { ...settings, ...newSettings } });
  },

  setWordPair: (wordPair) => {
    set({ wordPair });
  },

  updatePlayerNames: (names) => {
    const { players } = get();
    const updatedPlayers = players.map((player, index) => ({
      ...player,
      name: names[index] || player.name,
    }));
    set({ players: updatedPlayers });
  },
}));
