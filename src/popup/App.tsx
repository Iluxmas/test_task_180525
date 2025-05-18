import React from 'react';
import { observer } from 'mobx-react-lite';
import { filterStore } from '../store/FilterStore';

const App: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    filterStore.analyzeFilters();
  };

  return (
    <div className="app">
      <h1>Filter Analyzer</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="urls">Filter URLs (comma-separated):</label>
          <textarea
            id="urls"
            value={filterStore.urls}
            onChange={(e) => filterStore.setUrls(e.target.value)}
            placeholder="https://filters.adtidy.org/extension/chromium/filters/2.txt"
            rows={3}
          />
        </div>

        <button type="submit" disabled={filterStore.isLoading}>
          {filterStore.isLoading ? 'Analyzing...' : 'Analyze Filters'}
        </button>
      </form>

      {filterStore.error && <div className="error">{filterStore.error}</div>}

      {filterStore.results && (
        <div className="results">
          <h2>Results:</h2>
          <p>Total network rules: {filterStore.results.totalRules}</p>
          <p>Document rules: {filterStore.results.documentRules}</p>
          <p>Subdocument rules: {filterStore.results.subdocumentRules}</p>
        </div>
      )}
    </div>
  );
};

export default observer(App);
