
import api from '../api/index.js';





export const initializeAppState = (dispatch, prodId) => {
  api.get.allProductData(prodId)
    .then((response) => {
      response.currentProduct = prodId
      dispatch({
        type: 'PROD_INIT',
        payload: response,
      });
    });
}



const getPhotoUrls = (styles) => {
  return styles.results.reduce((memo, data) => {
    if (data.photos[0].url) {
      memo.push(...data.photos)
    }
    return memo
  }, [])
}





const getProductEndpoints = (productIds) => {
  return productIds.reduce((memo, prodId) => {
    memo[prodId] = {
      product: [`/products/${prodId}`, {}],
      styles: [`/products/${prodId}/styles`, {}]
    }
    return memo
  }, {})
}



export const initProductsFromIds = (productIds, currentProduct, setItemData, filterCurrentProduct = true) => {
  if (filterCurrentProduct) {
    productIds = productIds.filter((id, ind) =>  productIds.slice((ind + 1)).indexOf(id) === -1 && id !== currentProduct && id)
  } else {
    productIds = productIds.filter((id, ind) =>  productIds.slice((ind + 1)).indexOf(id) === -1 && id)
  }

  const endpoints = getProductEndpoints(productIds)
  api.get.all(endpoints)
    .then((getResult) => {
      const condensed = Object.values(getResult).map((values) => {
        var photos = getPhotoUrls(values.styles)
        return ({ ...values.product, photos, type: 'render' })
      })
      setItemData(condensed)
      })
}

