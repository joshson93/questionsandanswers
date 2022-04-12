import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ReactiveButton from 'reactive-button';
const buttonStyle = {
  backgroundColor: '#ccc',
  color: 'black',
  padding: '12px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default function ImageForm(props) {
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [img4, setImg4] = useState('');
  const [img5, setImg5] = useState('');
  const [submittedPhotos, setSubmittedPhotos] = useState('idle');
  const img1Handler = (e) => {
    setImg1(e.target.value);
  };
  const img2Handler = (e) => {
    setImg2(e.target.value);
  };
  const img3Handler = (e) => {
    setImg3(e.target.value);
  };
  const img4Handler = (e) => {
    setImg4(e.target.value);
  };
  const img5Handler = (e) => {
    setImg5(e.target.value);
  };
  const onSubmitHandler = () => {
    setSubmittedPhotos('loading');
    setTimeout(() => {
      setSubmittedPhotos('success');
    }, 3000);
    setTimeout(() => {
      props.getPhotos([img1, img2, img3, img4, img5]);
      props.afterSubmit(false);
    }, 4000);
  };

  const backDropHandler = (e) => {
    e.stopPropagation();
    props.afterSubmit(false);
  };

  const preventBubbling = (e) => {
    e.stopPropagation();
  };

  return (
    <BackDrop onClick={backDropHandler}>
      <Modal onClick={preventBubbling}>
        <ImagesFormContainer>
          <Title>Upload Images</Title>
          <label>Image 1:</label>
          <Input value={img1} onChange={img1Handler} type='text' />
          <label>Image 2:</label>
          <Input value={img2} onChange={img2Handler} type='text' />
          <label>Image 3:</label>
          <Input value={img3} onChange={img3Handler} type='text' />
          <label>Image 4:</label>
          <Input value={img4} onChange={img4Handler} type='text' />
          <label>Image 5:</label>
          <Input value={img5} onChange={img5Handler} type='text' />
          <CenterItemsWrapper>
            <ReactiveButton
              onClick={onSubmitHandler}
              animation={false}
              color={'primary'}
              buttonState={submittedPhotos}
              outline={false}
              shadow={false}
              idleText={'Submit Photos'}
              style={buttonStyle}
            />
          </CenterItemsWrapper>
        </ImagesFormContainer>
      </Modal>
    </BackDrop>
  );
}

const ImagesFormContainer = styled.div`
  background-color: #f3f3f3;
  border-radius: 5px;
  padding: 20px;
`;

const Title = styled.h3`
  text-align: center;
`;

const fadeIn = keyframes`
 from {
    opacity: 0;
  }
  to {
    opacity: 1
  }`;
const time = `300ms linear forwards`;

const Modal = styled.div`
  position: fixed;
  margin-left: 25%;
  top: 18vh;
  left: 10%;
  width: 30%;
  z-index: 5;
  animation: ${fadeIn} ${time};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
`;

const CenterItemsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 3;
  background: rgba(0, 0, 0, 0.75);
`;
