import React, { useState, useContext } from 'react';
import { StateContext, DispatchContext } from '../../../appState/index.js';
import styled, { keyframes } from 'styled-components';
import api from '../../../api/index';
export default function QuestionForm(props) {
  const [state] = useContext(StateContext);
  const [username, setUsername] = useState('');
  const [, dispatch] = useContext(DispatchContext);
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const onSubmitHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    props.success();
    props.showForm();
    var newQuestion = {
      product_id: state.currentProduct,
      body: body,
      name: username,
      email: email,
    };
    api.post
      .question({ typeId: props.id, post:newQuestion, productId: state.currentProduct })
      .then((res) => console.log('post question res', res))
      .then(() => {
        setUsername('');
        setEmail('');
        setBody('');
        api.load.newProduct(state.currentProduct, dispatch);
      })
      .catch((err) => console.log('question not sent!'));
  };
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeBody = (e) => {
    setBody(e.target.value);
  };

  const preventBubbling = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal onClick={preventBubbling}>
      <QuestionsFormContainer>
        <Title>Submit Question About Product:</Title>
        <ProductName>{state.details.product.name}</ProductName>
        <form onSubmit={onSubmitHandler}>
          <label>Username: </label>
          <Input
            type='text'
            name='username'
            onChange={onChangeUsername}
            placeholder='Example: jackson11!'
            required
          />
          <label>Email: </label>
          <Input
            type='email'
            name='email'
            onChange={onChangeEmail}
            placeholder='Example: abc@gmail.com'
            required
          />
          <TextArea
            type='text'
            name='body'
            onChange={onChangeBody}
            placeholder='Have a question about a product? Ask it here!'
            required></TextArea>
          <CenterItemsWrapper>
            <InputSubmit type='submit' />
          </CenterItemsWrapper>
        </form>
      </QuestionsFormContainer>
    </Modal>
  );
}

const QuestionsFormContainer = styled.div`
  background-color: #f3f3f3;
  border-radius: 5px;
  padding: 20px;
`;

const Title = styled.h3`
  text-align: center;
`;

const TextArea = styled.textarea`
  height: 200px;
  width: 100%;
`;

const ProductName = styled.h4`
  margin-top: 10px;
  text-align: center;
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
  top: 15vh;
  left: 25%;
  width: 50%;
  z-index: 3;
  animation: ${fadeIn} ${time};
`;
