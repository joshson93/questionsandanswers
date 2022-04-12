


const cachedLogs = false // true will turn on all logs to the cache



const cleanup = (key, timeToCleanup, store) => {
  setTimeout(() => {
    cachedLogs && console.log('deleted from cache ', key, timeToCleanup)
    delete store[key]
  }, timeToCleanup)

}

const getKey = (options) => {

  var key = options.url;


  if (options.params.product_id ) {
    // const checkKey = /(questions)||(answers)/i
    const foundQA = key.includes('question') || key.includes('answer');
    if (foundQA) {
      key = '/qa/questions/'
    }


    const foundReview = key.includes('reviews') && !key.includes('meta')
    if (foundReview) {
      key = '/reviews/'
    }

    const foundMeta = key.includes('meta')
    if (foundMeta) {
      key = '/reviews/meta/'
    }

    key += options.params.product_id
  }

  if (options.data && options.data.product_id) {

    const foundQA = key.includes('question') || key.includes('answer') ;
    if (foundQA) {
      key = '/qa/questions/'
    }

    const foundReview = key.includes('reviews') && !key.includes('meta')
    if (foundReview) {
      key = '/reviews/'
    }

    const foundMeta = key.includes('meta')
    if (foundMeta) {
      key = '/reviews/meta/'
    }


    key += options.data.product_id
  }

  //  const checkKey = /(\/reviews\/)||(\/qa\/questions)/i
  return key
}

const minute = 60 * 1000;
const baseTime = 2 * minute

const QuickCache = (maxStoreTime = baseTime) => {
  const instance = { maxStoreTime };
  instance.store = {}

  instance.add = (options, value) => {
    const key = getKey(options)
    const createdAt = Date.now()
    instance.store[key] = { value, createdAt }
    cachedLogs && console.log('added to cache ', key, instance.store)
    cleanup(key, instance.maxStoreTime, instance.store)
  }

  instance.check = (options, promise = true) => {
    const key = getKey(options)
    if (instance.store[key]) {
      const cachedData = instance.store[key].value;
      cachedLogs && console.log('fetched from cache ', key)
      if (promise) {
        return new Promise((res, rej) => res(cachedData))
      }
      return cachedData
    }
    return null;
  }

  instance.remove = (options) => {
    // console.log(instance.store)
    // const keyMatch = key.match(checkKey)
    // console.log('POST OPTIONS', options)
    const key = getKey(options)
    // console.log(options.url)
    // console.log(key)
    delete instance.store[key]
    cachedLogs && console.log('removed from cache ', key)
    // console.log(instance.store)
  }

  return instance;
}

module.exports = { QuickCache }