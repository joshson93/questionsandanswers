

const { request } = require('./request')

const get = request.get


const getAllObj = (allGetOptions) => {

  const Promisified = Object.keys(allGetOptions).reduce((memo, key) => {
    let getOptions = allGetOptions[key];
    let newPromise = Array.isArray(getOptions) ? get(...getOptions) : getAllObj(getOptions)
    memo[key] =  newPromise
    return memo
  }, {})

  return Promise.all.obj(Promisified)
    .catch(err => {
      console.log('GET getAllObj fetch err ', err)
      console.log('input obj ', allGetOptions)
    })
}

const getAllArray = (allGetOptions) => {
  const getPromises = allGetOptions.map((getOptions) => get(...getOptions))
  return Promise.all(getPromises)
    .catch(err => {
      console.log('GET getAllArray fetch err ', err)
      console.log('input array ', allGetOptions)
    })
}




const getAll = (allGetOptions) => {
  let getAllFunc = Array.isArray(allGetOptions) ? getAllArray : getAllObj
    return getAllFunc(allGetOptions)
      .catch(err => {
        console.log('GET all fetch err ', err)
        console.log('GET all input ', allGetOptions)
      })
}



// related [`/products/${productId}/related/`, {}]
// rating {
//     'meta':['/reviews/meta', { product_id: productId }],
//     'reviews': ['/reviews/', { product_id: productId, page: 1, count:20, sort: 'newest' }]
//   }
// QA ['/qa/questions/', { product_id: productId, count: 500 }]
// details  {
//     product: [`/products/${productId}`, {}],
//     styles: [`/products/${productId}/styles`, {}]
//   }



const getAllProductDataEndpoints = (productId) => {
  return {
    details: {
      product: [`/products/${productId}`, {}],
      styles: [`/products/${productId}/styles`, {}]
    },
    reviews: {
      'meta':['/reviews/meta', { product_id: productId }],
      'reviews': ['/reviews/', { product_id: productId, page: 1, count:20, sort: 'newest' }]
    },
    QA: ['/qa/questions/', { product_id: productId, count: 500 }],
    related: [`/products/${productId}/related/`, {}],
  }
}


const getProductData = (productId, endpointKeys = []) => {
    let newEndpoints = getAllProductDataEndpoints(productId)
    newEndpoints = endpointKeys.reduce((memo, key) => ({ ...memo, [key]: newEndpoints[key] }), {})
    return getAll(newEndpoints)
}



get.all = getAll
get.productData = getProductData



module.exports = { get }