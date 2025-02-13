import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext.jsx';

// Header component
const Header = () => {
    const { authUser, signOut } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate('/');
    };

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    {authUser ? (
                        <ul className="header--signedin">
                            <li>Welcome, {authUser.firstName} {authUser.lastName}!</li>
                            <li><button className="button" onClick={handleSignOut}>Sign Out</button></li>
                        </ul>
                    ) : (
                        <ul className="header--signedout">
                            <li><Link to="/signup">Sign Up</Link></li>
                            <li><Link to="/signin">Sign In</Link></li>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;

