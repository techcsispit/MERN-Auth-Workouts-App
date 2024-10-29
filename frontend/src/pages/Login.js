import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import eye icons for show/hide password
import { toast, ToastContainer } from 'react-toastify';  // Import toast functions
import { MdFitbit } from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';  // Import React Toastify CSS

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);  
    const { login, error, isLoading } = useLogin();  
    const [validationError, setValidationError] = useState('');  // State for form validation error

    // Form validation function to check for basic validation (e.g., password length)
    const validateForm = () => {
        setValidationError('');  // Clear any previous validation errors
        if (password.length < 8) {  // Check if password is less than 8 characters
            setValidationError('Password must be at least 8 characters long');
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before proceeding with login
        if (!validateForm()) {
            toast.error('Password must be at least 8 characters long');  // Show validation error using toast
            return;  // Stop form submission if validation fails
        }

        const result = await login(email, password);  // Call login function from custom hook

        if (result) {
            toast.success('Login successful!');  // Show success toast if login is successful
        } else {
            toast.error(error || 'Login failed. Please try again.');  // Show error toast if login fails
        }
    };

    // Toggle function for showing/hiding password
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);  // Toggle showPassword state
    };

    return (
        <>
        <div className="auth-container">
      <div className="auth-form">
        <div className="auth-form-container">
          <div className="auth-logo">
            <MdFitbit />
            <h2>Welcome to WorkoutBuddy</h2>
            <p>Your perfect workout partner</p>
          </div>

          <div className="auth-card">
           <div className="auth-tab">
            Login
           </div>
           <div className="auth-form-content">
            <form className="signup" onSubmit={handleSubmit}>
                {/* Email input */}
                <label>Email</label>
                <input
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}  // Update email state
                    value={email}
                    required  // Ensure the email field is required
                />

                {/* Password input with show/hide functionality */}
                <label>Password</label>
                <div style={{ position: 'relative' }}>  {/* Wrapper for password input and icon */}
                    <input
                        type={showPassword ? 'text' : 'password'}  // Toggle between 'password' and 'text'
                        onChange={(e) => setPassword(e.target.value)}  // Update password state
                        value={password}
                        required  // Ensure the password field is required
                    />
                    <span
                        onClick={togglePasswordVisibility}  // Toggle password visibility on click
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',  // Vertically center the icon
                            cursor: 'pointer'  // Indicate that the icon is clickable
                        }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}  {/* Toggle between FaEyeSlash (hide) and FaEye (show) */}
                    </span>
                </div>

                {/* Submit button */}
                <button disabled={isLoading} className='auth-button'>Log In</button>  {/* Disabled while loading */}
                <p className="auth-link">
                        Don't have an account?{' '}
                        <a href="/signup" className="auth-link-text">
                          Sign up
                        </a>
                      </p>
            </form>

            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            </div>
            </div>
            </div>
            </div>
            </div>
        </>
    );
};

export default Login;