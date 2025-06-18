# 🏆 Sports Leagues Explorer

A modern, responsive frontend application for exploring sports leagues from around the world, built with Next.js, TypeScript, and Tailwind CSS.

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
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Server state management and caching
- **Axios** - HTTP client
- **Lucide React** - Icons
- **TheSportsDB API** - Data source

## 🏗️ Architecture

The project uses a modular architecture following DRY and KISS principles:

```
src/
├── components/          # Presentational components
│   ├── SearchBar.tsx   # Search input component
│   ├── SportFilter.tsx # Sport filter dropdown
│   ├── LeagueCard.tsx  # Individual league card
│   ├── LeagueList.tsx  # League list with states
│   ├── LazyImage.tsx   # Lazy loading image component
│   └── SportsLeaguesApp.tsx # Main app component
├── hooks/              # Custom hooks
│   ├── useLeagues.ts   # Leagues fetching hook
│   └── useSeasonBadge.ts # Season badges hook
├── lib/                # Application logic
│   ├── api.ts          # API communication service
│   └── query-provider.tsx # React Query provider
├── types/              # TypeScript type definitions
│   └── league.ts       # League data types
└── app/                # Next.js App Router
    ├── layout.tsx      # Main layout
    ├── page.tsx        # Home page
    └── globals.css     # Global styles
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

### React Query

- **Stale Time**: 5-10 minutes
- **Garbage Collection Time**: 10-60 minutes
- **Devtools**: Available in development

### Tailwind CSS

- Configuration in `tailwind.config.js`
- Custom utility classes
- Responsive breakpoints

## 📱 Responsive Breakpoints

- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large Desktop**: 1280px+

## ⚡ Lazy Loading

The app implements efficient lazy loading:

- **Pagination**: Shows 12 leagues initially
- **Load More Button**: Progressive loading
- **Auto-reset**: Pagination resets on filter changes
- **Image Lazy Loading**: Season badges load on demand
- **Caching**: React Query prevents unnecessary API calls

## 🚢 Deployment

The app is ready for deployment on:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- Any hosting platform supporting Next.js

```bash
# Build and export
npm run build
```

## 🤝 Development

The project is prepared for extension:

- Adding new filters
- League and team details
- Favorite leagues
- Dark mode
- Internationalization (i18n)

## 🐛 Debugging

- React Query Devtools available in development
- TypeScript type checking
- ESLint configuration
- Console logs in development

## 📄 Project Structure

### Components

- **SearchBar**: Search input with icon
- **SportFilter**: Dropdown for sport selection
- **LeagueCard**: Expandable league card with badges
- **LeagueList**: List component with loading/error states
- **LazyImage**: Image component with loading states
- **SportsLeaguesApp**: Main application component

### Hooks

- **useLeagues**: Fetches and caches league data
- **useSeasonBadge**: Lazy loads season badges
- **useFilteredLeagues**: Filters leagues by search and sport

### Features

- Lazy loading pagination (12 items per page)
- Badge carousel with navigation
- Responsive design
- Error boundaries
- Loading states
- Search and filter functionality

---

**Built with ❤️ using Next.js**  
**API**: Powered by [TheSportsDB](https://www.thesportsdb.com/)  
**License**: MIT

