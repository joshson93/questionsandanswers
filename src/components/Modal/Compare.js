import React, { useContext } from 'react';
import { StateContext, DispatchContext } from '../../appState/index';
import styled, { css } from 'styled-components';
import { toggleModal } from './methods.js'



const CompareModal = ({ newProduct }) => {
  const [state] = useContext(StateContext)
  const [, dispatch] = useContext(DispatchContext)
  const [newProductActionText, newProductAction] = getProductAction(state.user.outfit, newProduct.id, dispatch)
  const [curProductActionText, curProductAction] = getProductAction(state.user.outfit, state.currentProduct, dispatch)


  const currentProduct = { ...state.details.product, ...state.details.styles };
  const renderData = getRenderedValues(currentProduct, newProduct)
  const names = [currentProduct.name, 'vs', newProduct.name]
  const longestFeature = findLongestFeature( [ names, ...renderData] )
  const longestFeatures = [longestFeature, '-', longestFeature]
  const columnAlign = ['flex-start', 'center', 'flex-end']

  return (
    <CompareContainer>
      <ColumnContainer>
        {columnAlign.map((position, ind) => (
        <CompareColumn key={position}  position={position} >
          <CompareColumnName>
            {names[ind]}
          </CompareColumnName>
          <CompareColumnEqualizers>
            {longestFeatures[ind]}
          </CompareColumnEqualizers>
          {renderData.map((data, jInd) => <CompareBody key={jInd} > {data[ind] ? data[ind] : '-' } </CompareBody>)}
        </CompareColumn>
        ))}
      </ColumnContainer>
      <CompareFooter>
        <FooterButton
          onClick={curProductAction}
          >{curProductActionText}
        </FooterButton>
        <FooterButton onClick={(e) => toggleModal(dispatch)} >close</FooterButton>
        <FooterButton
          onClick={newProductAction}
          >{newProductActionText}
        </FooterButton>
      </CompareFooter>
    </CompareContainer>
  )
};


const getProductAction = (currentOutFit, productId, dispatch) => {
  const notInOutfit = checkIfNotInOutfit( currentOutFit, productId )
  const outfitAction = notInOutfit ? addToOutfit : removeFromOutfit
  const outfitActionText = notInOutfit ? 'Add to outfit' : 'Remove from outfit'
  return [outfitActionText, outfitAction(currentOutFit, productId, dispatch)]
}

const checkIfNotInOutfit = (currentOutFit, newProductId) => {
  let notInOutfit = true;
  if ( currentOutFit.length) {
    notInOutfit = currentOutFit.every(productId => productId !== newProductId)
  }
  return notInOutfit
}

const addToOutfit = (currentOutFit, newProductId, dispatch) => {
  return () => {
    dispatch({ type: 'SET_OUTFIT', payload: [newProductId, ...currentOutFit] })
  }
}

const removeFromOutfit = (currentOutFit, newProductId, dispatch) => {
  return () => {
    dispatch({ type: 'SET_OUTFIT', payload: currentOutFit.filter(productId => productId !== newProductId ) })
  }
}


const findLongestFeature = (renderedFeatures) => {
  return renderedFeatures.reduce((currentLongest, newFeatures) => {
    newFeatures.forEach((feature, ind) => {
      if (typeof(feature) === 'string') {
        currentLongest = currentLongest.length > feature.length ? currentLongest : feature
      }
    })
    return currentLongest;
  }, '')

}


const findMatchingFeatures = (productA, productB) => {
  return  productA.features.map(( aVals ) => {
    const { feature, value } = aVals;
    const matchingFeatures = productB.features.filter((bVals) =>  bVals.feature === feature)
    return matchingFeatures.length ? [ value, feature,  matchingFeatures[0].value] : [ value, feature, null]
  })
}

const getFeatures = (productA, productB) => {
  const matchB = findMatchingFeatures(productA, productB)
  const matchA = findMatchingFeatures(productB, productA)
  return matchA.reduce((memo, Afeatures) => {
    const found = memo.some(Bfeatures => Bfeatures[1] === Afeatures[1])
    !found &&  memo.push(Afeatures.reverse())
    return memo
  }, matchB)

}

const getRenderedValues = (productA, productB) => {
  const categoryData = [productA.category, 'category',  productB.category]
  const priceData = [ '$' + productA.default_price, 'price', '$' + productB.default_price]
  const styleData = [productA.results.length, 'style options',  productB.results.length]
  const featureData = getFeatures(productA, productB)
  return [ categoryData, priceData, styleData, ...featureData]
}


const CompareContainer = styled.div`
  padding: 2em;
  display: flex;
  border-radius: 3px;
  flex-direction: column;
  background-Color:  var(--contain-bgc);
`

const ColumnContainer = styled.div`
  gap: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CompareColumn = styled.div`
  gap: 0.75em;
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ position }) => css`${position}`};
`

const CompareColumnName = styled.h2`
  color: var(--header-fc);
`
const CompareColumnEqualizers = styled.div`
  opacity: 0;
  font-size: var(--body-fs);
  padding-left: 0.4em;
  padding-right: 0.4em;
  pointer-events: none;
`

const CompareBody = styled.p`
  color: var(--body-fc);
  font-size: var(--body-fs);
`

const CompareFooter = styled.div`
  width: 100%;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const FooterButton = styled.button`
  min-width: 25%;
  padding: 0.5em;
  color: var(--body-fc);
  font-size: var(--body-fs);
  background-color: var(--element-bgc);

  &:hover {
    cursor: pointer;
    background-color: var(--main-bgc);
  }

  &:active {
    cursor: pointer;
    background-color: var(--contain-bgc);
  }
`

export default CompareModal




