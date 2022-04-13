import React, { useContext, useState, useEffect } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import styled from 'styled-components';


import { initProductsFromIds } from './methods.js'
import Carousel from './components/Carousel.js';






var mainRenderCount = 0;
const RelatedProducts = () => {
  const [state] = useContext(StateContext)
  const { related, user, dev, currentProduct } = state;
  const { outfit } = user




  const relatedInit = related.length ? Array(related.length).fill({}) : [ { type: 'emptyRelated', id: state.currentProduct } ];
  const [relatedItemData, setRelatedItemData] = useState(relatedInit);
  const outfitInit = outfit.length ? Array(outfit.length).fill({}) : [ { type: 'emptyOutfit', id: state.currentProduct } ];
  const [outFitItemData, setOutfitItemData] = useState(outfitInit);

  if( dev.logs ) {
    mainRenderCount++;
    dev.renders && console.log('DEV  RENDER   RelatedProducts     number of renders: ', mainRenderCount)
    dev.state && console.log('DEV  STATE   RelatedProducts: ', related)
  }

  useEffect(() => {
    if (related.length) {
      initProductsFromIds(related, currentProduct, setRelatedItemData)
    } else {
      setRelatedItemData([ { type: 'emptyRelated', id: state.currentProduct } ])
    }
  }, [related, currentProduct, state.currentProduct])


  useEffect(() => {
    if (outfit.length) {
      initProductsFromIds(outfit, currentProduct, setOutfitItemData, false)
    } else {
      setOutfitItemData([ { type: 'emptyOutfit', id: state.currentProduct } ])
    }
  }, [outfit, currentProduct, state.currentProduct])


  return (
    <RelatedContainer data-testid="related" >
      <HeaderText>Related Products</HeaderText>
      <CarouselContainer  >
        <Carousel products={relatedItemData} outfit={outFitItemData}  />
      </CarouselContainer>
      <HeaderText>My outfit</HeaderText>
      <CarouselContainer >
        <Carousel outfit={outFitItemData} />
      </CarouselContainer>
    </RelatedContainer>
  )

}

const RelatedContainer = styled.div`
  width: 100%;
  height: auto;
  padding-top: 40px;
  padding-bottom: 40px;
`



const CarouselContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  padding-top: 10px;
  align-items: center;
  padding-bottom: 10px;
  justify-content: space-evenly;
`

const HeaderText = styled.h1`
  font-size: 24px;
  margin-left: 7.5%;
  color: rgb(50, 50, 50);
`










export const relatedStateInit = (productId) => {
  return [`/products/${productId}/related/`, {}]
}

export default RelatedProducts