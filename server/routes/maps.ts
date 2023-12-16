import { Router } from 'express'
import request from 'superagent'

const router = Router()

// const key = 'AIzaSyCLCHcoB2bknGHj_NVD0Q4bKERJ2t1GwvY'

router.post('/', async (req, res) => {
  try {
    const coordinate = req.body.location
    const radius = req.body.radius

    const response = await request.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location=${coordinate}&radius=${radius}&type=restaurant&excludedtypes=hotel&key=AIzaSyCLCHcoB2bknGHj_NVD0Q4bKERJ2t1GwvY`,
    )
    res.json(response.body)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
