import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../../appState/index.js';
import styled from 'styled-components';
import AnswerForm from './forms/AnswerForm';
import moment from 'moment';
import api from '../../api/index';
import HelpfulModal from './modals/HelpfulModal';
import SuccessModal from './modals/SuccessModal';
import ErrorModal from './modals/ErrorModal';

export default function Questions(props) {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);
  const [answerForm, setAnswerForm] = useState(false);
  const [submitHelpfulQuestionOnce, setsubmitHelpfulQuestionOnce] = useState(true);
  const [showHelpfulModal, setShowHelpfulModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    setAnswerForm(false);
  }, [state.QA]);

  const answerFormHandler = () => {
    setAnswerForm(!answerForm);
  };

  const showAnswerForm = () => {
    setAnswerForm(false);
    setShowSuccess(true);
  };

  const backDropHandler = () => {
    setAnswerForm(false);
  };

  const backDropHelpfulHandler = () => {
    setShowHelpfulModal(false);
  };

  const backDropSuccessHandler = () => {
    setShowSuccess(false);
  };

  const backDropErrorHandler = () => {
    setShowErrorModal(false);
  };

  const helpfulQuestionHandler = (id) => {
    setsubmitHelpfulQuestionOnce(false);
    if (submitHelpfulQuestionOnce) {
      setShowHelpfulModal(true);
      api.upvote
        .question({ typeId: id, productId: state.currentProduct })
        .then(() => api.load.newProduct(state.currentProduct, dispatch))
        .catch((err) => console.log('helpful question not sent!'));
    } else {
      setShowErrorModal(true);
    }
  };

  const reportQuestionHandler = (id) => {
    api.report
      .question({ typeId: id, productId: state.currentProduct })
      .then(() => api.load.newProduct(state.currentProduct, dispatch))
      .catch((err) => console.log('report question not sent!'));
  };

  const highlight = (sentence, keyword) => {
    const splitValue =
      keyword.includes('?') && keyword.length === 1 ? /(\?)/gi : new RegExp(`(${keyword})`, 'gi');
    let sentenceSplit = sentence.split(splitValue);
    return (
      <>
        <QuestionBody>Q: </QuestionBody>
        {sentenceSplit.map((word, i) => (
          <QuestionBody
            key={i}
            style={
              word.toLowerCase() === keyword.toLowerCase() ? { backgroundColor: 'yellow' } : {}
            }>
            {word}
          </QuestionBody>
        ))}
      </>
    );
  };

  return (
    <QuestionsContainer data-testid='question'>
      <QuestionBodyHelpfulQuestionWrapper>
        <QuestionBodyWrapper>
          {!props.highlight ? (
            <QuestionBody>Q: {props.q.question_body}</QuestionBody>
          ) : (
            highlight(props.q.question_body, props.highlight)
          )}
        </QuestionBodyWrapper>
        <HelpfulReportContainer>
          Helpful Question?{' '}
          <HelpfulLink
            helpful={!submitHelpfulQuestionOnce}
            onClick={() => helpfulQuestionHandler(props.q.question_id)}>
            Yes
          </HelpfulLink>{' '}
          ({props.q.question_helpfulness}) |{'  '}
          <ReportedLink onClick={() => reportQuestionHandler(props.q.question_id)}>
            Report
          </ReportedLink>
          <AddAnswerLink onClick={answerFormHandler}>Add Answer</AddAnswerLink>
        </HelpfulReportContainer>
      </QuestionBodyHelpfulQuestionWrapper>
      <QuestionsAuthor>
        By: {props.q.asker_name} | {moment(props.q.question_date).format('MMMM Do, YYYY')}
      </QuestionsAuthor>
      {answerForm && (
        <BackDrop onClick={backDropHandler}>
          <AnswerForm id={props.q.question_id} showForm={showAnswerForm} />
        </BackDrop>
      )}
      {showHelpfulModal && (
        <BackDrop onClick={backDropHelpfulHandler}>
          <HelpfulModal />
        </BackDrop>
      )}
      {showSuccess && (
        <BackDrop onClick={backDropSuccessHandler}>
          <SuccessModal />
        </BackDrop>
      )}
      {showErrorModal && (
        <BackDrop onClick={backDropErrorHandler}>
          <ErrorModal />
        </BackDrop>
      )}
    </QuestionsContainer>
  );
}

const ReportedLink = styled.span`
  text-decoration: underline;
  margin-right: 10px;
  cursor: pointer;
  padding-left: 1.5px;
`;

const HelpfulLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const AddAnswerLink = styled.span`
  margin-bottom: 10px;
  width: 90px;
  margin-top: 10px;
  display: block;
  text-decoration: underline;
  cursor: pointer;
`;

const QuestionBodyWrapper = styled.div`
  flex: 1;
`;

const QuestionBodyHelpfulQuestionWrapper = styled.div`
  display: flex;
`;

const QuestionsContainer = styled.div`
  margin-top: 25px;
  width: 60%;
  display: inline-block;
`;

const QuestionsAuthor = styled.p`
  margin-top: 5px;
`;

const QuestionBody = styled.h3`
  display: inline;
  font-size: var(--body-fs);
`;

const HelpfulReportContainer = styled.div`
  position: absolute;
  left: 70%;
`;

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  background: rgba(0, 0, 0, 0.75);
`;
