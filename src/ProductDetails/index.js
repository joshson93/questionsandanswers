import React, { useState, useContext, useEffect } from 'react';
import { StateContext } from './../appState/index.js';
import Info from './components/ProductInfo.js';
import Description from './components/ProductDesc.js';
import Features from './components/ProductFeatures.js';
import { FlexRow } from './styles/Flex.styled.js'



function ProductDetails() {
  const [state] = useContext(StateContext);
  // const [, dispatch] = useContext(DispatchContext);
  const [activeProduct, setActiveProduct] = useState(state.details.product);
  const [styles, setStyles] = useState(state.details.styles);

  if (state.dev.logs) {
    console.log('DEV RENDER ProductDetails')
  }

  useEffect(() => {
    setActiveProduct(state.details.product);
    setStyles(state.details.styles);

  }, [state.details, state.currentProduct])


  return (
    <div data-testid="details" >
      <Info product={activeProduct} styles={styles}/>
      <FlexRow>
        <Description product={activeProduct}/>
        <Features product={activeProduct}/>
      </FlexRow>
    </div>);

}

// When page is loaded, call the API on a default product
const detailsStateInit = (productId) => {
  return {
    // API GET request on key, endpoint, params
    product: [`/products/${productId}`, {}],
    styles: [`/products/${productId}/styles`, {}]
  }
}

export default ProductDetails;
export {detailsStateInit};