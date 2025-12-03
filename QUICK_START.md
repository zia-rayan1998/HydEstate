# Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- npm installed
- VSCode installed
- Flask backend running on port 5000 (optional for UI testing only)

## 5-Minute Setup

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

### 3. Open in Browser
Visit: http://localhost:3000

## Available Routes

| Route | Purpose |
|-------|---------|
| `/` | Home page with property search |
| `/property/[id]` | Property detail page |
| `/property/create` | List new property (image upload) |
| `/map` | Map view of properties |
| `/auth/login` | Login page |
| `/auth/signup` | Signup page |

## Connect to Flask Backend

Update `.env.local`:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000
\`\`\`

Then run your Flask backend on port 5000.

## Build for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `npm run dev -- -p 3001` |
| Dependencies error | `npm install --legacy-peer-deps` |
| TypeScript errors | Ignore in dev, will show in build |
| API calls failing | Check Flask backend is running |

## File Structure

\`\`\`
project/
├── app/                          # Next.js pages
│   ├── page.tsx                  # Home page
│   ├── property/[id]/page.tsx    # Property detail
│   ├── property/create/page.tsx  # Create listing
│   ├── map/page.tsx              # Map view
│   └── auth/                     # Auth pages
├── components/                   # React components
│   ├── image-upload.tsx          # Image uploader
│   ├── property-questions.tsx    # Form questions
│   └── ui/                       # shadcn UI components
├── lib/
│   ├── api.ts                    # API helper functions
│   └── utils.ts                  # Utility functions
└── public/                       # Static assets
\`\`\`

## Documentation

- `VSCODE_SETUP.md` - Detailed VSCode configuration
- `LOCAL_SETUP_GUIDE.md` - Complete local development guide
- `BACKEND_STRUCTURE_GUIDE.md` - Flask backend structure
