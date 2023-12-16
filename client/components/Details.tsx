import { useQuery } from '@tanstack/react-query'
import { getLocationsDetailsApi } from '../apis/details'

export default function Details(winner) {
  const {
    data: realWinner,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['apiWinner', winner.winner],
    queryFn: async () => await getLocationsDetailsApi(winner.winner),
  })

  if (isLoading) {
    return <p></p>
  }

  if (error) {
    console.log(error)
  }

  const isOpen = () => {
    if (realWinner.delivery == true) {
      return 'Delivery Available ✓'
    } else {
      return ''
    }
  }
  const isDog = () => {
    if (realWinner.allowsDogs == true) {
      return '𓃦 ✓'
    } else {
      return ''
    }
  }

  const hasDays = () => {
    if (realWinner.regularOpeningHours != null) {
      return (
        <div className="openingHours">
          Opening hours: <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[0]} <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[1]} <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[2]} <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[3]} <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[4]} <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[5]} <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[6]}
          <br />{' '}
        </div>
      )
    } else {
      return ' '
    }
  }
  const starArr = []

  for (let x = 0; x < Math.floor(realWinner.rating); x++) {
    starArr.push('☆')
  }
  const decimalPart = realWinner.rating % 1

  const priceLevel = () => {
    if (realWinner.price_level != null) {
      return <p>Price Level: {realWinner.priceLevel}</p>
    } else {
      return ''
    }
  }

  const phoneNumber = () => {
    if (realWinner.nationalPhoneNumber != null) {
      return <p> Ph: {realWinner.nationalPhoneNumber} </p>
    } else {
      return ''
    }
  }

  const link = () => {
    if (realWinner.websiteUri != null) {
      return (
        <a className="winnerLinkActive" href={realWinner.websiteUri}>
          {realWinner.displayName.text}
        </a>
      )
    } else {
      return <p className="winnerLinkInactive">{realWinner.displayName.text}</p>
    }
  }

  if (realWinner != null) {
    return (
      <>
        <div className="winnerFighter">
          <h2>{link()}</h2>
          <br />
          {/* Rating: */}
          <div className="ratingContainer">
            {starArr}
            {decimalPart >= 0.5 ? <span className="star">⭒</span> : undefined}
          </div>
          <br />
          {realWinner.formattedAddress}
          <br />
          {phoneNumber()}
          {isOpen()}
          <br />
          <br />
          {priceLevel()}
          {hasDays()}
          <br />
          {isDog()}
        </div>
      </>
    )
  }
}
