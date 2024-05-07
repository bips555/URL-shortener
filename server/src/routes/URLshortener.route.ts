import express from 'express'

const router = express.Router()

router.get('/URLshortener',createURL)
router.get('/URLshortener',getAllURL)

router.get('/URLshortener/:id',getURL)

router.get('/URLshortener',deleteURL)

export default router