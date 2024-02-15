import Stack from "@mui/material/Stack";
import { Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { useGlobalcontext } from "../contexts/GlobalProvider";
const Navbar = () => {
  const [value, setValue] = useState<
    string | number | readonly string[] | undefined
  >();
  return (
    <nav className="navbar">
      <Stack direction="row" spacing={2}>
        <h1 className="app-heading">Loooffyy</h1>
        <Link className="Logo" to="/">k
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
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />

        <Search className="Searchbutton" />
      </Stack>
    </nav>
  );
};

export default Navbar;
