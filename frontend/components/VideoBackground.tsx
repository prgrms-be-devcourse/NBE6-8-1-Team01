import React from 'react'

interface VideoBackgroundProps {
  src: string
  poster?: string
  className?: string
  overlay?: boolean
  overlayOpacity?: number
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src,
  poster,
  className = '',
  overlay = true,
  overlayOpacity = 0.4
}) => {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {overlay && (
        <div 
          className="absolute inset-0 bg-black" 
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  )
}