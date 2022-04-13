
import styled, { keyframes } from 'styled-components';


const componentsInit = (fadeTime) => {


  const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0
  }
`;

const fadeOptions = `${fadeTime}ms linear forwards`
const Animatior = styled.div`
  opacity: 0;
  pointer-events: ${({ show }) => show ? 'auto' : 'none'};
  animation: ${({ show, open }) => show ? fadeIn : open && fadeOut} ${fadeOptions};
`


const ModalContainer = styled(Animatior)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  position: fixed;
  align-Items: center;
  justify-Content: center;
  background-Color: rgba(0, 0, 0, 0.35);

`


const ModalContent = styled(Animatior)`
  /* width: 550px; */
  /* height: 400px; */
  background-Color: rgba(250, 250, 250, 0);
`
//background-Color: rgb(247, 193, 18);;


const ModalText = styled(Animatior)`
  font-size: 22px;
  color: rgb(20, 20, 20);
`

return {
  ModalText,
  ModalContent,
  ModalContainer,
}
}

export default componentsInit;