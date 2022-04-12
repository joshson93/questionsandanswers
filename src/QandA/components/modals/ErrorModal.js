import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
export default function ErrorModal() {
  return (
    <Modal>
      <ErrorMessage>
        <XMark></XMark> You cannot mark this more than once!
      </ErrorMessage>
    </Modal>
  );
}

const XMark = styled.div`
  display: inline-block;
  margin-right: 5px;
  width: 15px;
  height: 15px;
  background: -webkit-linear-gradient(
      -45deg,
      transparent 0%,
      transparent 40%,
      #d8000c 46%,
      #d8000c 56%,
      transparent 56%,
      transparent 100%
    ),
    -webkit-linear-gradient(45deg, transparent 0%, transparent 40%, #d8000c 46%, #d8000c 56%, transparent
          56%, transparent 100%);
`;

const ErrorAnimation = keyframes`
 0% {
   opacity: 0;
   transform: translateY(100px);
 }

 50% {
   opacity: .25;
 }

 100% {
   opacity: 1;
   transform: translateY(0px);
 }
`;

const ErrorMessage = styled.h3`
  background-color: #ffbaba;
  color: #d8000c;
  padding: 20px;
  border-radius: 5px;
  animation: ${ErrorAnimation} 1s ease-in-out;
`;

const Modal = styled.div`
  text-align: center;
  position: fixed;
  margin-left: 25%;
  top: 5.5vh;
  width: 50%;
  z-index: 2;
`;
