import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-title">
        <h1>BME Equipment Management System</h1>
        <p>Biomedical Engineering Department</p>
      </div>

      <nav className="nav-bar">
        <Link to="/login" className="home-link">
          Login
        </Link>

        <Link to="/" className="home-link">
          Home
        </Link>

        <Link to="/favorites" className="home-link">
          Flagged Equipment 
        </Link>
      </nav>
    </header>
  );
}

export default Header;