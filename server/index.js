const bodyParser = require('body-parser');
const mysql = require('mysql2/promise')
const express = require('express');
const app = express();

const port = 8000;
app.use(bodyParser.json());

let users = []

let conn = null

const initMySQL = async () =>{
     conn = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'webdb',
        port: 8820
    })
}
/** 
app.get('/testdbnew',async(req,res) => {

    try{
        const results = await conn.query('SELECT * FROM users')
        req.json(results[0])
    }catch (error){
        console.log('error',error.message)
            req.status(500).json({error: "Error fetching users"})
    }
})
**/
app.get('/users',async(req,res) =>{
    const results = await conn.query('SELECT * FROM users')
    res.json(results[0]);
})

app.get('/users/:id',(req,res) => {
    const filterUsers = users.map(user => {
        return{
            id: user.id,
            firstname:user.firstname,
            lastname:user.lastname,
            fullname:user.firstname +' ' + user.lastname
        }
    })
    res.json(filterUsers);
});

app.post('/users',async(req,res) =>{
    let user = req.body;
    const results = await conn.query('INSERT INTO users SET ?',user)
    console.log('results',results)
    res.json({
        message: 'Create user successfully',
        data:results[0]
    })
})

app.get('/users/:id',(req,res) => {
    let id = req.params.id;
    let selectedIndex = users.findIndex(user.id == id)

    res.json(users[selectedIndex])
})

app.put('/user/:id',(req,res)=>{
    let id = req.params.id;
    let updateUser = req.body;
    let selectIndex = users.findIndex(user => user.id == id)

    users[selectIndex].firstname = updateUser.firstname || users[selectIndex].firstname
    users[selectIndex].lastname = updateUser.lastname || users[selectIndex].lastname
    users[selectIndex].age = updateUser.age || users[selectIndex].age
    users[selectIndex].gender = updateUser.gender || users[selectIndex].gender

    res.json({
        message:'Update user successfully',
        data: {
            user:updateUser,
            indexUpdated: selectIndex
        }
    })
})

app.delete('/user/:id',(req,res)=>{
    let id = req.params.id;
    let selectIndex = users.findIndex(user => user.id == id)

    delete users[selectIndex,1]
    res.json({
        message:'Delete user successfully',
        indexDeleted:selectIndex
    })
})

app.listen(port,async(req,res) =>{
    await initMySQL()
    console.log('Http Server is running on port :'+ port);
});
