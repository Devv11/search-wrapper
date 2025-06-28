import React from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import SearchHistory from './components/SearchHistory';
import { useSearch } from './hooks/useSearch';
import './App.css';

function App() {
  const { loading, results, searchInfo, error, performSearch, clearResults } = useSearch();

  const handleSearch = (query) => {
    performSearch(query);
  };

  const handleSelectFromHistory = (query) => {
    performSearch(query);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Search Wrapper</h1>
      </header>

      <main className="app-main">
        <SearchBar onSearch={handleSearch} loading={loading} />
        <SearchHistory onSelectQuery={handleSelectFromHistory} />
        <SearchResults 
          results={results} 
          searchInfo={searchInfo} 
          loading={loading} 
          error={error} 
        />
      </main>
    </div>
  );
}

export default App;