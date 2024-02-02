import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import GlobalProvider from "./contexts/GlobalProvider";

function App() {
  return (
    <>
      {" "}
      <main>
        <Navbar />
        <GlobalProvider>
          <Home />
        </GlobalProvider>
      </main>
    </>
  );
}

export default App;
