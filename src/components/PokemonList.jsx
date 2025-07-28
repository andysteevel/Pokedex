import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Récupération des 200 premiers Pokémon
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=200');
        const results = response.data.results;

        const pokemonData = await Promise.all(
          results.map(async (pokemon) => {
            const pokemonResponse = await axios.get(pokemon.url);
            return {
              id: pokemonResponse.data.id,
              name: pokemonResponse.data.name,
              image: pokemonResponse.data.sprites.other['official-artwork'].front_default,
              types: pokemonResponse.data.types.map(type => type.type.name)
            };
          })
        );

        setPokemonList(pokemonData);
        setFilteredList(pokemonData);
        setLoading(false);

        // Récupération des types
        const typesResponse = await axios.get('https://pokeapi.co/api/v2/type');
        setTypes(typesResponse.data.results.map(type => type.name));
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  // Filtrage combiné (type + recherche)
  useEffect(() => {
    let results = pokemonList;

    // Filtre par type
    if (selectedType !== 'all') {
      results = results.filter(pokemon => 
        pokemon.types.includes(selectedType)
      );
    }

    // Filtre par recherche
    if (searchTerm) {
      results = results.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.id.toString().includes(searchTerm)
      );
    }

    setFilteredList(results);
  }, [searchTerm, selectedType, pokemonList]);

  if (loading) {
    return <div className="loading">Chargement en cours...</div>;
  }

  return (
    <div className="pokemon-list">
      <h1>Pokédex</h1>
      
      {/* Barre de recherche et filtre de type */}
      <div className="search-filter-container">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Rechercher un Pokémon par nom ou n°..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="clear-search"
            >
              ×
            </button>
          )}
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="type-select"
        >
          <option value="all">Tous les types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Résultats de recherche */}
      {filteredList.length === 0 ? (
        <div className="no-results">
          Aucun Pokémon trouvé pour "{searchTerm}"
          {selectedType !== 'all' && ` de type ${selectedType}`}
        </div>
      ) : (
        <>
          <div className="results-count">
            {filteredList.length} Pokémon(s) trouvé(s)
            {searchTerm && ` pour "${searchTerm}"`}
            {selectedType !== 'all' && ` de type ${selectedType}`}
          </div>
          
          <div className="pokemon-row">
            {filteredList.map((pokemon) => (
              <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id} className="pokemon-link">
                <PokemonCard pokemon={pokemon} />
              </Link>
            ))}
          </div>
        </>
        
      )}
    </div>
    
  );
};

export default PokemonList;