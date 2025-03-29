import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from '../context/UserContext.jsx';
import ValidationErrors from './ValidationErrors.jsx';

// Update component
const Update = () => {
    const { id } = useParams();
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");
    const [authorName, setAuthorName] = useState("");
    const { authUser } = useContext(UserContext);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    // Fetch course data
    useEffect(() => {
        if (!authUser) {
            navigate('/signin');
        } else {
            const fetchCourse = async () => {
                const response = await fetch(`https://coursehub-xi.vercel.app/api/courses/${id}`);
                if (response.ok) {
                    const course = await response.json();
                    setCourseTitle(course.title || '');
                    setCourseDescription(course.description || '');
                    setEstimatedTime(course.estimatedTime || '');
                    setMaterialsNeeded(course.materialsNeeded || '');
                    if (course.User) {
                        const authorName = `${course.User.firstName} ${course.User.lastName}`;
                        setAuthorName(authorName);
                    }
                } else {
                    navigate('/notfound'); 
                }
            };
            fetchCourse();
        }
    }, [authUser, id, navigate]);
   

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!authUser) {
            setErrors(['You must be signed in to update a course.']);
            return;
        }
        const updatedCourse = {
            title: courseTitle,
            description: courseDescription,
            estimatedTime,
            materialsNeeded,
        };

        // Send a PUT request to update the course
        try {
            const response = await fetch(`https://coursehub-xi.vercel.app/api/courses/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(`${authUser.emailAddress}:${authUser.password}`)
                },
                body: JSON.stringify(updatedCourse),
            });

            if (response.status === 204) {
                navigate(`/courses/${id}`); 
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(Array.isArray(data.message) ? data.message : [data.message]);
            } else if (response.status === 403) {
                setErrors(['You do not have permission to update this course.']);
            } else if (response.status === 404) {
                navigate('/notfound');
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            console.error('Error updating course:', error);
            setErrors(['Failed to update the course. Please try again.']);
        }
    };

    // Render the form
    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <ValidationErrors errors={errors} />
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input
                                id="courseTitle"
                                name="courseTitle"
                                type="text"
                                value={courseTitle}
                                onChange={(e) => setCourseTitle(e.target.value)}
                            />
                            <label htmlFor="authorName">Author Name</label>
                            <p>{authorName}</p>
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea
                                id="courseDescription"
                                name="courseDescription"
                                value={courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                value={estimatedTime}
                                onChange={(e) => setEstimatedTime(e.target.value)}
                            />
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea
                                id="materialsNeeded"
                                name="materialsNeeded"
                                value={materialsNeeded}
                                onChange={(e) => setMaterialsNeeded(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button>
                    <Link className="button button-secondary" to="/">Cancel</Link>
                </form>
            </div>
        </main>
    );
}

export default Update;