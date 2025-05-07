import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Courses component
const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    // Fetch courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('https://coursehub-xpiq.onrender.com/api/courses', {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError(error.message);
            }
        };

        fetchCourses();
    }, []);

    if (error) {
        return <div>Error loading courses: {error}</div>;
    }

    // Display courses
    return (
        <main>
            <div className="wrap main--grid">
                {courses.map((course) => (
                    <Link
                        key={course.id}
                        className="course--module course--link"
                        to={`/courses/${course.id}`}
                    >
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                    </Link>
                ))}
                <Link className="course--module course--add--module" to="/courses/create">
                    <span className="course--add--title">
                        + New Course
                    </span>
                </Link>
            </div>
        </main>
    );
};

export default Courses;