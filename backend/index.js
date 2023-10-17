require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const userRouter = require("./routes/UserRoute");
const blogRouter = require('./routes/BlogRoute');
const commentRouter = require('./routes/CommentRoute');

const connection = require("./db");
const app = express();
const PORT = process.env.PORT || 8090;
connection();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});
app.use(bodyParser.json());
app.use('/api', userRouter); 
app.use('/api/blog', blogRouter);
app.use('/api/comment', commentRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));