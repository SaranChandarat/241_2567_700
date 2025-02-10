const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const port = 8000;

app.use(bodyParser.json());

let users = []
let counter = 1

app.get('/users',(req,res) =>{
    res.json(users);
})

app.post('/user',(req,res) =>{
    let user = req.body;
    user.id = counter
    counter += 1
    users.push(user)
    res.json({
        message:'Create new user successfully',
        user:user
    })
})

app.put('/user/:id',(req,res)=>{
    let id = req.params.id;
    let updateUser = req.body;
    let selectIndex = users.findIndex(user => user.id == id)

    if (updateUser.firstname){
    users[selectIndex].firstname = updateUser.firstname
    }
    if (updateUser.lastname){
    users[selectIndex].lastname = updateUser.lastname
    }
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

app.listen(port,(req,res) =>{
    console.log('Http Server is running on port :'+ port);
});
