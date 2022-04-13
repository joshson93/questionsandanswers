import React from 'react';

function ProductFeatures(props) {
  if (props.product) {
    if (props.product.features) {
      const features = props.product.features.map((feature, index) => <p key={index}>{feature.feature}:
        {feature.value}</p>
      )

      return(<div>
        <aside>
          <h3>Features:</h3>
          {features}
        </aside>
      </div>)
    }

  } else {
    return <p>loading</p>
  }
}

export default ProductFeatures;