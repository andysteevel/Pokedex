

import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import './index.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </div>     
    </div>
  )
}

export default App