import { Link } from "react-router-dom";
import pokemonLogo from "../assets/pokemon-logo.png";

const Navbar = () => {
  return (
    <nav className="navbar" style={{ backgroundColor: "#000" }}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={pokemonLogo} alt="Pokemon Logo" height="40" />
        </Link>
        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher un Pokémon..."
            className="search-bar"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;