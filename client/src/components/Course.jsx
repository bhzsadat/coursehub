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

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch(`http://localhost:5000/api/courses/${id}`);
            if (response.ok) {
                const course = await response.json();
                setCourse(course);
            } else {
                navigate('/notfound');
            }
        };
        fetchCourse();
    }, [id, navigate]);

    const handleDelete = async () => {
        if (!authUser) {
            navigate('/signin');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
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
                            <p>By {course.author}</p>
                            <ReactMarkdown>{course.description}</ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {course.materialsNeeded && course.materialsNeeded.split('\n').filter(material => material.trim() !== '').map((material, index) => (
                                    <li key={index}><ReactMarkdown>{material.replace(/^\* /, '')}</ReactMarkdown></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Course;