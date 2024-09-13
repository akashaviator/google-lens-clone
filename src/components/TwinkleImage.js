import Image from "next/image"
import React, { useEffect, useState } from "react"

const TwinkleImage = ({
  src,
  width,
  height,
  alt,
  imageClass,
  twinkle = true,
}) => {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const generateStars = () => {
      const newStars = []
      for (let i = 0; i < 20; i++) {
        newStars.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: Math.random() * 10,
          duration: Math.random() * 2 + 1,
        })
      }
      setStars(newStars)
    }

    generateStars()
  }, [])

  return (
    <div className="relative overflow-hidden">
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        imageClass={imageClass}
      />
      {twinkle &&
        stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full opacity-0 animate-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
    </div>
  )
}

export default TwinkleImage
