import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../index.css";

function Navbar() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );
    const favorites =
  useSelector(
    state => state.favorites
  );

  return (
    <nav className="navbar">
      <div className="nav-left">
      <Link to="/" className="logo">
        <img src={logo} alt="Movie Booking Logo" />
      </Link>

      {/* <Link to="/">
        Home
      </Link> */}

      <Link to="/destinations">
        Movies
      </Link>
      <Link to="/favorites">
  ❤ (
  {favorites.length}
  )
</Link>
      </div>

      <div className="nav-right">
      {!user && (
        <>
          <Link to="/register">
            Register
          </Link>

          <Link to="/login">
            Login
          </Link>
        </>
      )}

      {user && (
        <Link to="/logout">
          Logout
        </Link>
      )}
      </div>

    </nav>
  );
}

export default Navbar;