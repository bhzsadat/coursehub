import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../context/UserContext.jsx';

// PrivateRoute component
const PrivateRoute = () => {
    const { authUser } = useContext(UserContext);

    return authUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;