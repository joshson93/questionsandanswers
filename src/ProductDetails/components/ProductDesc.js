import React from 'react';
import { StyledDescriptionContainer } from './../styles/DescFeatures.styled.js'

function ProductDescription(props) {
  if (props.product) {

      const slogan = props.product.slogan || 'Description'
      const description = props.product.description || ''

      return(<StyledDescriptionContainer>
        <h3>{slogan}</h3>
        <p>{description}</p>
      </StyledDescriptionContainer>)

  } else {
    return <p>loading</p>
  }
}

export default ProductDescription;