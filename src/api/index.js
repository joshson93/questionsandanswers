import get from './get.js';
import post from './post.js';

const api = { get, post };

Promise.all.obj = (asyncObj) => {
  const promiseArray = [];
  const indToKey = Object.keys(asyncObj).map((key, ind) => {
    promiseArray.push(asyncObj[key]);
    return key;
  });
  return Promise.all(promiseArray)
    .then((allRes) =>
      allRes.reduce((memo, result, ind) => {
        memo[indToKey[ind]] = result;
        return memo;
      }, {})
    )
    .catch((err) => {
      console.log('Promise.all.obj err', err);
      console.log('input obj', asyncObj);
    });
};

export default api;

// const productId = 37311;
// const testObj = {
//   product: [`/products/${productId}`, {}],
//   styles: [`/products/${productId}/styles`, {}]
// }
// const testArray = [
//    [`/products/${productId}`, {}],
//    [`/products/${productId}/styles`, {}]
// ]

// get.all(testObj)
// .then(objRes => console.log('objRes', objRes))

// get.all(testArray)
// .then(ArrayRes => console.log('ArrayRes', ArrayRes))
