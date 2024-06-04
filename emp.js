import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from 'dotenv';

dotenv.config();

let conn = await mongoose.connect(process.env.DB_URL);

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
        collectionName: 'sessions'
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

import { Com } from "./models/company.js";
import { Feed } from "./models/company.js";
import { authMiddleware } from './models/authMiddleware.js';

// Middleware to check if user is logged in
const checkAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

app.get('/wordproblem', async (req, res) => {
    res.render('wordproblem');
});

app.get('/login', async (req, res) => {
    res.render('index', { foo: 'Foo' });
});

app.get('/gemeplay', async (req, res) => {
    res.render('gemeplay');
});

app.get('/learning', async (req, res) => {
    res.render('learning');
});

app.get('/register', async (req, res) => {
    res.render('register');
});

app.get('/forgot', async (req, res) => {
    res.render('forgot');
});

app.post('/feedsubmit', async (req, res) => {
    try {
        const { username, email, feedbackTextArea } = req.body;

        const existingUser = await Com.findOne({ name: username });
        if (existingUser) {
            const newUser = new Feed({ name: username, email: email, text: feedbackTextArea });
            await newUser.save();
            res.send('Your feedback has been submitted successfully');
        } else {
            res.send('Enter a valid Registered username');
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await Com.findOne({ name: username });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const newUser = new Com({ name: username, email: email, password: password });
        await newUser.save();

        res.render('gemeplay');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});

app.get('/', async (req, res) => {
    res.render('landingpage');
});

app.get('/index', async (req, res) => {
    res.render('index');
});

app.get('/profile', checkAuth, async (req, res) => {
    try {
        res.render('profile', { user: req.session.user });
    } catch (error) {
        console.error('Error retrieving profile:', error);
        res.status(500).send('Error retrieving profile');
    }
});

const validGames = [
    'flappybird',
    'tictactoc',
    'luck_and_skill',
    'RockPaperScissors',
    'wordproblem',
    'pong',
    'tellme'
];

app.get('/:game', checkAuth, async (req, res) => {
    const game = req.params.game;
    if (validGames.includes(game)) {
        res.render(game);
    } else {
        res.status(404).send('Game not found');
    }
});

app.post('/logins', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await Com.findOne({ name: username, password: password });
        if (!user) {
            return res.status(404).send('User not found');
        }

        req.session.user = user;
        res.render('gemeplay');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login');
    });
});

app.get('/users', async (req, res) => {
    try {
        const users = await Com.find({});
        let response = '';
        users.forEach(user => {
            response += `Name: ${user.name},Email: ${user.email}, Password: ${user.password} | `;
        });
        console.log('Users retrieved successfully:', users);
        res.send(response);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Error retrieving users');
    }
});

app.post('/forgot', async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const user = await Com.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.password = newPassword;
        await user.save();

        res.send('Password updated successfully');
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).send('Error updating password');
    }
});

app.listen(port, () => {
}); 
});
 