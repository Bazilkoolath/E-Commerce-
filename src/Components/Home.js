import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
    const [data, setData] = useState([]);
    const [sortOption, setSortOption] = useState('default');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); 
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Fetch products from API
    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(res => setData(res.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    // Filter and sort products based on user input
    useEffect(() => {
        let filtered = data;
    
        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    
        // Sort products based on selected option
        if (sortOption === 'price-asc') {
            filtered = filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortOption === 'price-desc') {
            filtered = filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if (sortOption === 'alphabetical') {
            filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        }
    
        setFilteredProducts(filtered);
    }, [searchTerm, sortOption, data]);

    // Navigate to the product details page
    const handleViewDetails = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div>
            <h1>Products</h1>

            <div className="filter-sort">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-box"
                />

                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="sort-dropdown"
                >
                    <option value="default">Sort by</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="alphabetical">Alphabetical</option>
                </select>
            </div>

            <div className="product-list">
                {filteredProducts.map(product => (
                    <div 
                        key={product.id} 
                        className="product-card"  
                        onClick={() => handleViewDetails(product.id)}
                    >
                        <h2>{product.title}</h2>
                        <img src={product.image} alt={product.title} width="180" height="180" />
                        <p>Price: ${product.price}</p>
                        <p>{product.description}</p>
                    </div>
                ))}

            </div>
            <button onClick={() => navigate('/cart')} className="continue-shopping-button">Your Cart </button>

        </div>
    );
}

export default Home;
