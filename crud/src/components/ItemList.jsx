import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //fetching an object from my database
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/items`);
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to load items');
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  //deleting an object

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${API_URL}/items/${id}`);
        setItems(items.filter(item => item.id !== id));
      } catch (err) {
        console.error('Error deleting item:', err);
        alert('Failed to delete item');
      }
    }
  };

  if (loading) return <div className="text-center my-4">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    
    <div className="container mt-4">
   

          <h6 className="text-3xl font-bold ">hello world</h6>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Items</h2>
        <Link to="/add" className="btn btn-primary hover:bg-blue-800 focus:ring-2 focus-ring-blue-500">
          Add New Item
        </Link>
      </div>
      
      {items.length === 0 ? (
        <div className="alert alert-info">No items found. Add your first item!</div>
      ) : (
        
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark text-blue-400">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                  <td>
                    <Link to={`/edit/${item.id}`} className="btn btn-sm btn-warning me-2">
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    
  );
  
};

export default ItemList;
