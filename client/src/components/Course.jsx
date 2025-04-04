import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import UserContext from '../context/UserContext.jsx';


// Course component
const Course = () => {
    const { id } = useParams();
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [course, setCourse] = useState({});
    const [errors, setErrors] = useState([]);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    // Fetch course data
    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch(`/api/courses/${id}`);
            if (response.ok) {
                const course = await response.json();
                setCourse(course);
            } else {
                navigate('/notfound');
            }
        };
        fetchCourse();
    }, [id, navigate]);

    // Handle delete course
    const handleDelete = async () => {
        if (!authUser) {
            navigate('/signin');
            return;
        }

        try {
            const response = await fetch(`/api/courses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Basic ' + btoa(`${authUser.emailAddress}:${authUser.password}`)
                },
            });

            if (response.ok) {
                navigate('/');
            } else if (response.status === 401) {
                const data = await response.json();
                setErrors([data.message]);
            } else if (response.status === 403) {
                setErrors(['You do not have permission to delete this course.']);
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            setErrors(['Failed to delete course. Please try again.']);
        }
    };

    if (!course) {
        return <p>Loading...</p>;
    }

    // Render course details
    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    {authUser && authUser.id === course.userId && (
                        <>
                            <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                            <button className="button" onClick={handleDelete}>Delete Course</button>
                        </>
                    )}
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>

            <div className="wrap">
                <h2>Course Detail</h2>
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
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            {course.User && (
                                <p>By {course.User.firstName} {course.User.lastName}</p>
                            )}
                            <p>{course.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                        </div>

                    </div>
                </form>
            </div>
        </main>
    );
};

export default Course;