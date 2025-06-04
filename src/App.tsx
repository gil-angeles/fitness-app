import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Challenges from "./pages/Challenges";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="challenges" element={<Challenges />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Route>
    </Routes>
  );
};

export default App;
