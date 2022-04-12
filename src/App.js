import api from './api/index.js';
import React, { useContext } from 'react';
import styled from 'styled-components';
import Header from './components/Header.js';
import Modal from './components/Modal/index';
import { StateContext, DispatchContext } from './appState/index.js';
import QAndA from './QandA/index';

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
      api.load.newProduct(state.currentProduct, dispatch);
      return (
        <LoadingContainer className='App' data-testid='app'>
          <LoadingScreen>
            <LoadingText>Loading...</LoadingText>
          </LoadingScreen>
        </LoadingContainer>
      );
    } else {
      return (
        <LoadingContainer className='App' data-testid='app'>
          <LoadingScreen>
            <LoadingText>404 not found</LoadingText>
          </LoadingScreen>
        </LoadingContainer>
      );
    }
  } else {
    requestCount = 0;

    return (
      <AppContainer className='App' data-testid='app'>
        {/* <Modal />
        <Header /> */}
        {/* <ProductDetails />
        <RelatedProducts  /> */}
        <QAndA />
        {/* <RatingsReviews reviewData={state.reviews.reviews} reviewMeta={state.reviews.meta} dev={state.dev} /> */}
      </AppContainer>
    );
  }
}

const AppContainer = styled.div`
  width: 100%;
  background-color: var(--main-bgc);
`;
const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--contain-bgc);
`;

const LoadingScreen = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: var(--main-bgc);
`;
const LoadingText = styled.h1`
  /* color: var(--bgc2); */
`;

export default App;
