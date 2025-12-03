# Fixing Dependencies Error in VSCode

## Common Errors & Solutions

### 1. **"Cannot find module" Error**
**Error message:** `Cannot find module 'leaflet'` or similar

**Solutions:**
\`\`\`bash
# Option 1: Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install

# Option 2: On Windows, use this instead
npm cache clean --force
rmdir /s /q node_modules
npm install
\`\`\`

---

### 2. **"peer dep missing" or "ERESOLVE" Error**
**Error message:** `ERESOLVE unable to resolve dependency tree`

**Solutions:**
\`\`\`bash
# Option 1: Force install (recommended for Next.js)
npm install --legacy-peer-deps

# Option 2: Upgrade npm first
npm install -g npm@latest
npm install
\`\`\`

---

### 3. **Port 3000 Already in Use**
**Error message:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solutions:**
\`\`\`bash
# Option 1: Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Option 2: Use different port
npm run dev -- -p 3001

# Option 3: Mac/Linux
lsof -i :3000
kill -9 [PID]
\`\`\`

---

### 4. **TypeScript Errors in VSCode**
**Error message:** Red squiggly lines under imports

**Solutions:**
\`\`\`bash
# Option 1: Reload VSCode
# Press Ctrl+Shift+P → type "Developer: Reload Window"

# Option 2: Delete TypeScript cache
rm -rf .next
npm run dev

# Option 3: Windows - delete .next folder
rmdir /s /q .next
npm run dev
\`\`\`

---

### 5. **Tailwind CSS Not Loading**
**Error:** Styles not applied, dark theme not working

**Solutions:**
\`\`\`bash
# Rebuild Tailwind
npx tailwindcss -i ./app/globals.css -o ./app/output.css

# Clear cache
rm -rf .next node_modules/.cache
npm run dev
\`\`\`

---

### 6. **Leaflet Not Working (Map Page Error)**
**Error:** `Cannot find module 'leaflet'` or map errors

**Solutions:**
\`\`\`bash
# Reinstall Leaflet and React-Leaflet
npm uninstall leaflet react-leaflet @types/leaflet
npm install leaflet react-leaflet @types/leaflet
npm run dev
\`\`\`

---

## Step-by-Step Nuclear Option (Last Resort)

If nothing works, do this:

### **Windows:**
\`\`\`bash
# 1. Close VSCode completely
# 2. Delete these folders
rmdir /s /q node_modules
del package-lock.json

# 3. Clear npm cache
npm cache clean --force

# 4. Reinstall everything
npm install --legacy-peer-deps

# 5. Run dev server
npm run dev
\`\`\`

### **Mac/Linux:**
\`\`\`bash
# 1. Close VSCode completely
# 2. Delete these folders
rm -rf node_modules
rm package-lock.json

# 3. Clear npm cache
npm cache clean --force

# 4. Reinstall everything
npm install --legacy-peer-deps

# 5. Run dev server
npm run dev
\`\`\`

---

## Verify Installation

After fixing, check:

\`\`\`bash
# Check if node_modules exists
ls node_modules  # (Mac/Linux)
dir node_modules  # (Windows)

# Check npm version
npm -v

# Check Node version (should be v18 or higher)
node -v

# Verify key packages installed
npm list leaflet
npm list react-leaflet
npm list next
\`\`\`

---

## Quick Diagnostic

Run this to see what's wrong:

\`\`\`bash
npm list --depth=0
\`\`\`

This shows all top-level packages and any errors.

---

## VSCode Settings to Help

1. **Disable ESLint temporarily** (if it's showing errors)
   - Press `Ctrl+Shift+P` → Search "ESLint: Disable"

2. **Restart TypeScript Server**
   - Press `Ctrl+Shift+P` → Search "TypeScript: Restart TS Server"

3. **Check Terminal Output**
   - Open VSCode Terminal: `Ctrl+` (backtick)
   - Run `npm run dev` and watch for specific error messages

---

## If Still Stuck

Tell me the **exact error message** you see and I'll help you fix it!

Common places to check:
- VSCode Terminal output
- Browser console (F12)
- Terminal when running `npm run dev`
