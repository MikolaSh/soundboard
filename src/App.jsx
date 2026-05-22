import { useRef, useState } from 'react'
import melodySound from '../assets/sounds/nujdiki_melody.mp3'
import wistleSound from '../assets/sounds/wistle.mp3'
import op1 from '../assets/sounds/op1.mp3'
import op2 from '../assets/sounds/op2.mp3'
import op3 from '../assets/sounds/op3.mp3'
import op4 from '../assets/sounds/op4.mp3'
import op5 from '../assets/sounds/op5.mp3'
import op6 from '../assets/sounds/op6.mp3'
import op7 from '../assets/sounds/op7.mp3'
import op8 from '../assets/sounds/op8.mp3'
import op9 from '../assets/sounds/op9.mp3'
import op10 from '../assets/sounds/op10.mp3'
import op11 from '../assets/sounds/op11.mp3'
import op12 from '../assets/sounds/op12.mp3'
import op13 from '../assets/sounds/op13.mp3'
import op14 from '../assets/sounds/op14.mp3'
import goidaSound from '../assets/sounds/goide.mp3'
import rigotaSound from '../assets/sounds/rigota.mp3'
import './App.css'

const RANDOM_SOUNDS = [
  op1, op2, op3, op4, op5, op6, op7, op8, op9,
  op10, op11, op12, op13, op14,
  goidaSound, rigotaSound,
]

function Pad({ label, color, sound }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const handleClick = () => {
    const audio = audioRef.current
    if (!audio) return
    if (!audio.paused) {
      audio.pause()
      audio.currentTime = 0
      setPlaying(false)
    } else {
      audio.currentTime = 0
      audio.play()
      setPlaying(true)
    }
  }

  return (
    <button
      className={`pad${playing ? ' pad--playing' : ''}`}
      style={{ '--pad-color': color }}
      onClick={handleClick}
    >
      <audio ref={audioRef} src={sound} preload="auto" onEnded={() => setPlaying(false)} />
      {label}
    </button>
  )
}

function RandomPad() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [src, setSrc] = useState(RANDOM_SOUNDS[0])

  const handleClick = () => {
    const audio = audioRef.current
    if (!audio) return
    if (!audio.paused) {
      audio.pause()
      audio.currentTime = 0
      setPlaying(false)
    } else {
      const next = RANDOM_SOUNDS[Math.floor(Math.random() * RANDOM_SOUNDS.length)]
      setSrc(next)
      setTimeout(() => {
        audio.currentTime = 0
        audio.play()
        setPlaying(true)
      }, 0)
    }
  }

  return (
    <button
      className={`pad${playing ? ' pad--playing' : ''}`}
      style={{ '--pad-color': '#E67E22' }}
      onClick={handleClick}
    >
      <audio ref={audioRef} src={src} preload="auto" onEnded={() => setPlaying(false)} />
      Random
    </button>
  )
}

export default function App() {
  return (
    <div className="app">
      <h1 className="title">🎛️ Soundboard</h1>
      <div className="grid">
        <Pad label="Melody" color="#9B59B6" sound={melodySound} />
        <Pad label="Wistle" color="#3498DB" sound={wistleSound} />
        <RandomPad />
      </div>
    </div>
  )
}
