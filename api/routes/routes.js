const express = require('express');
const router = express.Router();
const { Users, Courses } = require('../models');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');



// Authenticate user
const authenticateUser = async (req, res, next) => {
    let message = null;
    const credentials = auth(req);

    if (credentials) {
        const user = await Users.findOne({ where: { emailAddress: credentials.name } });
        if (user) {
            const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
            if (authenticated) {
                console.log(`Authentication successful for email: ${user.emailAddress}`);
                req.currentUser = user;
            } else {
                message = `Authentication failure for email: ${user.emailAddress}`;
            }
        } else {
            message = `User not found for email: ${credentials.name}`;
        }
    } else {
        message = 'Auth header not found';
    }

    if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
    } else {
        next();
    }
};



// Sign up user
router.post('/users', async (req, res) => {
    try {
        const { firstName, lastName, emailAddress, password } = req.body;
        const user = await Users.create({
            firstName,
            lastName,
            emailAddress,
            password
        });
        res.status(201).json(user);
    } catch (error) {
        console.error('Error:', error);
        if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ message: error.errors.map(e => e.message) });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// Sign in user
router.post('/users/signin', authenticateUser, async (req, res) => {
    try {
        const user = req.currentUser;
        res.status(200).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get all courses
router.get('/courses', async (req, res) => {
    try {
        console.log('Attempting to fetch all courses...');
        const courses = await Courses.findAll();
        console.log('Courses fetched successfully:', courses.length);
        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            message: error.message,
            details: error.name
        });
    }
});

// Get a course by id
router.get('/courses/:id', async (req, res) => {
    try {
        const course = await Courses.findByPk(req.params.id, {
            include: {
                model: Users,  
                attributes: ['firstName', 'lastName']  
            }
        });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ message: 'Failed to fetch the course' });
    }
});



// Create a course
router.post('/courses', authenticateUser, async (req, res) => {
    try {
        const course = await Courses.create({
            ...req.body,
            userId: req.currentUser.id
        });
        res.status(201).json(course);
    } catch (error) {
        console.error('Error:', error);
        if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ message: error.errors.map(e => e.message) });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

// Update a course
router.put('/courses/:id', authenticateUser, async (req, res) => {
    try {
        const course = await Courses.findByPk(req.params.id);
        if (course) {
            if (course.userId === req.currentUser.id) {
                await course.update(req.body);
                res.status(204).end();
            } else {
                res.status(403).json({ message: 'Access Denied' });
            }
        } else {
            res.status(404).json({ message: 'Course Not Found' });
        }
    } catch (error) {
        console.error('Error:', error);
        if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ message: error.errors.map(e => e.message) });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

// Delete a course
router.delete('/courses/:id', authenticateUser, async (req, res) => {
    try {
        const course = await Courses.findByPk(req.params.id);
        if (course) {
            if (course.userId === req.currentUser.id) {
                await course.destroy();
                res.status(204).end();
            } else {
                res.status(403).json({ message: 'Access Denied' });
            }
        } else {
            res.status(404).json({ message: 'Course Not Found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;