import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext.jsx';
import ValidationErrors from './ValidationErrors.jsx';

// SignUp component
const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const { signIn } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUser = {
            firstName,
            lastName,
            emailAddress: email,
            password,
        };

        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                await signIn(email, password); 
                navigate('/'); 
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.message);
            } else {
                navigate('/error');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            navigate('/error');
        }
    };

    return (
        <div className="form--centered">
            <h2>Sign Up</h2>
            <ValidationErrors errors={errors} />
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
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
                <button className="button" type="submit">Sign Up</button>
                <button
                    className="button button-secondary"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/');
                    }}
                >
                    Cancel
                </button>
            </form>
            <p>
                Already have a user account? Click here to <a href="/signin">sign in</a>!
            </p>
        </div>
    );
};

export default SignUp;