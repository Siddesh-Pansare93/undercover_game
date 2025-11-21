# 🔑 How to Set Up Your Gemini API Key

## ⚠️ **Currently Using Fallback Words**

Your game is working, but it's using the 30 pre-configured fallback words instead of AI-generated words.

To enable AI-generated words, follow these steps:

---

## 📝 Step 1: Get Your API Key

1. Go to **[Google AI Studio](https://makersuite.google.com/app/apikey)**
2. Sign in with your Google account
3. Click **"Create API Key"** or **"Get API Key"**
4. Copy the key (looks like: `AIzaSyD...`)

---

## 📝 Step 2: Create `.env.local` File

### Option A: Using Windows File Explorer

1. Open File Explorer
2. Navigate to: `C:\temp-projects\undercover\`
3. Right-click → New → Text Document
4. Name it `.env.local` (yes, the dot at the start is important!)
5. Windows might warn about changing the extension - click "Yes"
6. Open the file with Notepad
7. Add this line:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=YOUR_ACTUAL_KEY_HERE
   ```
8. Replace `YOUR_ACTUAL_KEY_HERE` with your actual API key
9. Save and close

### Option B: Using Command Line

```bash
cd C:\temp-projects\undercover

# Create the file (PowerShell)
echo "NEXT_PUBLIC_GEMINI_API_KEY=YOUR_ACTUAL_KEY_HERE" > .env.local

# OR using Git Bash
echo "NEXT_PUBLIC_GEMINI_API_KEY=YOUR_ACTUAL_KEY_HERE" > .env.local
```

**Replace `YOUR_ACTUAL_KEY_HERE` with your real API key!**

### Example `.env.local` file:
```
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXX
```

---

## 📝 Step 3: Restart the Dev Server

1. **Stop the current server:**
   - Press `Ctrl+C` in the terminal

2. **Start it again:**
   ```bash
   npm run dev
   ```

3. **Wait for "Ready in X.Xs"**

---

## 📝 Step 4: Verify It's Working

### Check Browser Console:

1. Open your game: `http://localhost:3000`
2. Press **F12** (opens DevTools)
3. Go to **Console** tab
4. Click **"New Game"**
5. Choose settings and click **"Start Game"**

### Look for these logs:

✅ **SUCCESS - You should see:**
```
=== GEMINI API DEBUG ===
NEXT_PUBLIC_GEMINI_API_KEY: YES
Final geminiApiKey: YES (AIzaSyD...)
✓ API Key found, attempting Gemini API call...
Initializing GoogleGenAI client...
Calling Gemini model: gemini-2.5-flash...
✓ Gemini API call successful
✓ Successfully generated word pair from Gemini!
```

❌ **STILL USING FALLBACK - You'll see:**
```
=== GEMINI API DEBUG ===
NEXT_PUBLIC_GEMINI_API_KEY: NO
Final geminiApiKey: NO
⚠️  NO API KEY FOUND - Using fallback words
```

---

## 🔍 Troubleshooting

### Issue 1: "NEXT_PUBLIC_GEMINI_API_KEY: NO"

**Fix:**
- Check `.env.local` file exists in root folder: `C:\temp-projects\undercover\.env.local`
- Check spelling: Must be exactly `NEXT_PUBLIC_GEMINI_API_KEY`
- Check there's no space before/after the `=`
- Restart the dev server after creating the file

### Issue 2: File not found / Can't create `.env.local`

**Fix (Windows):**
```bash
# Use Git Bash or PowerShell
cd C:\temp-projects\undercover

# Create the file
New-Item -Path ".env.local" -ItemType File -Force

# Then edit it with Notepad
notepad .env.local
```

### Issue 3: "API call failed" or errors

**Fix:**
- Check your API key is valid
- Go to [Google AI Studio](https://makersuite.google.com/app/apikey) and create a new one
- Make sure you copied the entire key (no spaces)
- Try a different browser

### Issue 4: Still seeing fallback words

**Fix:**
1. Check the `.env.local` file contents:
   ```bash
   cat .env.local
   # Should show: NEXT_PUBLIC_GEMINI_API_KEY=AIza...
   ```

2. Make sure server was restarted

3. Clear browser cache:
   - Press `Ctrl+Shift+Delete`
   - Clear "Cached images and files"
   - Refresh page

---

## 🎯 Quick Test Commands

### Check if file exists:
```bash
cd C:\temp-projects\undercover
dir .env.local
# Should show the file
```

### Check file contents:
```bash
type .env.local
# Should show: NEXT_PUBLIC_GEMINI_API_KEY=...
```

### Check environment in code:
Add this temporarily to `app/api/generate-words/route.ts` line 54:
```typescript
console.log('All env vars:', Object.keys(process.env).filter(k => k.includes('GEMINI')));
```

---

## 💡 Alternative: Use UI Input

Don't want to create `.env.local`? You can enter the API key via the UI:

1. Go to Setup screen
2. Click **"Configure"** next to "AI Word Generator"
3. Enter your API key in the input box
4. Start the game

**Note:** This only works for that session. Using `.env.local` is permanent!

---

## 🔒 Security Note

- `.env.local` is in `.gitignore` - won't be committed to git
- `NEXT_PUBLIC_` means it's exposed to browser (this is OK for Gemini)
- For production, consider using environment variables in hosting platform

---

## ✅ Success Checklist

- [ ] Got API key from Google AI Studio
- [ ] Created `.env.local` file in project root
- [ ] File contains `NEXT_PUBLIC_GEMINI_API_KEY=YOUR_KEY`
- [ ] Replaced `YOUR_KEY` with actual API key
- [ ] Restarted dev server (`Ctrl+C`, then `npm run dev`)
- [ ] Console shows "YES" for API key
- [ ] Console shows "✓ Successfully generated word pair from Gemini!"
- [ ] Response has `"source": "gemini"`

---

## 🎮 Still Works Without API Key!

**Don't worry!** The game works perfectly with the 30 fallback words:
- Curated and tested word pairs
- Instant (no API delay)
- No internet required
- No setup needed

AI generation just adds variety and uniqueness to each game!

---

**Need more help?** Check `GEMINI_SETUP.md` for advanced debugging!

