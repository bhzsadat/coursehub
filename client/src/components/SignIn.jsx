import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext.jsx';

// SignIn component
const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const { signIn } = useContext(UserContext);
    const navigate = useNavigate();

    // Handle sign in
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signIn(email, password);
            navigate('/');
        } catch (error) {
            setErrors([error.message]);
        }
    };

    // Render sign in form
    return (
        <div className="form--centered">
            <h2>Sign In</h2>
            {errors.length > 0 && (
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="emailAddress">Email Address</label>
                <input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={() => navigate('/')}>Cancel</button>
            </form>
        </div>
    );
};

export default SignIn;