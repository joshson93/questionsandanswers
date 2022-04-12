import React from 'react';
import styled from 'styled-components';
import Answers from './Answers';
import Questions from './Questions';

export default function QAList(props) {
  return (
    <QAndAContainer id={props.q.question_id}>
      <Questions highlight={props.highlight ? props.highlight : null} q={props.q} />
      <Answers a={props.q.answers} />
    </QAndAContainer>
  );
}

const QAndAContainer = styled.div`
  border-bottom: 0.5px solid black;
  overflow: hidden;
`;
