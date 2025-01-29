import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Heart, Loader } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';


const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (formData.username === 'moonpie' && formData.password === 'ilovebagchi@69') {
        toast.success('Eibar Perechis! 💖', {
          position: 'top-right',
          autoClose: 2000,
        });
        
        setTimeout(() => {
          setIsAuthenticated(true);
          navigate('/bagchi');
        }, 1500);
      } else {
        toast.error('kalke ay tow 💔', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.',error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <Heart size={40} color="#ff9a9e" />
          <h1>Happy Valentine Love</h1>
          <p>amar bhetore aste chas?</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">নাম বল</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="thik kore"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Secret code বল</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="dekhi byapar ta"
              required
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="loading-spinner" size={16} />
                Logging in...
              </>
            ) : (
              'Amake Tep'
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;