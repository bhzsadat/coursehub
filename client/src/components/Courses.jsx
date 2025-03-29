import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Courses component
const Courses = () => {
    const [courses, setCourses] = useState([]);

    // Fetch courses
    useEffect(() => {
        fetch("https://coursehub-xi.vercel.app/api/courses")
            .then((res) => res.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error("Error:", error));
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