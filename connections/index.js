const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
mongoose.set('strictQuery', false);

const DB = process.env.DATABASE.replace(
	'<password>',
	process.env.DATABASE_PASSWORD
)

// mongoDB 雲端
mongoose.connect(DB)
	.then(()=>{
		console.log('資料庫連線成功')
	})
	.catch((error)=>{
		console.log(error);
	});