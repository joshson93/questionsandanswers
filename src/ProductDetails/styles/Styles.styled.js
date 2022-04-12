import styled from 'styled-components';

export const StylesImages = styled.img`
  width: 4em;
  height: 4em;
  object-fit: cover;
  border-radius: 50%;
  margin: 5px;
  box-shadow: ${({active}) => active ? '1px 1px 5px rgba(0,0,0,0.18)' : ''};
  opacity: ${({active}) => active ? 1 : 0.6};
  transition: opacity 0.4s ease-in-out;

  &:hover {
    opacity: 1;
  }

  &:active {
    opacity: 1;
  }
`

export const StylesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 4.2em 1.3em 6.5em;
  width: 340px;
`
