import "./App.css";
import Navbar from "./components/navbar";
// import Home from "./components/Home";
import GlobalProvider from "./contexts/GlobalProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimePage from "./components/AnimePage";
import NotFound from "./components/NotFound";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <main>
        <Navbar />
        <GlobalProvider>
          <Routes>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="" element={<HomePage />}></Route>
            <Route path="/:mal_id/:title" element={<AnimePage />}></Route>
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
        </GlobalProvider>
      </main>
    </Router>
  );
}

export default App;
