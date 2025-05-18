# AdGuard Frontend Developer test task


## Task Requirements

Develop a production-ready (linting, tests, documentation, clear code) browser extension with a popup page using React, Webpack, TypeScript, and MobX.

### 1. Popup Page
- Include a simple form where users can input a list of filter URLs, separated by commas, and a button to submit.
- When the button is clicked, the popup should send these URLs to the background page.
- When closing or reopening the popup, the entered data or calculation results should not be lost. It should be saved using the chrome.storage.local

### 2. Background Page
- Fetch filters from these URLs (example URL: https://filters.adtidy.org/extension/chromium/filters/2.txt).
- Count the number of rules (one line is one rule, lines are separated by \n) containing the substring $document and $subdocument in the fetched filters.
- Log these counts to the console and send the result back to the popup

### 3. Result Display
- Display the result received from the background page:
  - Total network rules: [document + subdocument]
  - Document rules: [document]  
  - Subdocument rules: [subdocument]

### 4. CI/CD Integration
- Use GitHub Actions for automated testing and linting.

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
