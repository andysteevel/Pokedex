import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const PokemonDetails = () => {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        
        const frenchDescription = speciesResponse.data.flavor_text_entries.find(
          entry => entry.language.name === 'fr'
        )?.flavor_text || 'Description non disponible en français'
        
        setPokemon({
          id: response.data.id,
          name: response.data.name,
          image: response.data.sprites.other['official-artwork'].front_default,
          types: response.data.types.map(type => type.type.name),
          height: response.data.height / 10, // en mètres
          weight: response.data.weight / 10, // en kg
          stats: response.data.stats.map(stat => ({
            name: stat.stat.name,
            value: stat.base_stat
          })),
          abilities: response.data.abilities.map(ability => ability.ability.name),
          description: frenchDescription
        })
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchPokemonDetails()
  }, [id])

  if (loading) return <div className="loading">Chargement en cours...</div>
  if (error) return <div className="error">Erreur: {error}</div>
  if (!pokemon) return <div className="not-found">Pokémon non trouvé</div>

  return (
    <div className="pokemon-details">
      <Link to="/" className="back-button">← Retour</Link>
      
      <div className="pokemon-header">
        <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
        <h2>{pokemon.id.toString().padStart(3, '0')}</h2>
      </div>
      
      <div className="pokemon-main">
        <div className="pokemon-image-container">
          <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
          <div className="pokemon-types">
            {pokemon.types.map((type, index) => (
              <span key={index} className={`type ${type}`}>
                {type}
              </span>
            ))}
          </div>
        </div>
        
        <div className="pokemon-info">
          <div className="info-section">
            <h3>Description</h3>
            <p>{pokemon.description}</p>
          </div>
          
          <div className="info-section">
            <h3>Caractéristiques</h3>
            <p>Taille: {pokemon.height} m</p>
            <p>Poids: {pokemon.weight} kg</p>
          </div>
          
          <div className="info-section">
            <h3>Capacités</h3>
            <div className="abilities">
              {pokemon.abilities.map((ability, index) => (
                <span key={index} className="ability">
                  {ability}
                </span>
              ))}
            </div>
          </div>
          
          <div className="info-section">
            <h3>Statistiques</h3>
            <div className="stats">
              {pokemon.stats.map((stat, index) => (
                <div key={index} className="stat">
                  <span className="stat-name">{stat.name}:</span>
                  <div className="stat-bar-container">
                    <div 
                      className="stat-bar" 
                      style={{ width: `${(stat.value / 255) * 100}%` }}
                    ></div>
                  </div>
                  <span className="stat-value">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails