import { Router } from 'express'
import request from 'superagent'

const router = Router()

// const key = 'AIzaSyCLCHcoB2bknGHj_NVD0Q4bKERJ2t1GwvY'

router.get('/:apiQuery', async (req, res) => {
  try {
    const address = req.params.apiQuery
    const response = await request.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&inputtype=textquery&key=AIzaSyC1cT-42Of0KFtbaYlwA3lPjtki0E9xFzM`,
    )
    res.json(response.body)
  } catch (e) {
    res.status(500).json({ message: 'apiQuery is sad {":-("}' })
  }
})

export default router
