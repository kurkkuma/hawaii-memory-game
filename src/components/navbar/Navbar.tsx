import Music from "./music/Music";
import "./navbar.css";
import UserInfo from "./user-info/UserInfo";

function Navbar() {
  return (
    <header className="navbar-container">
      <Music />
      <UserInfo />
    </header>
  );
}

export default Navbar;
