'use client';
import { useEffect, useState } from 'react';

import './search-form.module.css';

const names = ['Alice', 'Bob', 'Charlie', 'David', 'Emily'];

interface SearchBarProps {
  
}

// NOTE: Always pass in ServerComponent as `children` prop
// then a ClientComponet (Keeps them decoupled.)
export function SearchBar(props: SearchBarProps) {
    const [recommendations, setRecommendations] = useState<string[]>([]);
    const [searchText, setSearchText] = useState('');

     const [searchTerm, setSearchTerm] = useState('');
     const [ethPrice, setEthPrice] = useState(0);
     const [gasPrice, setGasPrice] = useState(0);


     // TODO: get params and search the chain
     function getSearchResult(arg: any) {}

     function handleSearch(e: any) {
       e.preventDefault();
       const value = e.target.value;

       setSearchTerm(value);
       getSearchResult(value);
     }

     function handleSubmit(e: any) {
       e.preventDefault();
       setSearchTerm('');
     }

    useEffect(() => {
      if (searchText.length === 0) {
        setRecommendations([]);
      } else if (searchText.length > 0) {
        const newRecs = names.filter((name) =>
          name.toLowerCase().includes(searchText.toLowerCase())
        );
        setRecommendations(newRecs);
      }
    }, [searchText]);
 

  return (
    <>
      <div>
        <input type='text' onChange={(e) => setSearchText(e.target.value)} />
        <h2>Recommendations:</h2>
        <ul>
          {recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
      <div className='search-form'>
        <form name='search-form' onSubmit={handleSubmit}>
          <label htmlFor='search'>
            <input
              value={searchTerm}
              onChange={handleSearch}
              id='search'
              type='text'
              placeholder='Search by Address / Txn Hahs / BlockNumber / Token / Domain/'
            />
          </label>
        </form>
      </div>
    </>
  );
}