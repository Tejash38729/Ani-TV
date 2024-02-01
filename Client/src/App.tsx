import Container from "@mui/material/Container";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Container>
        <main>
          <Navbar />

          <Home />
        </main>
      </Container>
    </>
  );
}

export default App;
