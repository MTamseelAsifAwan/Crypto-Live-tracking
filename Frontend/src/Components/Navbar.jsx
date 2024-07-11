import React from 'react';

function Navbarr({ selectedCurrency, setSelectedCurrency }) {
  return (
    <>
      <nav className="bg-gray-200 p-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src='https://cryptologos.cc/logos/bittensor-tao-logo.png?v=032' alt="Logo" className="h-8 w-8" />
          <ul className="flex space-x-4 font-bold">
            <li className="text-black">Home</li>
            <li className="text-black">Features</li>
            <li className="text-black">Pricing</li>
          </ul>
          <div className="flex items-center space-x-2 p-1 text-black">
            <select 
              className="p-1 bg-[#332686] text-white rounded hover:bg-blue-800 transition-colors" 
              value={selectedCurrency} 
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              <option value="usd">USD</option>
              <option value="pkr">PKR</option>
              <option value="eur">Euro</option>
              <option value="inr">INR</option>
            </select>
            <button className="bg-[#332686] text-white p-1 rounded hover:bg-blue-800 transition-colors">Signup/Login</button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbarr;
