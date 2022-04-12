import styled from 'styled-components';

export const StyledCarouselContainer = styled.div`
  background-image: url(${(({ photo }) => photo ? photo.url : '')});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  /* width: 65%; */
  width: var(--product-carousel-width);

  &:hover {
    cursor: zoom-in;
  }

  button:hover {
    cursor: pointer;
  }
`

export const StyledCarouselPhotos = styled.span`
  background-image: url(${({src}) => src});
  background-size: cover;
  background-position: bottom;
  min-height: 60px;
  max-width: 60px;
  border-bottom: ${({ isActive }) => isActive ? '3px solid rgb(247,193,18);' : ''};
  margin-bottom: 0.1em;
`

export const StyledThumbnailContainer = styled.div`
  display: flex;
  margin-left: 30px;
  margin-top: 30px;
  flex-direction: column;
  overflow: auto;
  height: 430px;
  width: 60px;
  box-shadow: 1px 1px 5px rgba(0,1em,1em,0.5);

  &:hover {
    cursor: pointer;
  }
`

export const StyledArrowsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15%;

  button {
    width: 2.3em;
    height: 2.3em;
    font-size: var(--fs-2);
    font-weight: 400;
    border-radius: 50%;
    margin: 2em;
    opacity: 0.8;
    transition: opacity 0.4s ease-in-out;
  }

  button:hover {
    opacity: 1;
  }
`
export const StyledArrowButton = styled.button`
  visibility: ${({disabled}) => disabled ? 'hidden' : 'visible'}
`
