import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';


const App = () => {

  const APP_ID = 'fb5f1bf0';
  const APP_KEY = 'f14edaa2096466d58efa0ac0cce902b0	';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');



  useEffect(() => {
    const getRepices = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      console.log(data.hits);
      setRecipes(data.hits);
  
      // fetch("https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}")
      // .then(response => response.json())
    };
    getRepices();
  }, [query]);




  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {
          recipes.map(recipe => (
            <Recipe

              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients} />
          ))
        }
      </div>
    </div>
  )

}

export default App;
