import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ProductView = () => {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useOutletContext(); // ⬅️ Shared cart from Layout

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleIncrease = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const handleDecrease = (id) => {
    setCart((prev) => {
      const newQty = (prev[id] || 1) - 1;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(({ id, title, price, description, image }) => (
          <div key={id} className="border rounded-lg shadow hover:shadow-lg flex flex-col">
            <img src={image} alt={title} className="h-48 object-contain p-4" />
            <div className="px-4 flex-grow">
              <h2 className="font-semibold text-lg truncate" title={title}>{title}</h2>
              <p className="text-blue-700 font-bold mt-1">${price.toFixed(2)}</p>
              <p className="text-gray-600 text-sm mt-2 h-16 overflow-hidden">
                {description.length > 100 ? description.slice(0, 100) + '...' : description}
              </p>
            </div>

            <div className="p-4 flex items-center justify-center space-x-4">
              {!cart[id] ? (
                <button
                  onClick={() => handleAddToCart(id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleDecrease(id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    -
                  </button>
                  <span className="font-semibold">{cart[id]}</span>
                  <button
                    onClick={() => handleIncrease(id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductView;
