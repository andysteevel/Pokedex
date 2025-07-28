import { useState } from 'react';

const PokemonCard = ({ pokemon, onTypeSelect }) => {
  const [showTypeMenu, setShowTypeMenu] = useState(false);

  // Types de Pokémon disponibles (vous pouvez les récupérer via l'API si préféré)
  const pokemonTypes = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic',
    'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];

  const handleTypeClick = (type) => {
    setShowTypeMenu(false);
    if (onTypeSelect) {
      onTypeSelect(type);
    }
  };

  return (
    <div className="pokemon-card">
      <div className="pokemon-header">
        <h3>#{pokemon.id.toString().padStart(3, '0')}</h3>
        <div 
          className="type-filter-icon"
          onClick={() => setShowTypeMenu(!showTypeMenu)}
        >
          ⚙️
        </div>
      </div>
      
      <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
      
      <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      
      <div className="pokemon-types">
        {pokemon.types.map((type, index) => (
          <span 
            key={index} 
            className={`type ${type}`}
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </span>
        ))}
      </div>

      {showTypeMenu && (
        <div className="type-menu">
          {pokemonTypes.map((type) => (
            <div
              key={type}
              className={`type-option ${type}`}
              onClick={() => handleTypeClick(type)}
            >
              {type}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonCard;