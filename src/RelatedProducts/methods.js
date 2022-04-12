
import api from '../api/index.js';





const getPhotoUrls = (styles) => {
  return styles.results.reduce((memo, data) => {
    if (data.photos[0].url) {
      memo.push(...data.photos)
    }
    return memo
  }, [])
}



const getProductParams = (productIds) => {
  return productIds.map(productId => ['product/data', { productId, endpoints: 'details' }] )
}



export const initProductsFromIds = (productIds, currentProduct, setItemData, filterCurrentProduct = true) => {
  if (filterCurrentProduct) {
    productIds = productIds.filter((id, ind) =>  productIds.slice((ind + 1)).indexOf(id) === -1 && id !== currentProduct && id  && id !== 37312)
  } else {
    productIds = productIds.filter((id, ind) =>  productIds.slice((ind + 1)).indexOf(id) === -1 && id && id !== 37312)
  }

  const endpoints = getProductParams(productIds)
  api.get.all(endpoints)
    .then((getResult) => {
      const condensed = getResult.map(({ details }) => {
        var photos = getPhotoUrls(details.styles)
        return ({ ...details.product, ...details.styles, photos, type: 'render' })
      })
      setItemData(condensed)
      })
}

