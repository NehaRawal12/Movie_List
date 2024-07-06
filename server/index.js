const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');


app.use(bodyParser.json());
app.use(cors());

const readUsers = () => {
    if (!fs.existsSync(USERS_FILE)) {
        return [];
    }
    const usersData = fs.readFileSync(USERS_FILE);
    return JSON.parse(usersData);
};


const writeUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users));
};

// Signup endpoint
app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    

    const users = readUsers();
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        return res.status(400).json({  status: true, message: 'Email already exists.', data:newUser });
    }

    const newUser = { email, password };
    users.push(newUser);
    writeUsers(users);

    res.status(201).json({  status: true, message: 'User created successfully.', data:newUser});
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // console.log( req.body);
    if (!email || !password) {
        // console.log('Email and password are required.');
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const users = readUsers();
    let userdata = []

    const user = users.find(user => {
        if (user.email == email) {
            userdata.push(user);
        }
    });
    // console.log("userdata", userdata);
    // console.log("email", userdata[0]?.email != email);
    // console.log("password",userdata[0]?.password != password);

    if (userdata) {
        if (userdata[0]?.email != email) {
            // console.log('Invalid email.');
            return res.status(401).json({ status: false, message: 'Invalid email', data: [] });
        }
        if (userdata[0]?.password != password) {
            // console.log('Invalid password.');
            return res.status(401).json({ status: false, message: 'Invalid password', data: [] });
        }
        // else{
        // console.log('Login successful.');
        return res.status(200).json({ status: true, message: 'Login successful.', data: userdata });
        // }
    } else {
        // console.log('Invalid Email or Password.');
        return res.status(200).json({ status: false, message: 'Invalid Email or Password.', data: [] });
    }



});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
