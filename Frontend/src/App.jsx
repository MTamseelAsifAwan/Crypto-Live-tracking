import React, { useEffect, useState } from 'react';
import Navbarr from './Components/Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [allcoins, setAllcoins] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('usd');

  const currencySymbols = {
    usd: '$',
    pkr: '₨',
    eur: '€',
    inr: '₹'
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-8Yf7ucc8MQNYVmwXLjhhbLN1'
        }
      };

      if (query.trim() !== '') {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&ids=${query}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`, options);
        setAllcoins(response.data);
        console.log('searchedddd');
      } 
      if(query.trim() =='') { 
        toast.error('Please enter a valid coin name');
        handleCoins();

      }
     
    } catch (err) {
      console.log(err);
      toast.error('Failed to fetch search results');
    }
    // setQuery("");
  };

  const handleCoins = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-8Yf7ucc8MQNYVmwXLjhhbLN1'
        }
      };

      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`, options);
      setAllcoins(response.data);
    } catch (err) {
      console.log(err);
      toast.error('Failed to fetch coins data');
    }
  };

  useEffect(() => {
   if(query.trim() === '') {
    handleCoins();
   }
  }, [selectedCurrency]);

  return (
    <>
      <div className="">
        <Navbarr selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
        <h1 className="text-white flex justify-center mt-5 font-bold text-3xl text-center leading-8">
          Largest <br />
          Crypto Marketplace
        </h1>
        <p className="text-[#e3e3e3] flex justify-center p-1 mt-4 font-bold text-base leading-6 text-center">
          Welcome to the world's largest cryptocurrency marketplace.<br />
          Sign up to explore more about cryptos.
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center justify-center p-1">
        <div className="rounded-lg bg-gray-200 p-1">
          <div className="flex">
            <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-2">
              <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute w-5 fill-gray-500 transition">
                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
              </svg>
            </div>
            <input type="text" className="w-full max-w-[160px] text-black bg-white pl-2 text-base font-semibold outline-0" placeholder="" id="" value={query} onChange={handleInputChange} />
            <input type="button" value="Search" className="bg-[#332686] p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors" onClick={handleSearch} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="container-fluid mt-7 ml-[-1rem]">
        <div className="row flex justify-center ">
          <div className="col-md-12 ">
            <div className="row ml-12 ">
              <div className="col-md-1 border border-black rounded border-solid shadow-2xl bg-gradient-to-r from-[#0b004e] via-[#1d152f] to-[#0b004e] font```javascript
-bold">#</div>
              <div className="col-md-2 border border-black rounded border-solid shadow-2xl bg-gradient-to-r from-[#0b004e] via-[#1d152f] to-[#0b004e] font-bold">Coins</div>
              <div className="col-md-1 border border-black rounded border-solid shadow-2xl bg-gradient-to-r from-[#0b004e] via-[#1d152f] to-[#0b004e]">Change (24h)</div>
              <div className="col-md-2 border border-black rounded border-solid shadow-2xl bg-gradient-to-r from-[#0b004e] via-[#1d152f] to-[#0b004e]">Price</div>
              <div className="col-md-2 border border-black rounded border-solid shadow-2xl bg-gradient-to-r from-[#0b004e] via-[#1d152f] to-[#0b004e]">High (24h)</div>
              <div className="col-md-2 border border-black rounded border-solid shadow-2xl bg-gradient-to-r from-[#0b004e] via-[#1d152f] to-[#0b004e]">Low (24h)</div>
              <div className="col-md-2 border border-black rounded border-solid shadow-2xl bg-gradient-to-r from-[#0b004e] via-[#1d152f] to-[#0b004e]">Market Cap</div>
            </div>
            {allcoins.map((data) => (
              <div key={data.id} className="row flex items-center ml-12">
                <div className="col-md-1 border border-black rounded border-solid shadow-2xl font-bold bg-gradient-to-r from-[#0b004e] via-[#1d152f] to-[#0b004e]">{data.market_cap_rank}</div>
                <div className="col-md-2 border border-black rounded border-solid shadow-2xl flex items-center font-bold bg-gradient-to-r from-[#0b004e] via-[#1d152f] to-[#0b004e]">
                  <img src={data.image} className="w-5 h-5 mr-2" alt={data.name} />
                  {data.name}
                </div>
                <div className={`col-md-1 border border-black rounded border-solid shadow-2xl bg-gradient-to-r from-[#0b004e] via-[#1d152f] to-[#0b004e] ${data.price_change_percentage_24h < 0 ? 'text-red-600' : 'text-green-500'}`}>
      {data.price_change_percentage_24h.toFixed(2)}%
    </div>
                <div className="col-md-2 border border-black rounded border-solid shadow-2xl bg-gradient-to-r from-[#0b004e] via-[#1d152f] to-[#0b004e]">
                  {currencySymbols[selectedCurrency]} {data.current_price.toFixed(2)}
                </div>
                <div className="col-md-2 border border-black rounded border-solid shadow-2xl bg-gradient-to-r from-[#0b004e] via-[#1d152f] to-[#0b004e]">
                  {currencySymbols[selectedCurrency]} {data.high_24h.toFixed(2)}
                </div>
                <div className="col-md-2 border border-black rounded border-solid shadow-2xl bg-gradient-to-r from-[#0b004e] via-[#1d152f] to-[#0b004e]">
                  {currencySymbols[selectedCurrency]} {data.low_24h.toFixed(2)}
                </div>
                <div className="col-md-2 border border-black rounded border-solid shadow-2xl bg-gradient-to-r from-[#0b004e] via-[#1d152f] to-[#0b004e] ">                 
                  {currencySymbols[selectedCurrency]} {data.market_cap.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />
      <ToastContainer />
      <footer>
        <p className='flex justify-center mt-1'>
        Copyright @ 2024, Cryptoplace - All Right Reserved.
        </p>
      </footer>
    </>
  );
};

export default App;
