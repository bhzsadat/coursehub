import { useState, useContext  } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from '../context/UserContext.jsx';
import ValidationErrors from './ValidationErrors.jsx';

// Create a new course
const Create = () => {
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");
    const [authorName] = useState("");
    const [errors, setErrors] = useState([]);
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!authUser) {
            setErrors(['You must be signed in to create a course.']);
            return;
        }

        // Create a new course object
        const newCourse = {
            title: courseTitle,
            description: courseDescription,
            estimatedTime,
            materialsNeeded,
            author: authorName,
            userId: authUser.id
        };

        // Send a POST request to create a new course
        try {
            const response = await fetch(`/api/courses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(`${authUser.emailAddress}:${authUser.password}`)
                },
                body: JSON.stringify(newCourse),
            });
            if (response.status === 201) {
                navigate('/'); 
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.message);
            } else {
                const errorData = await response.json();
                console.error('Error creating course:', errorData);
                throw new Error('Something went wrong');
            }
        } catch (error) {
            console.error('Error creating course:', error);
            setErrors(['Failed to create the course. Please try again.']);
        }
    };

    // Render the form
    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
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
                    <button className="button" type="submit">Create Course</button>
                    <Link className="button button-secondary" to="/">Cancel</Link>
                </form>
            </div>
        </main>
    );
}

export default Create;

