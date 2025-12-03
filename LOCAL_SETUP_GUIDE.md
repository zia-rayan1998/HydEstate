# Real Estate Web App - Local Setup Guide for VSCode

## Prerequisites
Before starting, ensure you have these installed on your system:
- **Node.js** (v18 or higher) - Download from [nodejs.org](https://nodejs.org)
- **npm** (comes with Node.js)
- **Git** (optional, for version control) - Download from [git-scm.com](https://git-scm.com)
- **VSCode** - Download from [code.visualstudio.com](https://code.visualstudio.com)

**Verify Installation:**
\`\`\`bash
node --version   # Should show v18.0.0 or higher
npm --version    # Should show 10.0.0 or higher
\`\`\`

---

## Step 1: Download & Extract the Project

### Option A: From v0 (Recommended)
1. Open your v0 project
2. Click the **three dots (...)** in the top right
3. Select **"Download ZIP"**
4. Extract the ZIP file to your desired location (e.g., `Desktop/real-estate-app`)

### Option B: From GitHub (if you pushed it)
\`\`\`bash
git clone https://github.com/your-username/real-estate-app.git
cd real-estate-app
\`\`\`

---

## Step 2: Open Project in VSCode

1. Open VSCode
2. Go to **File → Open Folder**
3. Navigate to your extracted project folder and select it
4. Click **Open**

The project structure should look like:
\`\`\`
real-estate-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── auth/
│   ├── property/
│   └── map/
├── components/
│   ├── ui/
│   ├── image-upload.tsx
│   ├── property-card.tsx
│   └── ...
├── public/
├── package.json
├── tsconfig.json
├── next.config.mjs
└── ...
\`\`\`

---

## Step 3: Install Dependencies

1. Open the terminal in VSCode
   - Press `Ctrl + ~` (Windows/Linux) or `Cmd + ~` (Mac)
   - Or go to **Terminal → New Terminal**

2. Run the installation command:
\`\`\`bash
npm install
\`\`\`

This will install all 60+ dependencies. It may take 2-5 minutes depending on your internet speed.

3. Wait for it to complete. You should see:
\`\`\`
added 450 packages in 2m
\`\`\`

---

## Step 4: Install Leaflet (for Map View)

Since the map feature requires Leaflet, run:
\`\`\`bash
npm install leaflet react-leaflet @types/leaflet
\`\`\`

---

## Step 5: Set Up Environment Variables

1. In the root folder, create a `.env.local` file:
   - Right-click in the VSCode file explorer
   - Select **New File**
   - Name it `.env.local`

2. Add these environment variables:
\`\`\`env
# Flask Backend Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

# Optional: Add other configs as needed
NEXT_PUBLIC_APP_NAME=Real Estate App
\`\`\`

Replace `http://localhost:5000/api` with your actual Flask backend URL when deployed.

---

## Step 6: Start the Development Server

In the terminal, run:
\`\`\`bash
npm run dev
\`\`\`

You should see output like:
\`\`\`
  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
\`\`\`

The app is now running! 🎉

---

## Step 7: Open the App in Browser

1. Open your browser (Chrome, Firefox, Safari, Edge)
2. Go to: **http://localhost:3000**
3. You should see the Real Estate App home page with:
   - Property search bar
   - Featured properties grid
   - Navigation bar

---

## Step 8: Connect to Your Flask Backend

### Update API Endpoints

The frontend is pre-configured to call Flask backend at:
- **Login**: `POST /api/auth/login`
- **Signup**: `POST /api/auth/signup`
- **Get Properties**: `GET /api/properties`
- **Create Property**: `POST /api/properties/create`
- **Predict Price**: `POST /api/predict-price`
- **Map Data**: `GET /api/properties/map`

### To Connect Your Backend:

1. **Make sure your Flask backend is running** on `http://localhost:5000`

2. **Update `.env.local` if needed:**
\`\`\`env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
\`\`\`

3. **Test the connection:**
   - Try logging in or signing up
   - Check VSCode terminal for API errors
   - Open browser DevTools (F12) → Network tab to see API calls

### Example Flask Response Format
The frontend expects responses like:
\`\`\`json
{
  "success": true,
  "data": {...},
  "message": "Success"
}
\`\`\`

---

## Step 9: Testing Features Locally

### Test Home Page
- Visit `http://localhost:3000`
- Search for properties
- Click property cards to view details

### Test Property Creation
- Click **"List Property"** button (top right)
- Fill in property details
- Upload up to 10 images
- Submit (will send to Flask backend)

### Test Map View
- Click **"Map View"** in navigation
- See properties on Leaflet map

### Test Authentication
- Click **"Sign In"** → go to login page
- Click **"Sign Up"** → go to signup page
- Submit forms (will send to Flask backend)

---

## Useful VSCode Extensions (Recommended)

Install these for better development:

1. **ES7+ React/Redux/React-Native snippets**
   - Search in VSCode Extensions: `ES7+ React/Redux/React-Native snippets`

2. **Tailwind CSS IntelliSense**
   - Search: `Tailwind CSS IntelliSense`

3. **Prettier - Code formatter**
   - Search: `Prettier - Code formatter`

4. **TypeScript Vue Plugin (Volar)**
   - Search: `Volar` (for better TypeScript support)

---

## Common Issues & Solutions

### Issue 1: "npm command not found"
**Solution:** Node.js not installed. Download from [nodejs.org](https://nodejs.org) and install it.

### Issue 2: "Port 3000 already in use"
**Solution:** Another app is using port 3000.
\`\`\`bash
# Kill the process (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill the process (Mac/Linux)
lsof -ti:3000 | xargs kill -9
\`\`\`

### Issue 3: Module not found errors
**Solution:** Reinstall dependencies:
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Issue 4: CORS errors when calling Flask
**Solution:** Add CORS headers to your Flask backend:
\`\`\`python
from flask_cors import CORS
CORS(app)  # Allow all origins for development
\`\`\`

### Issue 5: Images not loading in property carousel
**Solution:** Make sure image URLs in your database are correct and accessible. For testing, use placeholder images.

---

## Building for Production

When ready to deploy:

1. Build the project:
\`\`\`bash
npm run build
\`\`\`

2. Start production server:
\`\`\`bash
npm start
\`\`\`

3. Deploy to Vercel (recommended):
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

---

## File Structure You'll See

\`\`\`
project-root/
├── .env.local                    # Environment variables (you create this)
├── .next/                        # Build cache (auto-generated)
├── node_modules/                 # Dependencies (auto-generated)
├── app/
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── auth/
│   │   ├── login/page.tsx       # Login page
│   │   └── signup/page.tsx      # Signup page
│   ├── property/
│   │   ├── [id]/page.tsx        # Property detail
│   │   └── create/page.tsx      # Create property (image upload)
│   └── map/page.tsx             # Map view
├── components/
│   ├── ui/                      # Shadcn UI components
│   ├── image-upload.tsx         # Image upload component
│   ├── image-carousel.tsx       # Carousel for images
│   ├── property-card.tsx        # Property listing card
│   ├── search-bar.tsx           # Search component
│   ├── price-predictor.tsx      # AI price prediction
│   └── property-questions.tsx   # Property form questions
├── public/                       # Static assets
├── lib/
│   └── utils.ts                 # Utility functions
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── next.config.mjs              # Next.js config
└── README.md
\`\`\`

---

## Next Steps

1. **Run the app locally** with `npm run dev`
2. **Start your Flask backend** on port 5000
3. **Test the connection** between frontend and backend
4. **Update API endpoints** in components if needed
5. **Deploy to Vercel** when ready

---

## Support & Resources

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **Leaflet Maps:** https://leafletjs.com
- **TypeScript:** https://www.typescriptlang.org

Happy coding! 🚀
