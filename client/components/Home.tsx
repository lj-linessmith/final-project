import { useState } from 'react'
import { getCurrentLocationApi } from '../apis/current'
import { useQuery } from '@tanstack/react-query'
import LocationList from './LocationList'
import { setMaxListeners } from 'superagent'
const initialFormData = {
  address: '',
  radius: '',
}

export default function Home() {
  const { error, isLoading } = useQuery({
    queryKey: [],
    queryFn: getCurrentLocationApi,
  })

  const [formData, setFormData] = useState(initialFormData)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [place, setPlace] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  if (error) {
    console.log(error)
  }

  if (isLoading) {
    return <p>Loading...</p>
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    const searchInput = formData.address.split(' ')
    const apiQuery = searchInput.join('%20')
    const currentLocation = await getCurrentLocationApi(apiQuery)
    try {
      const lat = currentLocation.results[0].geometry.location.lat
      const long = currentLocation.results[0].geometry.location.lng
      const coordinates = `${lat},${long}`
      setPlace(coordinates)
    } catch (error) {
      setLatitude(null)
      setLongitude(null)
    }
  }

  return (
    <>
      <div className="description">
        <p>
          Please enter your location and a search radius (in metres). Up to 20
          popular eating destinations near you will load and pressing the{' '}
          <span>Fight</span> button will cause them to duke it out to decide
          your destination. You can also delete options displayed below.
        </p>
      </div>
      <div id="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Your Address Here"
            />
            <input
              type="text"
              name="radius"
              value={formData.radius}
              onChange={handleInputChange}
              placeholder="Search Radius (metres)"
            />
          </div>
          <button className="sumbitButton" type="submit">
            <span>SEARCH NEARBY</span>
          </button>
        </form>

        <LocationList nearbyLocation={place} radius={formData.radius} />
      </div>
    </>
  )
}
