import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApiUrl, defaultFetchOptions } from '../config.js';

// Courses component
const Courses = () => {
    const [courses, setCourses] = useState([]);

    // Fetch courses
    useEffect(() => {
        const apiUrl = getApiUrl('/api/courses');
        console.log('API URL:', apiUrl);
        console.log('Fetch options:', defaultFetchOptions);
        
        fetch(apiUrl, defaultFetchOptions)
            .then((res) => {
                console.log('Response status:', res.status);
                return res.json();
            })
            .then((data) => {
                console.log('Data received:', data);
                setCourses(data);
            })
            .catch((error) => {
                console.error("Error details:", error);
            });
    }, []);

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