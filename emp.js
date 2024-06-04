
import mongoose from "mongoose";
import express from "express";
import pkg from 'body-parser';  
const {bodyParser} = pkg;
import { title } from "process";
import { Com } from "./models/company.js"; 
import { Feed } from "./models/company.js"; 
let conn = await mongoose.connect("mongodb://localhost:27017/Com") 
import { authMiddleware } from './models/authMiddleware.js';


const app = express()  
const port = 3000
app.set('view engine', 'ejs') ;
app.use(express.static('public'));
// Middleware to parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());   

app.get('/wordproblem',async (req,res)=>{
    res.render('wordproblem') 
})
// Index route
app.get('/login', async (req, res) => {
    // await Com.deleteMany({}) 
    res.render('index', { foo: 'Foo' }); 
});  
app.get('/gemeplay',async(req,res)=>{
    res.render('gemeplay')
}) 
app.get('/learning',async(req,res)=>{

    res.render('learning')
}) 

// Registration route
app.get('/register', async(req,res)=>{
    res.render('register') 
})
  
// forgot password route
app.get('/forgot',async(req,res)=>{

    res.render('forgot')
})
app.post('/feedsubmit',async(req,res)=>{
    try { 
        const { username,email, feedbackTextArea } = req.body;

        // Check if the user already exists
        const existingUser = await Com.findOne({ name: username });
        if (existingUser) {
            // Create a new Feedback
            const newUser = new Feed({ name: username,email:email, text: feedbackTextArea });
        await newUser.save();
        res.send('Your feedback has been submitted successfully')
        }
        else{
            res.send('Enter a valid Registered username')
        }
 
        
        
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
    
})  
// Registration requests handling
app.post('/register', async (req, res) => { 
    try { 
        const { username,email, password } = req.body;

        // Check if the user already exists
        const existingUser = await Com.findOne({ name: username });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }
 
        // Create a new user
        const newUser = new Com({ name: username,email:email, password: password });
        await newUser.save();
        
        res.render('gemeplay');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});  

app.get('/',async (req,res)=>{ 
    res.render('landingpage')  
})
app.get('/index',async(req,res)=>{
    res.render('index') 
})
app.get('/profile', async (req, res) => {
    try {
        // Retrieve user data from the database using the authenticated user's ID
      res.render('profile')
    }catch{}
      
});

// List of valid game names
const validGames = [
    'flappybird',
    'tictactoc',
    'luck_and_skill',
    'RockPaperScissors',
    'wordproblem',
    'pong',
    'tellme'
];

// Middleware to check if the requested game is valid
app.get('/:game', async (req, res) => {
    const game = req.params.game;
    if (validGames.includes(game)) {
        res.render(game);
    } else {
        res.status(404).send('Game not found');
    }
});
/*
    Games URL
    */
    // app.get('/flappybird',async (req,res)=>{
    //     res.render('flappybird') 
    // })
    // app.get('/tictactoc',async (req,res)=>{
    //     res.render('tictactoc')   
    // })
    // app.get('/luck_and_skill',async (req,res)=>{
    //     res.render('luck_and_skill') 
    // })
    // app.get('/Rock_Paper_Scissors',async (req,res)=>{
    //     res.render('RockPaperScissors') 
    // })
    // app.get('/wordproblem',async (req,res)=>{
    //     res.render('wordproblem') 
    // })  
    // app.get('/pong',async (req,res)=>{
    //     res.render('pong') 
    // })
    // app.get('/tellme',async(req,res)=>{ 
    //     res.render('tellme')  
    // }) 
// Login request handling
app.post('/logins', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username and password
        const user = await Com.findOne({ name: username, password: password });
        if (!user) {
            return res.status(404).send('User not found');
        }    

        res.render('gemeplay'); 
    } catch (error) {
        console.error('Error logging in:', error);  
        res.status(500).send('Error logging in'); 
    } 
});  



// Get all users route
app.get('/users', async (req, res) => { 
    try {
        // Find all users in the database
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
  
      // Find user by email
      const user = await Com.findOne({ email });
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Update user's password
      user.password = newPassword;
      await user.save();
  
      res.send('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).send('Error updating password');
    }
  }); 

 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}); 

 





















// // import mongoose from "mongoose";
// // import express from "express";
// // import pkg from 'body-parser';
// // const {bodyParser} = pkg;
// // import { title } from "process";
// // import { Com } from "./models/company.js";
// // let conn = await mongoose.connect("mongodb://localhost:27017/Com")

// // const app = express()
// // const port = 3000
// // app.set('view engine', 'ejs') ;

// // // const getrandom = (arr)=>{
// // //     let r = Math.floor(Math.random() * 4);
// // //     return arr[r];
// // // }
// // app.use(express.urlencoded({ extended: false }));

// // // Parse application/json
// // app.use(express.json());  

// // app.post('/login',async (req, res) => {

// //     // await Com.deleteMany({})

// //         const username = req.body.username;
// //         const password = req.body.password;
// //         const todo = new Com({ name: username , password: password})
// //         todo.save()
// //         res.send('Form Submitted');
  
// // })


// // app.get('/users', async (req, res) => {
// //     try {
// //         // Find all users in the database
// //         const users = await Com.find({});
// //         let response = ' ';
// //         users.forEach(user => {
// //             response += ` Name: ${user.name}, Password: ${user.password} | `;
// //         });
// //         console.log('Users retrieved successfully:', users);
// //         res.send(response);
// //     } catch (err) {
// //         console.error('Error retrieving users:', err);
// //         res.status(500).send('Error retrieving users');
// //     }
// // });


// // app.get('/', async (req, res) => {

// //     res.render('index', { foo: 'Foo' })
// // })



// // app.listen(port, () => {
// //     console.log(`Example app listening on port ${port}`)
// // })