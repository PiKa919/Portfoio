# Neural Vision Portfolio

A cyberpunk-themed personal portfolio website for **Ankit Das** - Computer Vision Engineer specializing in deep learning, AI/ML systems, and production-ready vision pipelines.

![Next.js](https://img.shields.io/badge/Next.js-16.0.5-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-ff69b4?style=flat-square&logo=framer)

## ✨ Features

- **Vision Mode Toggle** - Transform the site into an AI segmentation view
- **Interactive Animations** - Powered by Framer Motion and Anime.js
- **Terminal-style UI** - Authentic developer experience with typewriter effects
- **Particle Network** - Canvas-based interactive background
- **Responsive Design** - Mobile-first approach with touch optimization
- **SEO Optimized** - Complete metadata, sitemap, and robots.txt
- **Accessibility** - WCAG 2.1 AA compliant with reduced motion support

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4, CSS Variables |
| **Animations** | Framer Motion, Anime.js |
| **Fonts** | Inter, Fira Code, Orbitron, Rajdhani |
| **Deployment** | Vercel (recommended) |

## 📁 Project Structure

```
neural-vision/
├── public/                  # Static assets
│   └── Ankit_Das-Resume.pdf # Resume download
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # Global styles & Tailwind
│   │   ├── layout.tsx       # Root layout with fonts
│   │   ├── page.tsx         # Main page component
│   │   ├── sitemap.ts       # Dynamic sitemap
│   │   └── robots.ts        # Robots.txt config
│   ├── components/
│   │   ├── sections/        # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Certifications.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Experience.tsx
│   │   │   └── Contact.tsx
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Cursor.tsx
│   │   │   ├── NavBar.tsx
│   │   │   ├── ParticleNetwork.tsx
│   │   │   ├── Preloader.tsx
│   │   │   ├── TerminalText.tsx
│   │   │   └── VisionOverlay.tsx
│   │   └── ErrorBoundary.tsx
│   ├── context/
│   │   └── VisionModeContext.tsx
│   ├── hooks/
│   │   ├── useMousePosition.ts
│   │   └── useScrollProgress.ts
│   ├── lib/
│   │   └── animations.ts    # Framer Motion variants
│   └── types/
│       └── animejs.d.ts     # Anime.js type definitions
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ankit-Das-afk/neural-vision-portfolio.git
   cd neural-vision-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Void Black | `#0a0a0a` | Background |
| Neon Cyan | `#00f3ff` | Primary accent, links |
| Electric Purple | `#bd00ff` | Secondary accent |
| Matrix Green | `#00ff88` | Success states, Vision Mode |
| Off-White | `#e8e8e8` | Body text |
| Pure White | `#ffffff` | Headings |

## 📱 Responsive Breakpoints

- **sm**: 640px (Mobile landscape)
- **md**: 768px (Tablet)
- **lg**: 1024px (Desktop)
- **xl**: 1280px (Large desktop)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
# Optional: Base URL for SEO
NEXT_PUBLIC_BASE_URL=https://ankitdas.dev
```

### Customization

- **Colors**: Edit `tailwind.config.ts` and `globals.css`
- **Fonts**: Modify font imports in `layout.tsx`
- **Content**: Update data in respective section components
- **Animations**: Customize in `lib/animations.ts`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Ankit Das**
- GitHub: [@Ankit-Das-afk](https://github.com/Ankit-Das-afk)
- LinkedIn: [ankitdas919](https://linkedin.com/in/ankitdas919)
- Medium: [@ankit.das9](https://medium.com/@ankit.das9)
- Email: ankitdas9810@gmail.com

---

<p align="center">
  Built with 💜 using Next.js and deployed on Vercel
</p>
