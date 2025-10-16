# XYMA Frontend Template

A modern React frontend template built with Vite, featuring a clean architecture and modern UI components.

## 🚀 Features

- ⚛️ React 18 with Vite
- 📦 TypeScript support
- 🎨 Modern UI components
- 🔄 React Router v6
- 🛠️ Axios interceptor for API calls
- 📊 Responsive design
- 💅 CSS Modules
- 📦 ESLint and Prettier
- 🔍 React Query (optional)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or pnpm
- Modern web browser

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/XYMA-Frontend-Template.git
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Build for production:
```bash
pnpm build
```

## 🛠️ Project Structure

```
XYMA_Frontend_Template/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and media
│   ├── components/        # Reusable components
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   ├── utils/            # Helper functions
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Entry point
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 📝 Available Scripts

In the project directory, you can run:

### `pnpm dev`

Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### `pnpm build`

Builds the app for production to the `dist` folder.

### `pnpm preview`

Runs the built app in production mode.

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_BACKEND_URL=http://localhost:4000

# Other configurations
VITE_THEME=light
```

## 🎨 Styling and Components

- CSS Modules for component-specific styles
- Tailwind CSS (optional)
- Modern component-based architecture
- Responsive design patterns

## 🛠️ Development Setup

### ESLint and Prettier

The project includes ESLint and Prettier for code formatting and linting. Run:

```bash
pnpm lint
pnpm format
```

### TypeScript

TypeScript is configured with recommended settings. You can find the configuration in `tsconfig.json`.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React
- Vite
- TypeScript
- React Router
- Axios
- ESLint
- Prettier
- Other open-source libraries used in this project