import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const ItemForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      const fetchItem = async () => {
        try {
          const response = await axios.get(`${API_URL}/items/${id}`);
          setFormData({
            name: response.data.name,
            description: response.data.description || ''
          });
        } catch (err) {
          console.error('Error fetching item:', err);
          setError('Failed to load item data');
        }
      };
      fetchItem();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/items/${id}`, formData);
      } else {
        await axios.post(`${API_URL}/items`, formData);
      }
      navigate('/');
    } catch (err) {
      console.error('Error saving item:', err);
      setError(err.response?.data?.error || 'Failed to save item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isEditing ? 'Edit Item' : 'Add New Item'}</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label text-white-500">Name *</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="description" className="form-label  text-blue-400">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        
        <div className="d-flex gap-2">
          <button 
            type="submit" 
            className="btn btn-primary "
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
