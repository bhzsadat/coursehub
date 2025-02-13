import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Courses from './components/Courses'
import Course from './components/Course'
import Create from './components/Create'
import Update from './components/Update'
import PrivateRoute from './components/PrivateRoute';
import Forbidden from './components/Forbidden';
import Error from './components/Error';
import NotFound from './components/NotFound';

// App component
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/create" element={<PrivateRoute />}>
          <Route path="" element={<Create />} />
        </Route>
        <Route path="/courses/:id/update" element={<PrivateRoute />}>
          <Route path="" element={<Update />} />
        </Route>
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/error" element={<Error />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
