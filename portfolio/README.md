<h1 align="center">
  hunterbroughton.com
</h1>
<p align="center">
  The new <a href="https://hunterbroughton.com" target="_blank">hunterbroughton.com</a> built with Next.js and TypeScript.
</p>

## 🚀 Portfolio Website

This is the frontend portfolio website featuring:

- **Next.js 14** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Cyberpunk theme** with interactive components
- **AI Chatbot integration** (connects to separate backend)

## 📁 Project Structure

```
hunters-website-2025/
├── portfolio/          # Frontend (this folder)
└── portfolio-chatbot/  # Backend API
```

## 🛠️ Development Setup

1. Navigate to the portfolio directory:

   ```sh
   cd portfolio
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🌐 Deployment

### Frontend (GitHub Pages)

```sh
npm run deploy
```

### Backend (Separate deployment required)

The chatbot backend needs to be deployed separately. See `../portfolio-chatbot/README.md` for backend deployment instructions.

## 📦 Build Commands

- **Development**: `npm run dev`
- **Production Build**: `npm run build`
- **Production Server**: `npm run start`
- **Deploy to GitHub Pages**: `npm run deploy`
