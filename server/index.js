const bodyParser = require('body-parser');
const mysql = require('mysql2/promise')
const express = require('express');
const cors = require('cors');
const app = express();

const port = 8000;
app.use(bodyParser.json());
app.use(cors());

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

app.post('/users',async (req,res)=>{

    try{
        let user = req.body;
        const results = await conn.query('INSERT INTO users SET ?',user)
            express.json({
                message: 'Create user successfully',
                data:results[0]
            })
    }catch(err) {
        res.status(500).json({
            message:'someting went wrong',
            errorMessage: error.Message
            
        })
    }
})

/*
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
*/


app.get('/users/:id',async(req,res) => {
    try{
        let id = req.params.id;
    const results = await conn.query('SELECT * FROM users WHERE id = ?',id)
    if (results[0].length == 0){
        throw { stausCode: 404,message:'user not found'}
    } 
    res.json(results[0][0])
    }catch(error){
        console.error('error: ',error.message)
        let statusCode = error.statusCode || 500
        res.status(500).json({
            message:'someting went wrong',
            errorMessage: error.Message
    })}
})

app.put('/user/:id',async(req,res)=>{

    try{
        let id = req.params.id;
        let updateUser = req.body;
        const results = await conn.query('UPDATE users SET ? WHERE id = ?',[updateUser,id])
            res.json({
                message: 'UPDATE users successfully',
                data:results[0]
            })
    }catch(error) {
        res.status(500).json({
            message:'someting went wrong',
            errorMessage: error.Message
            
        })
    }

})

app.delete('/users/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const results = await conn.query('DELETE from users WHERE id = ?',parseInt(id))
            res.json({
                message: 'Delete users successfully',
                data:results[0]
            })
    }catch(error) {
        console.error('errer',error.message)
        res.status(500).json({
            message:'someting went wrong',
            errorMessage: error.Message
            
        })
    }

}) 

app.listen(port,async(req,res) =>{
    await initMySQL()
    console.log('Http Server is running on port :'+ port);
});
