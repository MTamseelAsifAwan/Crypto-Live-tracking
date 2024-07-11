import express from 'express';
import db_connection from './Databaseconect/db_config.js';
import uservalidator from '../Backend/Contollers/usercontroller.js';
import cors from 'cors'
import {fetch_user} from './Middleware/authmiddleware.js';
import { users } from './Models/user.js';

const app = express();
app.use(cors());
app.use(express.json());

db_connection(app);
app.get('/heloo', (req, res) => {
    res.send('Hello, Workfdmg;regkld!');
});
app.post('/register', uservalidator.user_register);

app.post('/login', uservalidator.user_login);

//test route to sace data in cookies

app.get('/savetoken', async (req, res) => {
    // res.setHeader('cookies','username=true');
    res.send('cookikkes');

    // const token = req.body.token;
    // console.log('Token to be saved:', token);
    // // Save the token to a secure database or cookie
    // // For demonstration purposes, we'll just log it
    // console.log("Token saved successfully:", token);
    // res.json({ message: 'Token saved successfully' });
});

app.post('/userfetch', fetch_user, async (req, res) => {
    try {
        const username = req.users;
        console.log("Fetching user with username:", username); // Log the username
        const user = await users.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // User data fetch from database
        return res.json({ message: 'User fetched successfully', user });
    } catch (err) {
        console.log("Fetch token API error", err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(process.env.PORT || 3000, () => console.log('Server is running...http://localhost:3000'));


