import { Router } from 'express'
import request from 'superagent'

const router = Router()

// const key = 'AIzaSyAkvAo_kfC8euKVSSYrkm0vgze_UvNZmgw'

router.get('/:apiWinner', async (req, res) => {
  try {
    const winner = req.params.apiWinner
    const response = await request.get(
      `https://places.googleapis.com/v1/places/${winner}?fields=id,displayName,regularOpeningHours,websiteUri,allowsDogs,rating,price_level,nationalPhoneNumber,delivery,formattedAddress,businessStatus&key=AIzaSyAkvAo_kfC8euKVSSYrkm0vgze_UvNZmgw`,
    )
    res.json(response.body)
  } catch (e) {
    res.status(500).json({ message: 'winner is sad ://' })
  }
})

export default router
