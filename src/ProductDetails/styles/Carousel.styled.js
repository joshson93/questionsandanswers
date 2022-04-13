import styled from 'styled-components';

export const StyledCarouselContainer = styled.div`
  background-image: url(${(({ photo }) => photo ? photo.url : '')});
  background-size: cover;
  width: 65%;
  height: 850px;
`

export const StyledCarouselPhotos = styled.img`
  height: 70px;
  width: 70px;
  object-fit: cover;
`
