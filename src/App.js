import './App.css';
import api from './api/index.js';
import React, { useContext } from 'react';
import styled from 'styled-components';
import Header from './components/Header.js';
import Modal from './components/Modal/index';
import CircularProgress from '@mui/material/CircularProgress';
import { StateContext, DispatchContext } from './appState/index.js';
import ProductDetails, { detailsStateInit } from './ProductDetails/index';
import RatingsReviews, { reviewStateInit, reviewMetaStateInit } from './RatingsReviews/index';
import QAndA, { qAndAStateInit } from './QandA/index';
import RelatedProducts, { relatedStateInit } from './RelatedProducts/index';

api.get.initProductDataFetch(
  detailsStateInit,
  reviewStateInit,
  reviewMetaStateInit,
  qAndAStateInit,
  relatedStateInit
);

const maxApiRequests = 2;
var renderCount = 0;
var requestCount = 0;

function App() {
  const [, dispatch] = useContext(DispatchContext);
  const [state] = useContext(StateContext);
  renderCount++;

  if (state.dev.logs) {
    // Used to see preformance and data flow
    state.dev.renders && console.log('\n\nDEV  RENDER   App     number of renders: ', renderCount);
    state.dev.state && console.log('DEV  App STATE: ', state);
  }
  if (state.dev.test) {
    // Gives tests access to state while running
    state.dev.get(state);
  }
  if (!state.details.product) {
    if (maxApiRequests > requestCount) {
      requestCount++;
      initializeAppState(state.currentProduct, dispatch);
      return (
        <LoadingContainer className='App' data-testid='app'>
          <LoadingScreen>
            <LoadingText>
              <CircularProgress />
            </LoadingText>
          </LoadingScreen>
        </LoadingContainer>
      );
    } else {
      return (
        <LoadingContainer className='App' data-testid='app'>
          <LoadingScreen>
            <LoadingText>404 Not Found</LoadingText>
          </LoadingScreen>
        </LoadingContainer>
      );
    }
  } else {
    requestCount = 0;

    return (
      <AppContainer className='App' data-testid='app'>
        {/* <Modal />
        <Header />
        <ProductDetails />
        <RelatedProducts /> */}
        <QAndA />
        {/* <RatingsReviews reviewData={state.reviews} reviewMeta={state.reviewMeta} dev={state.dev} /> */}
      </AppContainer>
    );
  }
}

const appBackgroundColor = [250, 250, 250];

const AppContainer = styled.div`
  width: 100%;
  background-color: rgb(${appBackgroundColor.toString()});
`;
const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(${appBackgroundColor.toString()});
`;

const loadingBackgroundColor = [240, 240, 240];
const LoadingScreen = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  /* background-color: rgb(${loadingBackgroundColor.toString()}); */
`;
const textColor = [60, 60, 60];
const LoadingText = styled.h1`
  color: rgb(${textColor.toString()});
`;

const initializeAppState = (productId, dispatch) => {
  return api.get
    .allProductData(productId)
    .then((response) => {
      response.currentProduct = productId;
      dispatch({
        type: 'PROD_INIT',
        payload: response,
      });
    })
    .catch((err) => {
      console.log('Data init fetch error: ', err);
      dispatch({ type: '' }); //sets state so that the app rerenders and trys again.
    });
};

export default App;
