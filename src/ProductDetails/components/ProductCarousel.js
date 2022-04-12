import React, { useState, useEffect } from 'react';
import { StyledCarouselContainer, StyledCarouselPhotos, StyledArrowsContainer,StyledThumbnailContainer, StyledArrowButton } from './../styles/Carousel.styled.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons'
// import { FlexColumn } from './../styles/Flex.styled.js';

function Carousel(props){
  const [activePhoto, setActivePhoto] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [displayedPhotos, setDisplayedPhotos] = useState([]);
  const [displayedPhotosIndexes, setDisplayedPhotosIndexes] = useState([0, 7]);

  useEffect(() => {
    if (props.photos) {
      if (props.photos.length - 1 >= photoIndex) {
        setActivePhoto(props.photos[photoIndex]);
      } else {
        setActivePhoto(props.photos[0])
      }
      setDisplayedPhotos(props.photos.slice(0, 7));
      setDisplayedPhotosIndexes([0, 7])
    }
  }, [props.photos])

  useEffect(() => {
    if (props.photos) {
      setActivePhoto(props.photos[0]);
      setDisplayedPhotos(props.photos.slice(0, 7));
      setDisplayedPhotosIndexes([0, 7]);
      setPhotoIndex(0);
    }
  }, [props.newProduct])

  useEffect(() => {
    setPhotoIndex(props.expandedImage);
    setActivePhoto(props.photos[props.expandedImage]);

    indexesInRightRange(props.expandedImage);
  }, [props.expandedImage])

  useEffect(() => {
    setDisplayedPhotos(props.photos.slice(displayedPhotosIndexes[0], displayedPhotosIndexes[1]));
  }, [displayedPhotosIndexes]);

  const handleMainArrowClick = (e, index) => {
    setPhotoIndex(index);
    setActivePhoto(props.photos[index]);

    indexesInRightRange(index);
  }

  const indexesInRightRange = (index) => {
    if (props.photos.length > 7) {
      if (index <= props.photos.length - 7) {
        setDisplayedPhotosIndexes([index, index + 7]);
      } else {
        setDisplayedPhotosIndexes([props.photos.length - 7, props.photos.length]);
      }
    }
  }

  const handlePhotoClick = (e, url) => {
    props.photos.forEach((photo, index) => {
      if (photo.thumbnail_url === url) {
        setActivePhoto(photo);
        setPhotoIndex(index);
        return;
      }
    })
  }

  const handleThumbnailArrowClick = (e, num) => {
    let newFirstIndex = displayedPhotosIndexes[0] + num;
    let newLastIndex = displayedPhotosIndexes[1] + num;
    let firstIndex = displayedPhotosIndexes[0];

    if (newFirstIndex >= 0 && newFirstIndex <= props.photos.length - 7) {
      firstIndex = newFirstIndex
    }

    let lastIndex = displayedPhotosIndexes[1];

    if (newLastIndex <= props.photos.length && newLastIndex >= 7) {
      lastIndex = newLastIndex;
    }

    setDisplayedPhotos(props.photos.slice(firstIndex, lastIndex));
    setDisplayedPhotosIndexes([firstIndex, lastIndex]);
  }

  if (props.photos && activePhoto) {

    const allPhotos = displayedPhotos.map((photo, i) => <StyledCarouselPhotos src={ photo.thumbnail_url } key={i} onClick={(e, url) => {handlePhotoClick(e, photo.thumbnail_url); e.stopPropagation()}} isActive={ activePhoto.thumbnail_url === photo.thumbnail_url ? true : false }/>);


    return(<StyledCarouselContainer photo={activePhoto} onClick={(e, index) => props.handleExpandedView(e, photoIndex)}>

        {/** Thumbnails buttons and images */}
        <StyledArrowButton onClick={(e, num) => {handleThumbnailArrowClick(e, -1); e.stopPropagation()}} disabled={ displayedPhotos.length < 7 || displayedPhotosIndexes[0] === 0 ? true : false }>Top</StyledArrowButton>

        <button onClick={(e, index) => props.handleExpandedView(e, photoIndex)} style={{backgroundColor: 'none'}}>Expand</button>

        <StyledThumbnailContainer>
          {allPhotos}
        </StyledThumbnailContainer>

        <StyledArrowButton onClick={(e, num) => {handleThumbnailArrowClick(e, 1); e.stopPropagation()}} disabled={ displayedPhotos.length < 7 || displayedPhotosIndexes[0] === props.photos.length - 7 ? true : false }>Bottom</StyledArrowButton>

        {/** Main image */}
        <StyledArrowsContainer>
          <StyledArrowButton onClick={(e, dir) => {handleMainArrowClick(e, (photoIndex - 1)); e.stopPropagation();}} disabled={ photoIndex === 0 ? true : false }>{'<'}</StyledArrowButton>
          <StyledArrowButton onClick={(e, dir) => {handleMainArrowClick(e, (photoIndex + 1)); e.stopPropagation()}} disabled={ photoIndex === props.photos.length - 1 ? true : false }>{'>'}</StyledArrowButton>
        </StyledArrowsContainer>
      </StyledCarouselContainer>)

  } else {
    return <p>loading</p>
  }

}

export default Carousel;