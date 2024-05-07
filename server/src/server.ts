import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './dbconfig/dbConfig'
import URLshortener from './routes/URLshortener.route'
dotenv.config()
connectDb()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

app.use('/api',URLshortener)

const port = process.env.port || 5001


app.get('/',(req,res)=>
{
   res.send('Hello World')
})

app.listen(port,()=>
{
    console.log(`Server is running on port : ${port}`)
})