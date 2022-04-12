



const formatReview = (rawData, extend = false) => {
  var formated = extend ? { ...rawData } : {};
  formated.product_id = rawData.product_id || 1;
  formated.body = rawData.body || 'NO ENTED BOODY';
  formated.rating = rawData.rating || 1;
  formated.recommend = rawData.recommend || false;
  formated.summary = rawData.summary || 'NOT SUMMARY';
  formated.name = rawData.name || "no name";
  formated.email = rawData.email || 'noEmail@gmail.com';
  formated.photos = rawData.photos || [];
  formated.characteristics = rawData.characteristics || {};
  return formated
}


const formatQuestion = (rawData, extend = false) => {
  var formated = extend ? { ...rawData } : {};
  formated.product_id = rawData.product_id || 1;
  formated.body = rawData.body || 'NO Question got ya';
  formated.name = rawData.name || 'No name for me';
  formated.email = rawData.email || 'superValid@gmail.com';
  return formated
}


const formatAnswer = (rawData, extend = false) => {
  var formated = extend ? { ...rawData } : {};
  formated.photos = rawData.photos || [];
  formated.body = rawData.body || 'NO Answer for ya';
  formated.name = rawData.name || 'No name for me';
  formated.email = rawData.email || 'superValid@gmail.com';
  return formated
}


const format = {
  post: {
    review: formatReview,
    question: formatQuestion,
    answer: formatAnswer
  }
};

module.exports = { format }