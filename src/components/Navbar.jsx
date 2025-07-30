import { Link } from "react-router-dom";
import pokemonLogo from "../assets/Pokedx-3D.png";

const Navbar = () => {
  return (
    <>
    <nav >
      <div className="flex justify-center items-center p-10 bg-black">
        <Link to="/" className="navbar-logo">
          <img src={pokemonLogo} alt="Pokemon Logo" className="h-44 rounded-full"  />
        </Link>
        
      </div>
    </nav>
    </>
  );
};

export default Navbar;