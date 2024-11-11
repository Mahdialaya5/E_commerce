const express = require('express')
const app = express()
require("dotenv").config()
const port = process.env.port
const userRouter=require('./routes/userRoute')
const productRouter=require('./routes/ProductRoute')
const orderRouter=require('./routes/OrderRoute')
const cors = require("cors");
const cookieParser = require('cookie-parser')
const path = require('path');
//const swaggerjsdoc=require("swagger-jsdoc")
//const swaggerUi = require("swagger-ui-express");
//const swaggerDocument = require("./swagger.json");

const corsOptions = {
   origin: 'http://localhost:4200', 
   methods: ['GET', 'POST', 'PUT', 'DELETE'], 
   allowedHeaders: ['Content-Type', 'Authorization'], 
   credentials: true, 
 };


//const swagger=swaggerjsdoc(swaggerDocument)
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser())

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
//routes
app.use('/api/order',orderRouter)
app.use('/api/product',productRouter)
app.use('/api/user',userRouter)
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));

app.use((req,res)=>{
  res.status(404).send('Not found')
})


app.listen(port, (err) => err ? console.log(err) : console.log(`app listening on port ${port}`))