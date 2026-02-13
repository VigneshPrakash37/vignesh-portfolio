
# VIGNESH PRAKASH | Personal Brand Platform

A unified OS for managing a long-term personal brand, architected with a minimalistic, high-performance tech stack.

## 🌟 Core Architecture
- **Tech Stack**: React 19, Tailwind CSS, Recharts, Lucide Icons.
- **Section System**: 12 distinct sections from Hero to Hire Me, accessible via smooth scroll.
- **Brand OS (Admin)**: A secure management portal (`/#admin`) for live content editing without code.
- **Identity First**: Focus on story-based profiling, infrastructure professional work, and startup products.

## 🛠 Features
- **Smart Quotes**: Auto-rotating hero wisdom with public contribution form.
- **Ecosystem Portfolio**: Categorized showcase for MAHSR, Metro, Startly, and more.
- **Impact Dashboard**: Real-time stats visualization.
- **Infrastructure Weekly**: Built-in newsletter system with archive support.
- **Dual Mode**: Precision-tuned Light and Dark themes.

## 🚀 Deployment Guide
1. **Repository**: Push this project to GitHub.
2. **Hosting**: Connect to **Vercel** or **Netlify**.
3. **PWA & SEO**: The `index.html` is pre-configured with OG tags. Update the profile image URL in `index.html` for final production.
4. **Environment**: Ensure no environment variables are needed for the base local-storage version.

## 🔐 Admin Access
- **Entry**: Click the **Lock icon** in the Hero section or the Footer.
- **Password**: Default is `startly2024` (Change in `App.tsx` for production).
- **Functions**: Approve visitor quotes, add professional projects, and publish new blog insights instantly.

## 📈 Future Scaling
- **Phase 2**: Replace `services/storage.ts` with Supabase/Firebase hooks for multi-device sync.
- **Phase 3**: Integrate Stripe/UPI via `startly-payments` component for consulting booking.
