import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [post, setPost] = useState([]);
  const [priceSearch, setPriceSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, []);

  let filteredArray = post;

  const searchprice = parseFloat(priceSearch);


  if (priceSearch.trim() === '' && productSearch.trim() === '') {
    filteredArray = post;
  } else if (priceSearch.trim() === '' && !isNaN(searchprice) && productSearch.trim() === '') {
    filteredArray = post.filter((data) => data.price <= searchprice
    );
  } else if (priceSearch.trim() === '' && productSearch.trim() !== '') {
    filteredArray = post.filter((data) =>
      data.category.toLowerCase().indexOf(productSearch.toLowerCase())
    );
  } else if (!isNaN(searchprice) && productSearch.trim() !== '') {
    filteredArray = post.filter((data) =>
      data.price <= searchprice &&
      data.category.toLowerCase().includes(productSearch.toLowerCase())
    );
  } else {
    filteredArray = [];
  }

  return (
    <>

    <p className='text-6xl text-blue-800  mb-6 playfair_font'>React Store App</p>
      <div className="p-4 max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Search by Price</h2>
          <input
            type="search"
            placeholder="Enter price to search"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPriceSearch(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Search by Category</h2>
          <input
            type="search"
            placeholder="Enter category to search"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setProductSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredArray.map((data) => (
          <div key={data.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
            <h1 className="text-lg font-semibold mb-2 text-gray-900">{data.title}</h1>
            <img className="w-full h-40 object-cover rounded-lg mb-4" src={data.image} alt={data.title} />
            <p className="text-gray-600 text-sm mb-2">{data.description}</p>
            <p className="text-indigo-600 text-sm font-semibold mb-2">{data.category}</p>
            <span className="text-green-600 font-bold text-lg">{data.price}$</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
