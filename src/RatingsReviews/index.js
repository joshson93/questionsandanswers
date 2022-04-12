import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import ReviewForm from './ReviewForm.js';
import Rating from './Rating.js';
import Review from './Review.js';

var mainRenderCount = 0;

export default function RatingsReviews({reviewData, reviewMeta, dev}) {
  const {results} = reviewData;
  if( dev.logs ) {
    mainRenderCount++;
    dev.renders && console.log('DEV  RENDER   RelatedProducts     number of renders: ', mainRenderCount)
    dev.state && console.log('DEV  STATE   RelatedProducts: ', reviewData)
  }

  const [sortSelect,setSortSelect] = useState('relevant');
  const [sortedReviews, setSortedReviews] = useState(results);
  const [diplayedReviewCount, setReviewCount] = useState(2);
  const [openModal, setOpenModal] = useState(false);
  const [keyword, setKeyword] = useState('');

  useEffect(()=> {
    var newSorted;
    if(sortSelect === "helpful") {
      newSorted = results.sort((a,b) => b.helpfulness - a.helpfulness);
    } if(sortSelect === "newest") {
      newSorted = results.sort((a,b) => new moment(b.date).valueOf() - new moment(a.date).valueOf());
    } if(sortSelect === 'relevant') {
      newSorted = results.sort((a,b) => relevantSort(a,b));
    }
    setSortedReviews([...newSorted])
  },[sortSelect, results ])

  const relevantSort = (a,b) => {
    var cmp = b.helpfulness - a.helpfulness;
    if(Math.abs(cmp) <=7) {
       return new moment(b.date).valueOf() - new moment(a.date).valueOf();
    } else return cmp;
  }

  if(reviewData) {
    return (
      <RatingsReviewsContainer data-testid="reviews" >
        <Rating data={reviewMeta}/>
        <ReviewsListContainer>
          <div>
            {results.length} reviews sorted by
            <select value={sortSelect} onChange={(e) => setSortSelect(e.target.value) }>
              <option value="newest">newest</option>
              <option value="helpful">Helpfulness</option>
              <option value="relevant">Relevance</option>
            </select>
          </div>
          <SearchReviews type='search' value={keyword} onChange={(e)=>{setKeyword(e.target.value)}} placeholder='Search For a Review'/>
          <InnerListContainer>
          {sortedReviews.filter(item => {
            if(keyword.length >= 3) {
              const entries = Object.entries(item);
              return entries.some(entry=>entry[1]?entry[1].toString().toLowerCase().includes(keyword.toLowerCase()):false);
            } else return item
          }).slice(0,diplayedReviewCount).map((review,id) => {return (<Review key={id} review={review} />)})}
         </InnerListContainer>
          {(results.length-diplayedReviewCount >0) && (<button onClick={()=> setReviewCount(results.length)}>More Reviews</button>)}
          <button onClick={() => {setOpenModal(true)}}>Add a Review</button>
          {openModal && (<BackDrop onClick={()=>setOpenModal(!openModal)}><ReviewForm /></BackDrop>)}
        </ReviewsListContainer>
      </RatingsReviewsContainer>
    )
  }
  return (
    <div data-testid="reviews" >
      Loading...
    </div>
  )
}


  const RatingsReviewsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: auto;
  `
  const ReviewsListContainer =styled.div`
  display: flex;
  width: 66%;
  flex-direction: column;
  max-height: 600px;
  padding-bottom:2%;
  `
  const InnerListContainer=styled.div`
  display: flex;

  flex-direction: column;
  overflow: auto;

  `
  const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1.5;
  background: rgba(0, 0, 0, 0.75);
`
const SearchReviews = styled.input`
  border: 2px solid black;
  display: block;
  margin-top: 25px;
  padding: 15px;
  width: 50%;
  font-size: 20px;
`
