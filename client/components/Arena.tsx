import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ArenaFighter } from './ArenaFighter'
import Header from './Header'
import Details from './Details'
import ConfettiExplosion from 'react-confetti-explosion'

interface Coordinates {
  x: number
  y: number
  yOffset: number
  isDead: boolean
  xVel: number
  yVel: number
}

interface Results {
  place_id: string
  name: string
  icon_background_color: string
}

const moveSpeed = 1
const indexMoveSpeedEffect = 1.5

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomFloat(min: number, max: number) {
  return Math.random() * (max - min + 1) + min
}

class RandomNumberGenerator {
  private seed: number

  constructor(seed: number) {
    this.seed = seed
  }

  // Generate a random number between min (inclusive) and max (inclusive)
  public generateRandomNumber(min: number, max: number): number {
    const a = 7052342 // Multiplier
    const c = 2660 // Increment

    const m = Math.pow(2, 32) // Modulus

    // Linear Congruential Generator formula
    this.seed = (a * this.seed + c) % m

    // Scale the generated number to fit within the specified range
    const scaledRandom = min + (this.seed % (max - min + 1))
    return Math.floor(scaledRandom)
  }
}

export default function Arena() {
  const location = useLocation()
  const [coordinates, setCoordinates] = useState<Coordinates[]>([])
  const [deadCount, setDeadCount] = useState(0)
  const [isExploding, setIsExploding] = useState(false)

  useEffect(() => {
    const coordArray: Coordinates[] = []

    location.state.results.forEach((element: Coordinates, index: number) => {
      coordArray.push({
        x: Math.cos(index * maxValue) * 400 + 400,
        y: Math.sin(index * maxValue) * 400 + 400,
        yOffset: 0,
        isDead: false,
        xVel: 0,
        yVel: 0,
      })
    })

    setCoordinates(coordArray)

    const token = setInterval(() => {
      setCoordinates((prev) =>
        prev.map((element, index) => {
          if (element.isDead || isExploding) {
            return {
              ...element,
            }
          } else {
            // Calculate the differences in x and y

            element.xVel *= 0.95
            element.yVel *= 0.95

            const xDiff = element.x - 400
            const yDiff = element.y - 400

            // Calculate the distance using Pythagorean theorem
            const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff)

            const jumpHeight = Math.abs(Math.sin(distance * 0.1 + index)) * -10

            if (distance <= 30) {
              element.xVel =
                Math.random() <= 0.5
                  ? getRandomFloat(5, 15)
                  : -getRandomFloat(5, 15)
              element.yVel =
                Math.random() <= 0.5
                  ? getRandomFloat(5, 15)
                  : -getRandomFloat(5, 15)
            }

            const rng = new RandomNumberGenerator(index + location.state.winner)
            const randomVal = rng.generateRandomNumber(
              0,
              location.state.results.length,
            )

            const speedEffect =
              moveSpeed +
              (randomVal / location.state.results.length) * indexMoveSpeedEffect

            // Normalize x and y differentials
            const normalizedXDif = (xDiff / distance) * speedEffect

            const normalizedYDif = (yDiff / distance) * speedEffect

            // Update x and y coordinates
            const x = element.x + element.xVel - normalizedXDif
            const y = element.y + element.yVel - normalizedYDif

            const shouldDie =
              Math.random() <= 0.002 && index != location.state.winner

            if (shouldDie) {
              setDeadCount((prev) => prev + 1)
            }

            return {
              x,
              y,
              yOffset: jumpHeight,
              isDead: shouldDie ? true : false,
              xVel: element.xVel,
              yVel: element.yVel,
            }
          }
        }),
      )
    }, 1000 / 60)

    return () => {
      clearInterval(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [trueState, setTrueState] = useState(false)

  if (deadCount == location.state.results.length - 1 && !isExploding) {
    setIsExploding(true)
    setTimeout(() => {
      setTrueState(true)
    }, 2000)
  }

  const conditionalWinner = () => {
    if (trueState === false) {
      return (
        <div className="arenaContainer">
          <img
            src="./imgs/swords.png"
            className="fightImage"
            alt="a sword and spoon crossed"
          />
          {coordinates[0]
            ? results.map((data: Results, index: number) => {
                return (
                  <ArenaFighter
                    isDead={coordinates[index].isDead}
                    data={data}
                    x={coordinates[index].x}
                    y={coordinates[index].y + coordinates[index].yOffset}
                    key={index}
                  />
                )
              })
            : ''}
        </div>
      )
    } else {
      const arrayValue = location.state.winner
      return (
        <>
          <div className="winnerContainer">
            <Details winner={location.state.results[arrayValue]?.place_id} />
          </div>
        </>
      )
    }
  }

  const results = location.state.results
  // Now you can use 'results' in your Arena component

  const maxValue: number = (2 * Math.PI) / results.length

  return (
    <>
      <Header />
      {isExploding && (
        <ConfettiExplosion particleCount={100} force={1} width={2000} />
      )}
      {conditionalWinner()}
    </>
  )
}
