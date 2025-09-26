import '../css/register.css'
import sdg_full from '../assets/logo/sdg_full.png'
import { useState, useEffect } from 'react';
import { SERVER_URL } from '../apis';

function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    attendance_type: 'on-site',
    workshop: ''
  });

  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch workshops on component mount
  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/workshops/`);
      if (response.ok) {
        const data = await response.json();
        setWorkshops(data);
      } else {
        setError('Failed to load workshops');
      }
    } catch (err) {
      setError('Error loading workshops');
      console.error('Error:', err);
    }
  };

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
    setSuccess('');

    try {
      const response = await fetch(`${SERVER_URL}/api/registrations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          workshop: parseInt(formData.workshop)
        })
      });

      if (response.ok) {
        setSuccess('Registration successful! We\'ll contact you soon.');
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
          attendance_type: 'online',
          workshop: ''
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (

        <div className="register-page">
            <div className='px-5 md:px-10 lg:px-60 grid grid-cols-1 md:grid-cols-2 py-52 text-white'>
                <div className='register-form-bg flex justify-center items-center rounded-2xl'>
                    <img src={sdg_full} alt="sdg logo"  className='w-1/2'/>
                </div>
                <div className='register-form'>
                    <div className="bg-white bg-opacity-90 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-green-500 mb-6 text-center">SSL Register</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <div className="space-y-4">
        {/* First Name */}
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
        />

        {/* Last Name */}
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
        />

        {/* Phone Number */}
        <input
          type="tel"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
        />

        {/* Workshop Selection */}
        <select
          name="workshop"
          value={formData.workshop}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
        >
          <option value="">Select Workshop</option>
          {workshops.map((workshop) => (
            <option key={workshop.id} value={workshop.id}>
              {workshop.title}
            </option>
          ))}
        </select>

        {/* Attendance Type */}
        <select
          name="attendance_type"
          value={formData.attendance_type}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
        >
          <option value="online">Online</option>
          <option value="on-site">On-site</option>
        </select>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
        >
          {loading ? 'Registering...' : 'Register Me'}
        </button>
      </div>
    </div>
                </div>

            </div>
        </div>
    


    
  );
};
    

export default Register