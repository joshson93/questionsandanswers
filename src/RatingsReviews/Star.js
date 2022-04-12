import styled from 'styled-components';
import React from 'react';

export default function Stars({ ratingAvg }) {
  let rating = ratingAvg || 0;
  let stars = [];
  while (stars.length < 5) {
    if (rating > 1) {
      stars.push(1);
    } else if (rating > 0) {
      let empty = Math.abs(0 - rating);
      let quart = Math.abs(0.25 - rating);
      let half = Math.abs(0.5 - rating);
      let three = Math.abs(0.75 - rating);
      let full = Math.abs(1 - rating);
      let closest = Math.min(empty, quart, half, three, full);
      switch (closest) {
        case empty:
          stars.push(0);
          break;

        case quart:
          stars.push(0.25);
          break;
        case half:
          stars.push(0.5);
          break;

        case three:
          stars.push(0.75);
          break;
        case full:
          stars.push(1.0);
          break;

        default:
          stars.push(0);
          break;
      }
    } else {
      stars.push(0);
    }
    rating = rating - 1;
  }
  return (
    <div>
      {stars.map((item, i) => {
        return (
          <SingleStarContainer key={i}>
            <SingleStarFill style={{ width: `${parseInt(item * 31)}px` }}>
              <SingleStarOutline
                id={i}
                src='https://raw.githubusercontent.com/psfonseka/five-stars/master/dist/star.png'
                alt='stars alt'
                onClick={() => {}}></SingleStarOutline>
            </SingleStarFill>
          </SingleStarContainer>
        );
      })}
    </div>
  );
}

const SingleStarOutline = styled.img`
  height: 36px;
  width: 31px;
`;
const SingleStarFill = styled.div`
  position: relative;
  display: inline-block;
  height: 36px;
  background-color: rgb(247, 193, 18);
`;
const SingleStarContainer = styled.div`
  height: 36px;
  width: 31px;
  display: inline-block;
`;
