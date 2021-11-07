import express from 'express'
import { returnCountryInfo   } from '../controllers/country.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.get('/:name', auth, returnCountryInfo)

export default router