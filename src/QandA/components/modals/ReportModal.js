import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
export default function ReportModal() {
  return (
    <Modal>
      <ReportMessage>You have marked this as reported!</ReportMessage>
    </Modal>
  );
}

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

const ReportMessage = styled.h3`
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
