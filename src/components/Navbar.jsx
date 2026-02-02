import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>EVENT FEST</h2>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/events" style={styles.link}>Events</Link>
        <Link to="/register" style={styles.link}>Register</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#000",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid red",
  },
  logo: {
    color: "red",
    letterSpacing: "2px",
  },
  link: {
    color: "white",
    marginLeft: "20px",
    textDecoration: "none",
  },
};

export default Navbar;
