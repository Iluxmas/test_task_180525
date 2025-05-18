# Filter Analyzer Browser Extension

A browser extension that analyzes filter rules from specified URLs, counting document and subdocument rules.

## Features

- Input multiple filter URLs
- Analyze filter rules
- Count document and subdocument rules
- Persistent storage of results
- Modern React-based UI

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start development build:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Available Scripts

- `npm start` - Start development build with watch mode
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm test` - Run tests
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
  ├── popup/         # Popup UI components
  ├── background/    # Background script
  ├── components/    # Shared React components
  ├── types/         # TypeScript type definitions
  └── utils/         # Utility functions
```

## Technologies Used

- React
- TypeScript
- Webpack
- MobX
- ESLint
- Prettier
- Jest

## Loading the Extension in Chrome

1. Build the extension:
```bash
npm run build
```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the `dist` directory from your project folder

5. The extension should now appear in your Chrome toolbar

6. To use the extension:
   - Click the extension icon in the toolbar
   - Enter one or more filter URLs (comma-separated)
   - Click "Analyze Filters" to see the results

