import { Link } from "react-router-dom";
import pokemonLogo from "../assets/Pokedx-3D.png";

const Navbar = () => {
  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', paddingLeft: "38%" }}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={pokemonLogo} alt="Pokemon Logo" height="70"  />
        </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;