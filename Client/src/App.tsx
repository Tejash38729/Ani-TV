import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import GlobalProvider from "./contexts/GlobalProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimePage from "./components/AnimePage";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <main>
        <Navbar />
        <GlobalProvider>
          <Routes>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/:mal_id/:title" element={<AnimePage />}></Route>
          </Routes>
        </GlobalProvider>
      </main>
    </Router>
  );
}

export default App;
