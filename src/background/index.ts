chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'ANALYZE_FILTERS') {
    analyzeFilters(message.urls)
      .then(sendResponse)
      .catch((error) => {
        console.error('Error analyzing filters:', error);
        sendResponse({ error: error.message });
      });
    return true;
  }
});

async function analyzeFilters(urls: string[]) {
  let documentRules = 0;
  let subdocumentRules = 0;

  for (const url of urls) {
    try {
      const response = await fetch(url);
      const text = await response.text();
      const lines = text.split('\n');

      for (const line of lines) {
        const trimmedLine = line.trim();

        if (!trimmedLine) {
          continue;
        }

        if (trimmedLine.includes('$document')) {
          documentRules++;
        }
        if (trimmedLine.includes('$subdocument')) {
          subdocumentRules++;
        }
      }
    } catch (error) {
      console.error('Error fetching filters', error);
      throw new Error(`Failed to fetch filters from ${url}`);
    }
  }

  const result = {
    totalRules: documentRules + subdocumentRules,
    documentRules,
    subdocumentRules,
  };

  console.log('Filters count results:', result);

  return result;
}
