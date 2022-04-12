
const { request } = require('./request');

const post = request.post



const postReview = (postData, currentId) => {
  return post('/reviews', {product_id: currentId}, postData,  'POST', 'review')
}

const postReviewAction = (reveiwId, currentId, action = 'helpful' ) => {
  const endpoint = `/reviews/${reveiwId}/${action}`
  return post(endpoint, {product_id: currentId}, {}, 'PUT')
}

postReview.report = ((prodId, currentId) => postReviewAction(prodId, currentId, 'report'))
postReview.helpful = postReviewAction






const postQuestion = (qestionData, currentId) => {
  return post('/qa/questions', {product_id: currentId}, qestionData, 'POST', 'question')
}

const postQuestionAction = (questionId, currentId,  action = 'helpful' ) => {
  const endpoint = `/qa/questions/${questionId}/${action}`
  return post(endpoint, {product_id: currentId}, {}, 'PUT')
}

postQuestion.report = ((qId, currentId) => postQuestionAction(qId, currentId, 'report'))
postQuestion.helpful = postQuestionAction





const postAnswer = (answerData, currentId, questionId) => {
  const endpoint = `/qa/questions/${questionId}/answers`
  return post(endpoint,  {product_id: currentId}, answerData, 'POST', 'answer')
}

const postAnswerAction = (answerId, currentId,  action = 'helpful' ) => {
  const endpoint = `/qa/answers/${answerId}/${action}`
  return post(endpoint, {product_id: currentId}, {}, 'PUT')
}


postAnswer.report = ((aId , currentId) => postAnswerAction(aId, currentId, 'report'))
postAnswer.helpful = postAnswerAction







post.question = postQuestion
post.answer = postAnswer
post.review = postReview

module.exports = { post }







// var testPost = {
//   product_id: 37311,
//   body: 'Dope af dood. Def recommend this. Just trying to make sure length isnt like a thing so this is a long post.',
//   rating: 4,
//   recommend: true,
//   summary: 'Dope',
//   name: 'Yann',
//   email: 'sup@gmail.com',
//   photos: [],
//   characteristics: {},
// }

// post.post('/reviews', {}, testPost)
//   .then((postRes) => console.log('post res', postRes))

// fetch(baseUrl + '/reviews', {
//   method: 'POST',
//   headers: {
//     ...headers,
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(testPost)
// })
// .then((res) => console.log('fetch res ', res))
// .catch(err => console.log('API fetch err: ', err))