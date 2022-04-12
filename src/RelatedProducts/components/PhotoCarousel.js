
import React, { useState, useEffect } from 'react';
import Photo from './Photo.js'



const fadeTime = 400;
const splitFade = Math.round(fadeTime / 2) - Math.round(fadeTime * 0.15)


const PhotoCarousel = ({ photos, nav, action, outfit }) => {
  // console.log(data)
  const [animate, setAnimate] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [canScrollUp, setScrollUp] = useState(true)
  const [canScrollDown, setScrollDown] = useState(false)

  useEffect(() => {
    if (photos.length === photoIndex + 1 ) {
      setScrollUp(false)
      setScrollDown(true)
    }
    if (photos.length - 1 > photoIndex > 0) {
      !canScrollUp && setScrollUp(true)
      !canScrollDown && setScrollDown(true)
    }
    if (photoIndex === 0) {
      setScrollUp(true)
      setScrollDown(false)
    }
  }, [photoIndex, canScrollUp, canScrollDown, photos.length])

  const scrollUp = () => {
    if (canScrollUp) {
      setAnimate(true)
      setTimeout(() => {
        setPhotoIndex(photoIndex + 1)
      }, splitFade)
      setTimeout(() => {
        setAnimate(false)
      }, fadeTime)
    }
  }
  const scrollDown = () => {
    if (canScrollDown) {
      setAnimate(true)
      setTimeout(() => {
        setPhotoIndex(photoIndex - 1)
      }, splitFade)
      setTimeout(() => {
        setAnimate(false)
      }, fadeTime)
    }
  }

  return (
    <Photo
      src={photos[photoIndex].url}
      onClick={nav}
      action={action}
      animate={animate}
      scrollDown={canScrollDown && scrollDown}
      scrollUp={canScrollUp && scrollUp}
      outfit={outfit}
    />
  )
}



export default PhotoCarousel