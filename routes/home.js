var express = require('express');
var homeRouter = express.Router();
 /* GET home page. */
homeRouter.get('/', (req, res) => {
res.send('home')
})


module.exports = homeRouter;
