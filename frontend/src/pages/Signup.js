import { useState } from 'react';
import { useSignup } from '../hooks/useSignUp';
import { toast, ToastContainer } from 'react-toastify';  // Import toast notifications
import 'react-toastify/dist/ReactToastify.css';  // Import default styles for toast notifications
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import icons for showing/hiding password
import { MdFitbit } from "react-icons/md";
import './Login.css'

const Signup = () => {

    // State for handling email, password, and validation errors
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);  // State for toggling password visibility
    const { signup, error, isLoading } = useSignup();  // Custom signup hook with error and loading states
    const [validationError, setValidationError] = useState('');

    // Frontend validation for the form (for password length in this case)
    const validateForm = () => {
        setValidationError('');  // Clear previous validation error
        if (password.length < 6) {  // Check if password is less than 6 characters
            setValidationError('Password must be at least 6 characters long');
            return false;  // Return false if validation fails
        }
        return true;  // Return true if validation is successful
    };

    // Handle form submission for signup
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior

        if (!validateForm()) {
            return;  // Stop form submission if validation fails
        }

        const result = await signup(email, password);  // Call the signup function from the custom hook

        // Show toast notifications based on signup result
        if (result) {
            toast.success('Signup successful!');  // Show success toast if signup is successful
        } else {
            toast.error('Signup failed. Please try again.');  // Show error toast if signup fails
        }
    };

    // Toggle password visibility by changing the input type between 'password' and 'text'
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
            Sign Up
           </div>
           <div className="auth-form-content">
           <form className="signup" onSubmit={handleSubmit}>

                {/* Email input field */}
                <label>Email</label>
                <input
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}  // Update email state on change
                    value={email}
                    required  // Ensure the email field is required
                />

                {/* Password input field with show/hide functionality */}
                <label>Password</label>
                <div style={{ position: 'relative' }}>  {/* Password input wrapper for icon positioning */}
                    <input
                        type={showPassword ? 'text' : 'password'}  // Toggle between 'password' and 'text' based on showPassword state
                        onChange={(e) => setPassword(e.target.value)}  // Update password state on change
                        value={password}
                        required  // Ensure the password field is required
                    />
                    {/* Icon for showing or hiding password */}
                    <span
                        onClick={togglePasswordVisibility}  // Toggle password visibility on click
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',  // Vertically center the icon
                            cursor: 'pointer'  // Change cursor to pointer to indicate clickable element
                        }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}  {/* Toggle icon between FaEyeSlash (hide) and FaEye (show) */}
                    </span>
                </div>

                {/* Submit button, disabled while loading */}
                <button disabled={isLoading} className='auth-button'>Sign up</button>

                {/* Display validation error (e.g., password too short) */}
                {validationError && <div className='error'>{validationError}</div>}
                
                {/* Display signup error from the custom hook if any */}
                {error && <div className='error'>{error}</div>}
                <p className="auth-footer">
                  By signing up, you agree to our{' '}
                 <a href="#">Terms of Service</a> and{' '}
                 <a href="#">Privacy Policy</a>.
                </p>
            </form>

            {/* Toast container for notifications */}
            <ToastContainer 
                position="top-right"  // Set toast position to the top right
                autoClose={3000}  // Close the toast after 3 seconds
                hideProgressBar={false}  // Show progress bar for the toast
            />
            </div>
            </div>
            </div>
            </div>
            </div>
        </>
    );
};

export default Signup;

