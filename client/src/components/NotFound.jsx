import { Link } from 'react-router-dom';

// NotFound component
const NotFound = () => (
    <div className="wrap">
        <h2>Not Found</h2>
        <p>Sorry! We could not find the page you are looking for.</p>
        <Link className="button button-secondary" to="/">Return to List</Link>
    </div>
);

export default NotFound;