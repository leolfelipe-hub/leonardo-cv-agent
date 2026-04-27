# Leonardo Dibe - AI CV Agent

An AI-powered chatbot that answers questions about Leonardo Dibe's professional background, experience, and expertise in Growth Marketing and AI.

## Features

- 💬 Real-time chat interface powered by Claude AI
- 🎨 Clean, professional UI with Tailwind CSS
- 🚀 Next.js 14 with App Router
- 🔒 Secure API key management via Netlify environment variables
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: Claude API (Anthropic)
- **Hosting**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+
- Netlify account
- Claude API key from https://console.anthropic.com/account/keys

### Local Development

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd leonardo-cv-agent
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env.local` file**
```bash
cp .env.example .env.local
# Add your Claude API key to .env.local
CLAUDE_API_KEY=your_key_here
```

4. **Run development server**
```bash
npm run dev
```

5. **Open browser**
Visit http://localhost:3000

## Deployment to Netlify

### Option 1: Connect GitHub Repository (Recommended)

1. **Push code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-url>
git push -u origin main
```

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" > "Import an existing project"
   - Select GitHub and authorize
   - Choose your repository
   - Click "Deploy"

3. **Add Environment Variables**
   - In Netlify dashboard, go to Site settings > Environment
   - Click "Add a variable"
   - Key: `CLAUDE_API_KEY`
   - Value: Your new Claude API key (the one you generated after deleting the old one)
   - Save and redeploy

### Option 2: Drag & Drop (Manual)

1. **Build for production**
```bash
npm run build
```

2. **Go to Netlify**
   - Visit https://app.netlify.com
   - Drag and drop the project folder
   - Add environment variable `CLAUDE_API_KEY` in Site settings

## Configuration

The AI agent's knowledge is defined in `/app/api/chat/route.js` in the `SYSTEM_PROMPT` variable. Update this if you need to:
- Add new information
- Change the tone
- Update achievements or dates

## How to Use

1. Visit your deployed site at `https://your-site.netlify.app`
2. Type a question in the chat box
3. The AI agent will respond based on Leonardo's profile

### Example Questions

- "What is your experience with AI?"
- "Tell me about your largest achievement"
- "What tools do you use for marketing?"
- "How many years of experience do you have?"
- "What is your expertise in CRM?"

## Troubleshooting

### API Key Issues
- Make sure the API key is set in Netlify environment variables
- Don't commit `.env.local` to GitHub (add to `.gitignore`)
- API key must start with `sk-ant-api03-`

### Build Errors
- Delete `node_modules` and `.next` folder
- Run `npm install` again
- Run `npm run build` to test locally

### Chat Not Responding
- Check browser console for errors (F12)
- Verify Claude API key in Netlify environment variables
- Check Claude API usage at https://console.anthropic.com

## Security

- ✅ API key stored securely in Netlify environment variables
- ✅ No sensitive data in code repository
- ✅ `.env.local` never committed to Git
- ✅ All requests go through secure HTTPS

## Links

- 📊 Gamma Presentation: [Your CV Presentation Link]
- 🔗 LinkedIn: linkedin.com/in/leonardodibe
- 📧 Email: leo.lfelipe@gmail.com

---

**Created with Claude AI** | Last Updated: April 2026
