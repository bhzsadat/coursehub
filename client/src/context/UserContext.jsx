import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// UserContext
const UserContext = createContext();

// UserProvider
export const UserProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    const signIn = async (email, password) => {
        const response = await fetch('http://localhost:5000/api/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${email}:${password}`)
            }
        });

        if (response.ok) {
            const user = await response.json();
            setAuthUser({ ...user, emailAddress: email, password });
            return user;
        } else {
            const error = await response.json();
            throw new Error(error.message);
        }
    };

    const signOut = () => {
        setAuthUser(null);
    };

    return (
        <UserContext.Provider value={{ authUser, signIn, signOut }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserContext;

