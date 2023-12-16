import { useEffect, useState } from 'react'
import { getRandomInt } from './Arena'

interface ArenaFighter {
  x: number
  y: number
  data: Results
  isDead: boolean
}

interface Results {
  place_id: string
  name: string
}

export function ArenaFighter(props: ArenaFighter) {
  const [randomColor, getRandomColor] = useState('red')

  const [image, setImage] = useState('')
  const [randomHue, setRandomHue] = useState(0)

  useEffect(() => {
    const random = '#' + Math.floor(Math.random() * 0xffffff).toString(16)
    getRandomColor(random)
    setImage(`url("imgs/blood${getRandomInt(1, 5)}.png")`)
    setRandomHue(getRandomInt(20, 355))
  }, [])

  return props.isDead ? (
    <div
      style={{
        top: `${props.y}px`,
        left: `${props.x}px`,
        backgroundImage: `${image}`,
        backgroundSize: '100px',
        filter: `hue-rotate(${randomHue}deg)`,
        borderWidth: 0,
        zIndex: 0,
      }}
      key={props.data.place_id}
      className="arenaFighter"
    ></div>
  ) : (
    <div
      style={{
        top: `${props.y}px`,
        left: `${props.x}px`,
        backgroundColor: `${randomColor}`,
        zIndex: 1,
      }}
      key={props.data.place_id}
      className="arenaFighter"
    >
      {props.x >= 400 ? (
        <div className="weapon-left">
          <img
            className="weapon-img-left"
            src="public/imgs/weapon.svg"
            alt=""
          />
        </div>
      ) : (
        <div className="weapon-right">
          <img
            className="weapon-img-right"
            src="public/imgs/weapon.svg"
            alt=""
          />
        </div>
      )}

      <b style={{ color: randomColor }} className="inverted">
        {props.data.name}
      </b>
    </div>
  )
}
