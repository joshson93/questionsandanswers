import React from "react";
import ReactDOM from 'react-dom/client'

import {  screen, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/user-event';
import App from '../App.js';
import AppContextProvider from '../appState/index.js';
/*global globalThis */
/*eslint no-undef: "error"*/
globalThis.IS_REACT_ACT_ENVIRONMENT = true;



afterEach(() => {
  cleanup()
})

const savedValues = {};

const setter = (appState) => {

  if (appState.details.product) {
    savedValues.loaded = appState
  } else {
    savedValues.empty = appState
  }
}


const initPageState = {
  dev: { test: true, logs: false, renders: true, state: true, reducer: true, get:setter},
  modal: { comparison: false },
  user: { cart:[], outfit: [] },
  currentProduct: 37311,
  QA: {},
  details: {},
  related: {},
  reviews: {},
};


//  removeChild(child);



describe('App initialization', () => {

  it('Should render the App to the screen.', async () => {

    act(() => {
      const Stack = (<AppContextProvider passedState={initPageState}  ><App/></AppContextProvider> )
      const root = document.createElement("div");
      document.body.appendChild(root);
      ReactDOM.createRoot(root).render(Stack)
    });

    const main = await screen.findByTestId('app')
    expect(main).toBeInTheDocument();

    })


  it('Should render all four modules to the screen.', async () => {

    const dets = screen.getByTestId('details')
    expect(dets).toBeInTheDocument();
    const related = screen.getByTestId('related')
    expect(related).toBeInTheDocument();
    const QandA = screen.getByTestId('QandA')
    expect(QandA).toBeInTheDocument();
    const reviews = screen.getByTestId('reviews')
    expect(reviews).toBeInTheDocument();

  })


  it('Should load an inital state.', () => {

    expect(savedValues.empty).toBeDefined();

  })



  it('Should fetch product data and update state within a second of first render.', async () => {

    function sleep(period) {
      return new Promise(resolve => setTimeout(resolve, period));
    }


    if(savedValues.loaded) {
      expect(savedValues.loaded.details.product.id).toBe(initPageState.currentProduct)
    } else {
      await act(async () => {
        await sleep(850); // wait *just* a little longer than the timeout in the component
      });
      var tested = savedValues.loaded.details.product.id || 0;
      expect(tested).toBe(initPageState.currentProduct)
    }

  })
})











describe('Product Details', () => {


  it('Should be on the screen.',  async () => {

    const dets = screen.getByTestId('details')
    expect(dets).toBeInTheDocument()

  })


  it('Should render the Name of the product.',  async () => {

    const name = /camo onesie/i
    const prodName = await screen.findByText(name)
    expect(prodName).toBeInTheDocument()


  })

  it('Should render the price of the product.',  async () => {

    const price = /\$140.00/
    const prodPrice = await screen.findByText(price)
    expect(prodPrice).toBeInTheDocument()

  })

  it('Should render the category of the product.',  async () => {

    const category = /jackets/i
    const prodCategory = await screen.findByText(category)
    expect(prodCategory).toBeInTheDocument()

  })




  it('Should render the description of the product.',  async () => {

    const desc = /blend in to your crowd/i
    const prodDesc = await screen.findByText(desc)
    expect(prodDesc).toBeInTheDocument()

  })


  // it('Should render the styles of the product.',  async () => {

  //   const first = /.+forest green & black.+/i
  //   const middle = /.+ocean Blue & Grey.+/i
  //   const last = /.+dark Grey & Black.+/i

  //   const firstNode = await screen.findByText(first)
  //   const middleNode = await screen.findByText(middle)
  //   const lastNode = await screen.findByText(last)

  //   expect(firstNode).toBeInTheDocument()
  //   expect(middleNode).toBeInTheDocument()
  //   expect(lastNode).toBeInTheDocument()

  // })


})
















describe('Questions and Answers', () => {


  it('Should be on the screen.',  async () => {

    const QandA = screen.getByTestId('QandA')
    expect(QandA).toBeInTheDocument()


  })


  it('Should render the first 2 questions.',  async () => {

    const q1 = /Is this a good oneise?/i
    const q2 = /bew/

    const q1Node = await screen.findByText(q1)
    const q2Node = await screen.findByText(q2)
    expect(q1Node).toBeInTheDocument()
    expect(q2Node).toBeInTheDocument()

  })


  it('Should have mark helpful buttons.',  async () => {

    const helpful = /helpful/i

    const helpfulNodes = await screen.findAllByText(helpful)
    expect(helpfulNodes[0]).toBeInTheDocument()
    expect(helpfulNodes.length).toBe(2)

  })


  it('Should have report buttons.',  async () => {

    const report = /report/i

    const reportNodes = await screen.findAllByText(report)
    expect(reportNodes[0]).toBeInTheDocument()
    expect(reportNodes.length).toBe(2)

  })


  it('Should have add answer buttons.',  async () => {

    const aaText = /add answer/i

    const addNodes = await screen.findAllByText(aaText)
    expect(addNodes[0]).toBeInTheDocument()
    expect(addNodes.length).toBe(2)

  })


  it('Should have a method to see more questions.',  async () => {

    const moreText = /more answered questions/i

    const moreAnswerNodes = await screen.findByText(moreText)
    expect(moreAnswerNodes).toBeInTheDocument()

  })



  it('Should have a method add a question.',  async () => {

    const addQText = /add a question/i

    const addQNodes = await screen.findByText(addQText)
    expect(addQNodes).toBeInTheDocument()

  })

})











describe('Product Reviews', () => {


  it('Should be on the screen.',  async () => {

    const reviews = screen.getByTestId('reviews')
    expect(reviews).toBeInTheDocument()


  })



})





















describe('Related Products', () => {


  it('Should be on the screen.',  async () => {
    function sleep(period) {
      return new Promise(resolve => setTimeout(resolve, period));
    }
    await act(async () => {
      await sleep(700);
    });

    const related = screen.getByTestId('related')
    expect(related).toBeInTheDocument()


  })


  it('Should fetch the data and render the names of related products.',  async () => {

    const blueShoes = /Blues Suede Shoes/i
    const yeazy = /YEasy 350/
    const joggers = /Morning Joggers/i
    const sunnies = /Bright Future Sunglasses/i


    const relatedBlueShoes = await screen.findByText(blueShoes)
    const relatedYeazy = await screen.findByText(yeazy)
    const relatedJoggers = await screen.findByText(joggers)
    const relatedSunnies = await screen.findByText(sunnies)
    expect(relatedBlueShoes).toBeInTheDocument()
    expect(relatedYeazy).toBeInTheDocument()
    expect(relatedJoggers).toBeInTheDocument()
    expect(relatedSunnies).toBeInTheDocument()

  })


  it('Should have an add to outFit button.',  async () => {

    const relatedOutfit = await screen.findAllByTestId('outfit')
    expect(relatedOutfit[0]).toBeInTheDocument()
    expect(relatedOutfit.length).toBe(4)

  })


  it('Should have a navigate to new product method.',  async () => {

    const relatedNav = await screen.findAllByTestId('nav')
    expect(relatedNav[0]).toBeInTheDocument()
    expect(relatedNav.length).toBe(4)

  })


})




