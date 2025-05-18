import { makeAutoObservable } from 'mobx';

class FilterStore {
  urls: string = '';
  results: {
    totalRules: number;
    documentRules: number;
    subdocumentRules: number;
  } | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadSavedData();
  }

  setUrls(urls: string) {
    this.urls = urls;
    this.saveUrls();
  }

  setResults(results: { totalRules: number; documentRules: number; subdocumentRules: number }) {
    this.results = results;
    this.saveResults();
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  private async saveUrls() {
    try {
      await chrome.storage.local.set({ urls: this.urls });
    } catch (error) {
      console.error('Error saving URLs:', error);
    }
  }

  private async saveResults() {
    if (this.results) {
      try {
        await chrome.storage.local.set({ lastResults: this.results });
      } catch (error) {
        console.error('Error saving results:', error);
      }
    }
  }

  private async loadSavedData() {
    try {
      const data = await chrome.storage.local.get(['urls', 'lastResults']);
      if (data.urls) {
        this.urls = data.urls;
      }
      if (data.lastResults) {
        this.results = data.lastResults;
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }

  async analyzeFilters() {
    if (!this.urls.trim()) {
      this.setError('URL required');
      return;
    }

    this.setLoading(true);
    this.setError(null);

    try {
      const response = await chrome.runtime.sendMessage({
        type: 'ANALYZE_FILTERS',
        urls: this.urls
          .split(',')
          .map((url) => url.trim())
          .filter(Boolean),
      });

      if ('error' in response) {
        this.setError(response.error);
      } else {
        this.setResults(response);
      }
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      this.setLoading(false);
    }
  }
}

export const filterStore = new FilterStore();
