import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import countryRoutes from './routes/country.js'
import userRoutes from './routes/user.js'


const app = express()

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())
dotenv.config()

app.use('/api/country', countryRoutes)
app.use('/api/user', userRoutes)

app.all('*', (req, res) => {
    res.send('Invalid Route')
})

app.listen(process.env.PORT, () => console.log('server is running'))