import React from 'react';

function ProductDescription(props) {
  if (props.product) {

      const slogan = props.product.slogan || 'Description'
      const description = props.product.description || ''

      return(<div>
        <h3>{slogan}</h3>
        <p>{description}</p>
      </div>)

  } else {
    return <p>loading</p>
  }
}

export default ProductDescription;