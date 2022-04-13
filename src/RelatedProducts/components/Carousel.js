
import React, { useContext } from 'react';
import styled from 'styled-components';
import { initializeAppState } from '../methods.js'

import { DispatchContext } from '../../appState/index.js';
import { RelatedCard } from './RelatedCard.js'




const Carousel = ({ products, outfit }) => {
  var rendered = products || outfit
  const [, dispatch] = useContext(DispatchContext);
  var cardFunction = products ? getAddProductToOutfit : getRemoveProductFromOutfit

  // console.log('rendered', rendered)
  return (
    <CarouselContainer data-testid={'carousel'} >
      {rendered.map((data, ind) => {
        cardFunction = data.type !== 'emptyOutfit' ? cardFunction : getAddProductToOutfit
        return (
          <RelatedCard
          data={data}
          outfit={cardFunction(outfit, dispatch, data, ind)}
          nav={() => initializeAppState(dispatch, data.id)}
          key={data.id ? data.id : ind}
          action={products ? "Add to" : "Remove from"}
          />
        )
      })}
    </CarouselContainer>
  )
}





const getAddProductToOutfit = (outfit, dispatch, productData, index) => {

  if (productData.type === 'emptyOutfit') {
    outfit = outfit.filter(outfitData => outfit.type === productData.type)
  }

  return () => {
    const notInOutFit = outfit.length ?  outfit.every(product => productData.id !== product.id) : true;
    if (notInOutFit) {
      const newOutfit = [productData.id, ...outfit.map(product => product.id) ]
      dispatch({
        type: 'SET_OUTFIT',
        payload: newOutfit,
      })
    } else {
      console.log('already in your outfit.')
    }
  }
}


const getRemoveProductFromOutfit = (outfit, dispatch, productData, index) => {
  return () => {
    const newOutfit = [...outfit.map(product => product.id)]
    newOutfit.splice(index, 1)
    dispatch({
      type: 'SET_OUTFIT',
      payload: newOutfit
    })
  }
}



const CarouselContainer = styled.div`
  width: 85%;
  height: auto;
  display: flex;
  padding: 20px;
  overflow: auto;
  white-space: nowrap;
  border-radius: 7px;
  padding-top: 20px;
  padding-bottom: 20px;
  align-items: center;
  background-color: rgb(242, 242, 242);
  /* background-Color: rgba(247, 193, 18, 0.8); */
`

// const CarouselAccent = styled.div`
//   width: 90%;
//   height: auto;
//   padding: 5px;
//   display: flex;
//   padding: 6px;
//   /* padding-bottom: 5px; */
//   align-items: center;
//   border-radius: 7px;
//   justify-content: center;
//   background-Color: rgb(247, 193, 18);
// `


export default Carousel;

