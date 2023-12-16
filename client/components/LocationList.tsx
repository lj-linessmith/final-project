import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNearByLocations } from '../apis/maps'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface Props {
  radius: number
  nearbyLocation: string
}

export default function LocationList({ radius, nearbyLocation }: Props) {
  const [hasBeenFetched, setFetched] = useState(false)
  useEffect(() => {
    setFetched(false)
  }, [])

  const navigate = useNavigate()

  const {
    data: locations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['location', nearbyLocation, radius],

    queryFn: async () => {
      const coords = window.encodeURIComponent(nearbyLocation)
      const result = await getNearByLocations({ radius: radius, key: coords })
      setFetched(true)
      return result
    },

    enabled: nearbyLocation !== '' && hasBeenFetched === false,
    // staleTime: Infinity,
    initialData: [],
  })
  const nearbyLocations = locations
  interface Location {
    name: string
  }

  const queryClient = useQueryClient()
  const deleteLocationMutation = useMutation({
    mutationFn: getNearByLocations,
    onSuccess: async () => {
      queryClient.invalidateQueries(['location'])
    },
  })
  // const [locations, setLocations] = useState([])

  if (error) {
    return <p>This is an Error</p>
  }
  if (!location || isLoading) {
    return <p>Loading Locations.....</p>
  }

  function handleDelete(index) {
    deleteLocationMutation.mutate(locations.splice(index, 1))
  }

  const randomValue = Math.floor(Math.random() * nearbyLocations.length)

  function handleClick(e) {
    e.preventDefault()
    navigate('/arena', {
      state: { results: locations, winner: randomValue },
    })
  }

  return (
    <>
      <div>
        <div className="wrapper">
          {locations.length >= 1 ? (
            <div className="nearbyLocationsContainer">
              {locations.map((data, index) => (
                <div key={data.place_id} className="locationContainer">
                  <button className="bin" onClick={() => handleDelete(index)}>
                    ×
                  </button>{' '}
                  {data.name}
                </div>
              ))}
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="fightButtonContainer">
          {locations.length >= 1 ? (
            <button className="fightButton" onClick={handleClick}>
              <span>Fight </span>
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}
