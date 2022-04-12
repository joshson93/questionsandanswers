import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../../appState/index.js';

import styled from 'styled-components';
import moment from 'moment';
import api from '../../api/index';
import HelpfulModal from './modals/HelpfulModal';
import ErrorModal from './modals/ErrorModal';
import Image from './modals/Image';
export default function Answers(props) {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);
  const [addMoreAnswers, setAddMoreAnswers] = useState(0);
  const [length, setLength] = useState(Object.keys(props.a).length);
  const [showHelpfulModal, setShowHelpfulModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);

  const addMoreAnswersClickHandler = () => {
    setAddMoreAnswers(addMoreAnswers + length);
  };

  useEffect(() => {
    // setAddMoreAnswers(0);
    setLength(Object.keys(props.a).length);
  }, [props.a]);

  useEffect(() => {
    setAddMoreAnswers(0);
  }, [state.currentProduct]);

  const helpfulAnswerHandler = (id) => {
    if (state.user.upVoted.find((val) => val === id)) {
      setShowErrorModal(true);
    } else {
      const newUpvoted = [...state.user.upVoted, id];
      dispatch({
        type: 'SET_UPVOTED',
        payload: newUpvoted,
      });
      setShowHelpfulModal(true);
      api.upvote.answer({ typeId: id, productId: state.currentProduct })
        .then(() =>  api.load.newProduct(state.currentProduct, dispatch))
        .catch((err) => console.log('helpful question not sent!'));
    }
  };

  const reportAnswerHandler = (id) => {
    api.report.answer({ typeId: id, productId: state.currentProduct })
      .then(() =>  api.load.newProduct(state.currentProduct, dispatch))
      .catch((err) => console.log('report answer not sent!'));
  };

  const backDropHandler = (e) => {
    e.stopPropagation();
    setShowHelpfulModal(false);
  };

  const backDropErrorHandler = () => {
    setShowErrorModal(false);
  };

  const onClickImageHandler = (e) => {
    setImgSrc(e.target.src);
    setShowImageModal(true);
  };

  const backDropImageHandler = () => {
    setShowImageModal(false);
  };

  const collapseAllAnswersHandler = () => {
    setAddMoreAnswers(0);
  };


  const sortingBySeller = (values) => {
    let sorted = values.sort((a, b) => {
      if (
        a.answerer_name.toLowerCase() !== 'seller' &&
        b.answerer_name.toLowerCase() !== 'seller'
      ) {
        return a.answerer_name > b.answerer_name ? 1 : -1;
      } else {
        return a.answerer_name.toLowerCase() !== 'seller' ? 1 : -1;
      }
    });
    return sorted;
  };

  return (
    <AnswersContainer>
      {sortingBySeller(Object.values(props.a))
        .slice(0, 1 + addMoreAnswers)
        .map((answer) => {
          return (
            <EachAnswerContainer key={answer.id}>
              <AnswerBody>A: {answer.body}</AnswerBody>
              {answer.photos &&
                answer.photos.map((photo, i) => {
                  return (
                    <ImagesContainer key={i}>
                      <Img onClick={onClickImageHandler} alt='picture from answerer' src={photo} />
                    </ImagesContainer>
                  );
                })}
              <Wrapper>
                <ByP>By: </ByP>
                <AnswerAuthor
                  style={
                    answer.answerer_name.toLowerCase() === 'seller' ? { fontWeight: 'bold' } : {}
                  }>
                  {answer.answerer_name}
                </AnswerAuthor>
                <AnswerDate>| {moment(answer.date).format('MMMM Do, YYYY')}</AnswerDate>
              </Wrapper>
              <HelpfulAnswer>
                Helpful Answer?{' '}
                <HelpfulLink onClick={() => helpfulAnswerHandler(answer.id)}>Yes</HelpfulLink> (
                {answer.helpfulness}) |{' '}
                <ReportedLink onClick={() => reportAnswerHandler(answer.id)}>Report</ReportedLink>
              </HelpfulAnswer>
            </EachAnswerContainer>
          );
        })}
      {length > 1 && addMoreAnswers !== length && (
        <LoadMoreAnswers onClick={addMoreAnswersClickHandler}>Load All Answers</LoadMoreAnswers>
      )}
      {length > 1 && addMoreAnswers === length && (
        <LoadMoreAnswers onClick={collapseAllAnswersHandler}>Collapse Answers</LoadMoreAnswers>
      )}
      {showHelpfulModal && (
        <BackDrop onClick={backDropHandler}>
          <HelpfulModal />
        </BackDrop>
      )}
      {showErrorModal && (
        <BackDrop onClick={backDropErrorHandler}>
          <ErrorModal />
        </BackDrop>
      )}
      {showImageModal && (
        <BackDrop onClick={backDropImageHandler}>
          <Image src={imgSrc} />
        </BackDrop>
      )}
    </AnswersContainer>
  );
}

const ReportedLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
  padding-left: 1.5px;
`;

const AnswerAuthor = styled.p`
  margin-top: 5px;
`;

const ByP = styled.p`
  margin-top: 5px;
  margin-right: 5px;
`;

const AnswerDate = styled.p`
  margin-top: 5px;
  margin-left: 5px;
`;

const HelpfulLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const EachAnswerContainer = styled.div`
  margin-top: 25px;
`;

const HelpfulAnswer = styled.div`
  margin-top: 10px;
  margin-bottom: 25px;
`;

const LoadMoreAnswers = styled.p`
  cursor: pointer;
  text-decoration: underline;
  margin-top: 10px;
  margin-bottom: 25px;
`;

const AnswersContainer = styled.div`
  margin-top: 25px;
  width: 60%;
`;

const ImagesContainer = styled.div`
  display: inline;
`;

const Img = styled.img`
  cursor: pointer;
  width: 90px;
  height: 90px;
  margin: 5px;
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

const Wrapper = styled.div`
  display: flex;
`;

const AnswerBody = styled.h3`
  font-size: var(--body-fs);
`;
