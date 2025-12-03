# VSCode Setup Guide for Local Development

## Step 1: Install VSCode Extensions

Install these extensions for the best development experience:

1. **ES7+ React/Redux/React-Native snippets**
   - ID: dsznajder.es7-react-js-snippets
   - Provides React snippets and autocomplete

2. **Tailwind CSS IntelliSense**
   - ID: bradlc.vscode-tailwindcss
   - Autocomplete for Tailwind classes

3. **TypeScript Vue Plugin**
   - ID: vue.vscode-typescript-vue-plugin
   - Better TypeScript support

4. **Prettier - Code formatter**
   - ID: esbenp.prettier-vscode
   - Auto-format your code

5. **REST Client** (Optional but useful)
   - ID: humao.rest-client
   - Test API endpoints directly in VSCode

## Step 2: VSCode Settings

Create or update `.vscode/settings.json`:

\`\`\`json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "files.exclude": {
    "**/.next": true,
    "**/node_modules": true,
    "**/.git": true
  }
}
\`\`\`

## Step 3: Local Development Setup

### Open Project in VSCode

\`\`\`bash
# Navigate to your project
cd /path/to/real-estate-app

# Open in VSCode
code .
\`\`\`

### Terminal Setup

Open a new terminal in VSCode: `Ctrl+`` (backtick)

### Install Dependencies

\`\`\`bash
npm install
\`\`\`

### Set Environment Variables

The `.env.local` file is already created with default values:
- `NEXT_PUBLIC_API_URL=http://localhost:5000`

This connects to your Flask backend running locally on port 5000.

### Start Development Server

\`\`\`bash
npm run dev
\`\`\`

The app will be available at: `http://localhost:3000`

## Step 4: Debug Console

Use debug statements in your code:

\`\`\`typescript
console.log("[v0] Variable name:", variableName);
console.error("[v0] Error occurred:", error);
\`\`\`

View output in VSCode Terminal → Debug Console

## Step 5: Run Flask Backend (Separate Terminal)

\`\`\`bash
# Terminal 2: Open new terminal
cd /path/to/backend

# Activate virtual environment
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate      # Windows

# Install requirements
pip install -r requirements.txt

# Run Flask server
python app.py
\`\`\`

Backend will run on: `http://localhost:5000`

## Step 6: Test Integration

Once both servers are running:

1. Go to `http://localhost:3000` in your browser
2. Try to login/signup
3. Test property creation with image upload
4. Check VSCode Terminal for any errors

## Common Issues & Fixes

### Port 3000 Already in Use

\`\`\`bash
npm run dev -- -p 3001
\`\`\`

### Port 5000 Already in Use

\`\`\`bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
\`\`\`

### CORS Errors

Update your Flask backend to accept requests from `http://localhost:3000`:

\`\`\`python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
\`\`\`

### API Calls Failing

1. Check Flask backend is running on port 5000
2. Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
3. Check browser console for errors (F12)
4. Use VSCode REST Client to test endpoints directly

## Hot Reload

Both Next.js and your editor support hot reload:
- Edit a `.tsx` file and save → Changes appear instantly
- Edit `.css` file → Styles update without reload

## Useful Keyboard Shortcuts

- `Ctrl+K Ctrl+W` - Close current file
- `Ctrl+Shift+P` - Command palette
- `Ctrl+J` - Toggle terminal
- `Ctrl+/` - Comment/uncomment line
- `Alt+Up/Down` - Move line up/down
- `Shift+Alt+Up/Down` - Copy line up/down

## Next Steps

1. Update the Flask backend endpoints to handle your real business logic
2. Test all API endpoints with the REST Client
3. Deploy to Vercel when ready: `npm run build && npm run start`

Happy coding!
