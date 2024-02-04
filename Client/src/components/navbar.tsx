import Stack from "@mui/material/Stack";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Stack direction="row" spacing={2}>
        <h1 className="app-heading">Loooffyy</h1>
        <Link className="Logo" to="/">
          <img
            className="Logo"
            src="../../public/logo.png"
            alt="Looffyy Logo"
          />
        </Link>
      </Stack>

      <Stack direction="row" spacing={2}>
        <input
          type="text"
          className="search-bar"
          placeholder="Enter Anime Name"
        />

        <Search className="Searchbutton" />
      </Stack>
    </nav>
  );
};

export default Navbar;
