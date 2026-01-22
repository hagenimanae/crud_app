

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"    to="/">CRUD App</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link  " to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">Add Item</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
   

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/add" element={<ItemForm />} />
          <Route path="/edit/:id" element={<ItemForm />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
