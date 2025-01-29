import { Link } from 'react-router-dom';

const Error = () => (
    <div className="wrap">
        <h2>Error</h2>
        <p>Sorry! We just encountered an unexpected error.</p>
        <Link className="button button-secondary" to="/">Return to List</Link>
    </div>
);

export default Error;