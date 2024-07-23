import React from 'react'

const Videoplayer = ({url}) => {
  return (
    <video src={url} autoPlay controls width={800} height={800} />
  )
}

export default Videoplayer