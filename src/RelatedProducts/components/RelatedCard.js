import React from 'react';
import styled from 'styled-components';
import PhotoCarousel from './PhotoCarousel.js'

// const fadeTime = 400;
// const splitFade = Math.round(fadeTime / 2) - Math.round(fadeTime * 0.15)


export const RelatedCard = ({ data, outfit, nav, action }) => {
  data.photos = data.photos || []

  if ( data.type === 'render') {
    // console.log(data)
    const { name, category, photos, default_price } = data;


    return  (
      <RelatecCardContainer data-testid="RelatedCard" >
        <PhotoCarousel photos={photos} nav={nav} action={action} outfit={outfit} />
        <CardFooter>
          <CardFooterText>{name} </CardFooterText>
          <CardFooterText>{category}</CardFooterText>
          <CardFooterText>{'$' + default_price} </CardFooterText>

        </CardFooter>
      </RelatecCardContainer>
    );
  }
  if (data.type === 'emptyOutfit') {
    return  (
      <RelatecCardContainer data-testid="RelatedCard" onClick={outfit} >
        <EmptyTextContainer>
          <p>Click to add </p>
          <p>the viewed item </p>
          <p>to your outfit!</p>
        </EmptyTextContainer>
      </RelatecCardContainer>
    );
  }
  if (data.type === 'emptyRelated') {
    return  (
      <RelatecCardContainer data-testid="RelatedCard"  >
        <EmptyTextContainer>
          <p>Sorry, no </p>
          <p>related items. </p>
        </EmptyTextContainer>
      </RelatecCardContainer>
    );
  } else {
    return (
      <RelatecCardContainer data-testid="RelatedCard"  >
        <EmptyTextContainer>
          <p>Loading</p>
        </EmptyTextContainer>
      </RelatecCardContainer>
    )
  }

}




var cardHeight = 19;
const cardWidth = Math.round(cardHeight * 0.8).toString()
cardHeight = cardHeight.toString()
const borderRadius = '3';

const RelatecCardContainer = styled.div`
  height: ${cardHeight}em;
  display: flex;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 5px;
  flex-direction: column;

  justify-content: space-evenly;
  background-color: var(--element-bgc);
  box-shadow: 1px 1px 5px rgba(0,0,0,0.15);
`



const CardFooter = styled.div`
  height: 5em;
  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  /* background-color: var(--element-bgc); */
  border-radius: ${borderRadius}px;
`


const CardFooterText = styled.p`
  font-size: var(--fs-1);
  /* font-size: var(--body-fs); */
  color: var(--body-fc);
`






const EmptyTextContainer = styled.div`
  width: ${cardWidth}em;
  display: flex;
  height: ${cardHeight}em;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: var(--body-fs);
  color: var(--body-fc);
  background-color: var(--element-bgc);


`


