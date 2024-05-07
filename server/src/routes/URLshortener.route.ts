import express from 'express'
import { createURL, deleteURL, getAllURL, getURL } from '../controllers/URLshortener.controller'

const router = express.Router()

router.post('/URLshortener',createURL)
router.get('/URLshortener',getAllURL)

router.get('/URLshortener/:id',getURL)

router.delete('/URLshortener/:id',deleteURL)

export default router