# InvariFi Frontend

![InvariFi Logo](public/logo.svg)

**InvariFi** is a social staking platform with diversification and advanced security mechanisms for daily staking activities.

## 🚀 Features

- **Vaults** — Automated yield optimization strategies
- **Strategies** — Custom staking strategies with multiple DeFi protocols
- **Dashboard** — Track your portfolio and performance
- **Multi-chain Support** — Ethereum, Polygon, Arbitrum, Optimism, Base, BSC, Avalanche

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Web3**: wagmi, viem, Web3Modal
- **State Management**: TanStack Query
- **UI Components**: Radix UI

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/GodBooster/invarifi-frontend.git
cd invarifi-frontend

# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Backend API
NEXT_PUBLIC_BACKEND_URL=your_backend_url
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## 🌐 Deployment

This project is configured for deployment on **Netlify**.

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/GodBooster/invarifi-frontend)

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── dashboard/       # Dashboard components
│   ├── earn/           # Strategies/Earn components
│   ├── navbar/         # Navigation components
│   ├── ui/             # Reusable UI components
│   └── vault/          # Vault components
├── constants/          # Application constants
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── providers/          # Context providers
└── abi/                # Smart contract ABIs
```

## 🔗 Links

- **Website**: [invarifi.com](https://invarifi.com)
- **Twitter**: [@invarifi](https://x.com/invarifi)
- **LinkedIn**: [InvariFi](https://www.linkedin.com/company/invarifi/)

## 📄 License

This project is proprietary software. All rights reserved.

---

Built with ❤️ by the InvariFi team
