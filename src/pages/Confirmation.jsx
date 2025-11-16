import { useState, useEffect, useRef } from 'react';
import { SERVER_URL } from '../apis';
import { useSearchParams } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';

function Confirmation() {
    const [captchaToken, setCaptchaToken] = useState(null);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const recaptchaRef = useRef();
    const [searchParams] = useSearchParams();

    useEffect(() => {
      const urlToken = searchParams.get('token');
      setToken(urlToken);
    }, [searchParams]);

    const onCaptchaChange = (token) => {
    setCaptchaToken(token);
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
      token: token,
      captcha: captchaToken
    };

    console.log('Request data:', requestData); // Debug log

    const response = await fetch(`${SERVER_URL}/api/confirm-email/`, {
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
      setSuccess('Confirmation successful! We\'ll contact you soon.');
      setToken('');
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
        setError('Confirmation failed. Please try again.');
      }
      
      // Reset captcha on error
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
console.log(token);
    return (
        <div className="bg-brand-dark text-white px-5 md:px-10 lg:px-60 py-32 h-screen">
            <h2 className='text-4xl font-semibold mb-5 text-center py-10'>Confirm your email</h2>
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
            <form onSubmit={handleSubmit} className="space-y-12 ">
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
              >{loading ? 'Confirming...' : 'Confirm'}</button>
            </form>
        </div>
    )
}


export default Confirmation