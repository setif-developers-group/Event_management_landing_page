import '../css/register.css'
import sdg_full from '../assets/logo/sdg_full.png'
import { useState, useEffect, useRef } from 'react';
import { SERVER_URL } from '../apis';
import ReCAPTCHA from 'react-google-recaptcha';

function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    attendance_type: 'on-site',
    workshop: ''
  });

  const [allWorkshops, setAllWorkshops] = useState([]);
  const [availableWorkshops, setAvailableWorkshops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef();

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      // Fetch both endpoints in parallel
      const [availableResponse, allResponse] = await Promise.all([
        fetch(`${SERVER_URL}/api/workshops/`),
        fetch(`${SERVER_URL}/api/workshops/all/`)
      ]);

      if (availableResponse.ok && allResponse.ok) {
        const availableData = await availableResponse.json();
        const allData = await allResponse.json();

        // Get the current active week from the first available workshop
        const currentWeek = availableData.length > 0 ? availableData[0].week : null;

        // Create a set of available workshop IDs for easy lookup
        const availableIds = new Set(availableData.map(w => w.id));

        // Mark workshops with their status
        const markedWorkshops = allData.map(workshop => ({
          ...workshop,
          status: availableIds.has(workshop.id) ? 'open' : 
                  workshop.week < currentWeek ? 'closed' : 'upcoming'
        }));

        setAllWorkshops(markedWorkshops);
        setAvailableWorkshops(availableData);
      } else {
        setError('Failed to load workshops. Please refresh the page.');
      }
    } catch (err) {
      setError('Network error while loading workshops.');
      console.error('Error fetching workshops:', err);
    }
  };

  const onCaptchaChange = (token) => {
    setCaptchaToken(token);
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

  // Validate captcha
  if (!captchaToken) {
    setError('Please complete the reCAPTCHA verification');
    setLoading(false);
    return;
  }

  console.log('Submitting with captcha token:', captchaToken); // Debug log

  try {
    const requestData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone_number,
      attendance_type: formData.attendance_type,
      workshop: parseInt(formData.workshop),
      captcha: captchaToken
    };

    console.log('Request data:', requestData); // Debug log

    const response = await fetch(`${SERVER_URL}/api/registrations/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    console.log('Response status:', response.status); // Debug log

    const responseData = await response.json();
    console.log('Response data:', responseData); // Debug log

    if (response.ok) {
      setSuccess('Registration successful! Please confirm you email.');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        attendance_type: 'on-site',
        workshop: ''
      });
      recaptchaRef.current.reset();
      setCaptchaToken(null);
    } else {
      // Handle errors
      if (responseData.captcha) {
        setError(`Captcha Error: ${Array.isArray(responseData.captcha) ? responseData.captcha.join(', ') : responseData.captcha}`);
      } else if (typeof responseData === 'object' && Object.keys(responseData).length > 0) {
        const errorMessages = Object.entries(responseData)
          .map(([field, errors]) => {
            const errorMsg = Array.isArray(errors) ? errors.join(', ') : errors;
            return `${field}: ${errorMsg}`;
          })
          .join('\n');
        setError(errorMessages);
      } else {
        setError('Registration failed. Please try again.');
      }
      
      // Reset captcha on errorobject
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setCaptchaToken(null);
      }
    }
  } catch (err) {
    console.error('Caught error:', err); // Debug log
    setError('Network error. Please check your connection and try again.');
    
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
      setCaptchaToken(null);
    }
  } finally {
    setLoading(false);
  }
};
  
  return (
    <div className="register-page">
      <div className='px-5 md:px-10 lg:px-60 grid grid-cols-1 md:grid-cols-2 py-52 text-white'>
        <div className='register-form-bg flex justify-center items-center rounded-2xl'>
          <img src={sdg_full} alt="sdg logo" className='w-1/2'/>
        </div>
        <div className='register-form'>
          <div className="bg-white bg-opacity-90 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-green-500 mb-6 text-center">SSL Register</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 whitespace-pre-line">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
              />

              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
              />

              <input
                type="tel"
                name="phone_number"
                placeholder="Phone Number (10 digits)"
                value={formData.phone_number}
                onChange={handleChange}
                required
                maxLength="10"
                pattern="[0-9]{10}"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
              />

              <select
                name="workshop"
                value={formData.workshop}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
              >
                <option value="">Select Workshop</option>
                {allWorkshops.map((workshop) => (
                  <option 
                    key={workshop.id} 
                    value={workshop.id}
                    disabled={workshop.status !== 'open'}
                    style={{
                      color: workshop.status === 'open' ? '#059669' :
                             workshop.status === 'closed' ? '#DC2626' : '#EAB308'
                    }}
                  >
                    {workshop.title} ——
                    {workshop.status === 'closed' ? ' (Registration Closed)' : 
                     workshop.status === 'upcoming' ? ' (Registration Opens Week ' + workshop.week + ')' : 
                     workshop.status === 'open' ? ' (Open - Week ' + workshop.week + ')' : ''}
                  </option>
                ))}
              </select>

              <select
                name="attendance_type"
                value={formData.attendance_type}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
              >
                <option value="on-site">On-site</option>
                <option value="online">Online</option>
              </select>

              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LcnENsrAAAAAMP4GeEMvvfhk1_-aT7YQGOcSKWq"
                  onChange={onCaptchaChange}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !captchaToken}
                className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
              >
                {loading ? 'Registering...' : 'Register Me'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;