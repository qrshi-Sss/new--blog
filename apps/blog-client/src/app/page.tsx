'use client'
import React, { useEffect, useState } from 'react'
import '@/styles/animate.css'

type Meteor = {
  style: React.CSSProperties
  key: string
}

function createMeteor(index: number): Meteor {
  const size = Math.random() * 2 + 1
  const duration = Math.random() * 3 + 1
  const delay = Math.random() * 5
  const left = Math.random() * 110
  const top = Math.random() * 30

  return {
    key: `meteor-${index}-${Date.now()}`,
    style: {
      width: `${size}px`,
      height: `${size * 20}px`,
      left: `${left}%`,
      top: `${top}%`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    },
  }
}

export default function Home() {
  const [meteors, setMeteors] = useState<Meteor[]>([])

  useEffect(() => {
    setMeteors(Array.from({ length: 3 }, (_, i) => createMeteor(i)))
  }, [])

  return (
    <div className="relative top-0 left-0 h-full w-full overflow-hidden">
      <div
        className="absolute bottom-0 z-20 h-[330px] w-[calc(3840px+100%)] bg-repeat-x"
        style={{
          backgroundImage: "url('/images/bg1.png')",
          animation: 'bg-move 30s linear infinite',
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 z-98 h-[492px] w-[calc(3840px+100%)] bg-repeat-x"
        style={{
          backgroundImage: "url('/images/bg2.png')",
          animation: 'bg-move 40s linear infinite',
        }}
        aria-hidden
      />

      <div
        className="absolute bottom-20 z-999 h-[100px] w-[200px]"
        style={{
          backgroundImage: "url('/images/bear.png')",
          animation: 'bear-run 1s steps(8) infinite, bear-box-run 3s linear forwards',
        }}
        aria-hidden
      />

      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {meteors.map((m) => (
          <div
            key={m.key}
            className="absolute"
            style={{
              ...m.style,
              background: 'linear-gradient(to bottom left, transparent, white)',
              animation: `meteor-fall ${m.style.animationDuration} linear ${m.style.animationDelay} infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
