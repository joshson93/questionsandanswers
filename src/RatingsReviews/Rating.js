import React from 'react';
import styled from 'styled-components';
import Stars from './Star.js';

export default function Rating({ data }) {
  function ratingAverage() {
    var total = 0,
      totalcount = 0;

    for (var i in data.ratings) {
      total += Number(data.ratings[i] * i);
      totalcount += Number(data.ratings[i]);
    }
    return (Math.round((total / totalcount) * 4) / 4).toFixed(1);
  }
  function recommendPercentage() {
    var numerator = Number(data.recommended.true);
    var denominator = Number(data.recommended.false);
    return Math.round((numerator / (numerator + denominator)) * 100);
  }

  function StarBars() {
    var total = 0;
    for (var i in data.ratings) {
      total += Number(data.ratings[i]);
    }
    return Object.values(data.ratings).map((rating, id) => {
      return (
        <StarBarContainer key={id}>
          {id + 1} Star
          <BarContainer style={{ backgroundColor: 'gray' }}>
            <BarContainer5
              className='bar-5'
              style={{ width: `${(Number(rating) / total) * 100}%` }}></BarContainer5>
          </BarContainer>
          {rating}
        </StarBarContainer>
      );
    });
  }

  function Characteristics() {
    return Object.entries(data.characteristics).map((characteristic, id) => {
      return (
        <div key={id}>
          <div key={characteristic[1].id}>
            {characteristic[0]}: {Number(characteristic[1].value).toFixed(1)}
          </div>
          <BarContainer style={{ backgroundColor: 'gray' }}>
            <BarContainer5
              className='bar-5'
              style={{
                width: `${Number(characteristic[1].value).toFixed(1) * 20}%`,
              }}></BarContainer5>
          </BarContainer>
        </div>
      );
    });
  }

  return (
    <div>
      <OverallRatingContainer>
        <span>rating: {ratingAverage()}</span>
        <Stars ratingAvg={ratingAverage()} />
      </OverallRatingContainer>

      <div>{recommendPercentage()}% of reviews recommend this product</div>

      <StarBars />

      <Characteristics />
    </div>
  );
}

const OverallRatingContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
`;
const StarBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  font-size: 13px;
`;
const BarContainer = styled.div`
  width: 300px;
  background-color: #f1f1f1;
  text-align: center;
  color: white;
  border-radius: 25px;
`;
const BarContainer5 = styled.div`
  height: 18px;
  background-color: #04aa6d;
`;
