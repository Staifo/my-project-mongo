const express = require('express');
const singleUserRouter = express.Router();
const Data = require ('../mockdata');
const singleUserController = require ('../controllers/singleUserController');
const singleUser = require('../models/singleUser');



/* GET users listing. */
/////// Mockdata

// singleUserRouter.get('/', (req, res) =>{
//   res.send(Data)
// })

// singleUserRouter.get('/:id', (req, res)=>{
//   const {id} = req.params;
//   const result = Data.find(user=>parseInt(id, 10)===parseInt(user.id, 10))
//   res.send(result) 
// })

///// Mockdata


// Mongo

singleUserRouter.get('/', singleUserController.list_user)

singleUserRouter.get('/:id', singleUserController.find_user)

singleUserRouter.post('/', singleUserController.create_user)

singleUserRouter.put('/:id' , singleUserController.update_user)

singleUserRouter.delete('/:id', singleUserController.delete_user)




module.exports = singleUserRouter;
