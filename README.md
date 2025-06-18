# 🏆 Sports Leagues Explorer

A modern, responsive frontend application for exploring sports leagues from around the world, built with Next.js, TypeScript, and Tailwind CSS.

> **Note**: This application was developed with AI assistance using Claude AI in Cursor. The AI helped with code creation, debugging, and solving configuration issues with Tailwind CSS v4.0.

## ✨ Features

- 🔍 **Search leagues** - Real-time filtering by league name
- 🏀 **Filter by sport** - Dropdown selection for specific sports
- 🏅 **Season badges** - Click on leagues to view season badges
- 📱 **Responsive design** - Works on all devices
- ⚡ **Fast loading** - Data caching with React Query
- 🎨 **Modern UI** - Clean, intuitive components
- 📄 **Lazy loading** - Pagination with "Load More" functionality

## 🛠️ Technologies

- **Next.js 15** (App Router) - React framework with SSR
- **TypeScript** - Type safety
- **Tailwind CSS v4.0** - Utility-first CSS framework
- **React Query** - Server state management and caching
- **Axios** - HTTP client
- **Lucide React** - Icons
- **TheSportsDB API** - Data source

## 🤖 AI Development

This project was created with the assistance of **Claude AI in Cursor**. The AI helped with:

- 🎨 **Styling** - Creating responsive designs and component styles based on Glassmorphism
- 🔧 **Configuration fixes** - Solving Tailwind CSS v4.0 configuration issues
- 💻 **Code guidance** – Offered hints and improvements while working with React and TypeScript

### Tailwind CSS Configuration Issues Resolved

During development, configuration challenges with Tailwind CSS v4.0 were resolved with AI assistance:

- **`@reference` directive usage** - Fixed CSS modules compatibility
- **`@apply` directive problems** - Resolved utility class errors
- **File organization** - Proper CSS import structure

## 🏗️ Architecture

The project uses a modular architecture following DRY and KISS principles:

```
src/
├── components/          # Presentational components
│   ├── SearchBar/      # Search input component
│   ├── SportFilter/    # Sport filter dropdown
│   ├── LeagueCard/     # Individual league card with badges
│   ├── LeagueList/     # League list with states
│   ├── LazyImage/      # Lazy loading image component
│   └── SportsLeaguesApp.tsx # Main app component
├── hooks/              # Custom hooks
│   ├── useLeagues.ts   # Leagues fetching hook
│   └── useSeasonBadge.ts # Season badges hook
├── lib/                # Application logic
│   ├── api.ts          # API communication service
│   └── query-provider.tsx # React Query provider
├── types/              # TypeScript type definitions
│   └── league.ts       # League data types
├── styles/             # CSS styles
│   └── components.css  # Component-specific styles
└── app/                # Next.js App Router
    ├── layout.tsx      # Main layout
    ├── page.tsx        # Home page
    └── globals.css     # Global styles with Tailwind imports
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd sports-leagues-app

# Install dependencies
npm install

# Run in development mode
npm run dev
```

The application will be available at `http://localhost:3000`

### Other Commands

```bash
# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📡 API Integration

The app integrates with **TheSportsDB API**:

- **Get all leagues**: `GET /all_leagues.php`
- **Get season badges**: `GET /search_all_seasons.php?badge=1&id={LEAGUE_ID}`

[API Documentation](https://www.thesportsdb.com/free_sports_api)

## 🎨 UI/UX Features

- **Responsive design** - Mobile-first approach
- **Loading states** - Friendly progress indicators
- **Error handling** - Informative error messages
- **Smooth animations** - Transitions and interactions
- **Accessibility** - Semantic HTML and ARIA
- **Lazy loading** - Progressive data loading with pagination

## 🔧 Configuration

### Tailwind CSS v4.0

- Configuration in `tailwind.config.mjs`
- Component styles in `src/styles/components.css`
- Global styles with imports in `src/app/globals.css`
- **Fixed `@reference` directive issues** for proper CSS module compatibility

### React Query

- **Stale Time**: 5-10 minutes
- **Garbage Collection Time**: 10-60 minutes
- **Devtools**: Available in development

## 📱 Responsive Breakpoints

- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large Desktop**: 1280px+

## ⚡ Performance Optimizations

- **Lazy loading pagination** - Shows 12 leagues initially
- **Progressive loading** - "Load More" button functionality
- **Auto-reset pagination** - Resets on filter changes
- **Image lazy loading** - Season badges load on demand
- **Smart caching** - React Query prevents unnecessary API calls
- **Component-level code splitting** - Optimized bundle sizes

## 🚢 Deployment

The app is ready for deployment on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any hosting platform supporting Next.js

```bash
# Build for production
npm run build

# Test production build locally
npm start
```

## 🤝 Development Experience

### AI-Assisted Development Benefits

- **Faster development** - Rapid prototyping and iteration
- **Best practices** - Modern React patterns and TypeScript usage
- **Error resolution** - Quick debugging and configuration fixes
- **Code quality** - Consistent styling and component structure

### Extensibility

The project is prepared for future extensions:

- Adding new filters and sorting options
- League and team details pages
- Favorite leagues functionality
- Dark/light mode toggle
- Internationalization (i18n)
- User authentication and profiles

## 🐛 Troubleshooting

### Common Issues and Solutions

1. **Tailwind CSS not working**

   - Ensure `@import "tailwindcss";` is in `globals.css`
   - Check component styles are imported correctly
   - Verify Tailwind v4.0 configuration

2. **API errors**

   - Check network connectivity
   - Verify TheSportsDB API status
   - Check browser console for CORS issues

3. **Build errors**
   - Run `npm run lint` to check for TypeScript errors
   - Clear `.next` folder and rebuild

## 📊 Project Statistics

- **Components**: 8+ reusable React components
- **Hooks**: 3 custom hooks for data management
- **API Integration**: RESTful API with error handling
- **Styling**: 40+ custom CSS utility classes
- **TypeScript**: Fully typed with interfaces and type safety

---

**Built with ❤️ using Next.js and AI assistance**  
**AI Partner**: Claude AI in Cursor  
**API**: Powered by [TheSportsDB](https://www.thesportsdb.com/)  
**License**: MIT

