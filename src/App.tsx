import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import apifetcher from './hook/apifetcher'; // Adjust the path as necessary
import { PokemonProvider } from "./contexts/Pokemon";
import Home from './controllers/Home'
import Details from './components/Details';

const App: React.FC = () => {


  return (
    <PokemonProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:name" element={<Details />} />
        </Routes>
      </Router>
    </PokemonProvider>
  );
};

export default App;
