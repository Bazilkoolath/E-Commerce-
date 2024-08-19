import './App.css';
import Cart from './Components/Cart';
import Home from './Components/Home';
import ProductDetail from './Components/ProductDetail'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
