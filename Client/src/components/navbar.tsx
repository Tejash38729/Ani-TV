import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Stack direction="row" spacing={2}>
        <h1 className="app-heading">Loooffyy</h1>
        <img className="Logo" src="../../public/logo.png" alt="Looffyy Logo" />
      </Stack>

      <Stack direction="row" spacing={2}>
        <input type="text" className="search-bar" placeholder="Search..." />
        <Button variant="contained" color="error">
          Search
        </Button>
      </Stack>
    </nav>
  );
};

export default Navbar;
