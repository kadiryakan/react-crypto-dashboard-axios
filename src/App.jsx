import { useState, useEffect } from "react";
import {Routes, Route } from "react-router";
import axios from "axios";
import HomePage from "./pages/home";
import AboutPage from "./pages/about"
import Header from "./components/Header";
import NotFoundPage from "./pages/not-found";
import CoinDetailsPage from "./pages/coin-details";

//! if you have secrets, keys or sum you have to put ".env*" to .gitignore file.
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([])
  const [coinsRandom, setCoinsRandom] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [randomCoin, setRandomCoin] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc")
  
  //! API for logo
  useEffect(() => {
    const fetchLogoCoins = async () => {
      try {
        const res = await axios.get(`${API_URL}&order=market_cap_desc&per_page=25&page=1&parkline=false`);
        
        setCoinsRandom(res.data);
      } catch (err) {
        setError(err.message);
        console.error('Logo Error:', err);
      }
    };
    
    fetchLogoCoins();
  }, []);
  
  //! random color picker
  useEffect(() => {
    if (coinsRandom.length > 0) {
      const randomIndex = Math.floor(Math.random() * coinsRandom.length);
      setRandomCoin(coinsRandom[randomIndex]);
    }
  }, [coinsRandom]);
  
  //! API for list
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&parkline=false`);
        
        setCoins(res.data);
      } catch (err) {
        setError(err.message);
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCoins();
  }, [limit]);

  return (
    <>
      <Header randomCoin={randomCoin}/>
      <Routes>
        <Route path="/" element={<HomePage 
          coins={coins}
          filter={filter}
          setFilter={setFilter}
          limit={limit}
          setLimit={setLimit}
          sortBy={sortBy}
          setSortBy={setSortBy}
          randomCoin={randomCoin}
          loading={loading}
          error={error}
        />} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/coin/:id" element={<CoinDetailsPage/>} />
        <Route path="/*" element={<NotFoundPage/>} />
      </Routes>
    </>
  )
}
 
export default App;