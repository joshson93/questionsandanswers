import React, { useState, useEffect } from 'react';
import { StyledCarouselContainer, StyledCarouselPhotos } from './../styles/Carousel.styled.js';
import { FlexColumn } from './../styles/Flex.styled.js';

function Carousel(props){
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    if (props.photos) {
      setActivePhoto(props.photos[0]);
    }
  }, [props.photos])

  const handlePhotoClick = (e, index) => {
    console.log(index);
    setActivePhoto(props.photos[index]);
  }

  if (props.photos) {
    const allPhotos = props.photos.map((photo, i) => <StyledCarouselPhotos src={photo.thumbnail_url} alt="" key={i} width="100px" onClick={(e) => handlePhotoClick(e, i)}/>)
    return(<StyledCarouselContainer photo={activePhoto}><FlexColumn>{allPhotos}</FlexColumn></StyledCarouselContainer>)
  } else {
    return <p>loading</p>
  }

}

export default Carousel;