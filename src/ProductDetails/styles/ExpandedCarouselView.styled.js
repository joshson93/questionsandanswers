import styled from 'styled-components';

export const StyledExpandedViewModal = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.35);
`
export const StyledExpandedViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  width: 60%;
  height: 80%;
  background-color: #fff;
  border-radius: 0.5%;
  overflow: hidden;
  background-image: url(${({bgImg}) => bgImg });
  background-size: cover;
  background-position: bottom;
  position: absolute;
  cursor: crosshair;

  button {
    width: 1.8em;
    height: 1.8em;
    font-size: var(--fs-2);
    font-weight: 400;
    border-radius: 50%;
    margin: 1.2em;
    opacity: 0.8;
    transition: opacity 0.4s ease-in-out
  }

  button:last-of-type {
    margin-left: 0.5em;
  }

  button:hover {
    opacity: 1;
  }

`

export const StyledDotImage = styled.div`
  width: 0.5em;
  height: 0.5em;
  border: 0.15em solid ${({activeDot}) => activeDot ? 'var(--accent-color)' : 'var(--bgc-1)' };;
  opacity: ${({activeDot}) => activeDot ? '1' : '0.5' };
  border-radius: 50%;
  margin-right: 8px;
  margin-bottom: 20px;
  background-color: ${({activeDot}) => activeDot ? 'var(--accent-color)' : 'var(--bgc-1)' };
`