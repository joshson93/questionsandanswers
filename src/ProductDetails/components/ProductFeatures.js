import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { StyledFeaturesContainer } from './../styles/DescFeatures.styled.js'

function ProductFeatures(props) {
  if (props.product) {
    if (props.product.features) {
      const features = props.product.features.map((feature, index) => <p key={index}><FontAwesomeIcon icon={faCircleCheck} style={{paddingRight: '1em'}}/> <strong>{feature.feature}</strong>:
        {' ' + feature.value.toLowerCase()}</p>
      )

      return(<StyledFeaturesContainer>
          {features}
      </StyledFeaturesContainer>)
    }

  } else {
    return <p>loading</p>
  }
}

export default ProductFeatures;