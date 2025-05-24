import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HeroDetails from "./pages/HeroPage";
import AddHeroPage from "./pages/AddHeroPage";
import EditHeroPage from "./pages/EditHeroPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hero/:id" element={<HeroDetails />} />
      <Route path="/add" element={<AddHeroPage />} />
      <Route path="/edit/:id" element={<EditHeroPage />} />
    </Routes>
  );
}

export default App;
