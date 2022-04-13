import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import styled from 'styled-components';
import api from '../api/index';

export default function QuestionForm(props) {
  const [state] = useContext(StateContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const onSubmitHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    var newQuestion = {
      product_id: state.currentProduct,
      body: body,
      name: username,
      email: email,
    };
    api.post
      .question(newQuestion)
      .then((res) => console.log('post question res', res))
      .then(() => {
        props.showForm(false);
        setUsername('');
        setEmail('');
        setBody('');
      })
      .catch((err) => console.log('question not sent!'));
  };
  const onChangeSummary = (e) => {
    setUsername(e.target.value);
  };

  const onChangeBody = (e) => {
    setBody(e.target.value);
  };

  const preventBubbling = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal onClick={preventBubbling}>
      <ReviewFormContainer>
        <form >
          <label>Review Summary </label>
          <Input
            type='text'
            name='Summary'
            onChange={onChangeSummary}
            placeholder='Write your Review'
            required
          />
          <TextArea
            type='text'
            name='body'
            onChange={onChangeBody}
            placeholder='About the [PRODUCT NAME HERE]'
            required></TextArea>
          <CenterItemsWrapper>
            <InputSubmit type='submit' />
          </CenterItemsWrapper>
        </form>
      </ReviewFormContainer>
    </Modal>
  );
}

const ReviewFormContainer = styled.div`
  background-color: #f3f3f3;
  border-radius: 5px;
  padding: 20px;
`;

const TextArea = styled.textarea`
  height: 200px;
  width: 100%;
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

const InputSubmit = styled.input`
  background-color: #ccc;
  color: black;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  top: 30vh;
  left: 15%;
  width: 75%;
  z-index: 2;
`;
