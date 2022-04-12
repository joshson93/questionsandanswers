import React, { useState, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import moment from 'moment';
import styled from 'styled-components';
import Star from './Star.js';
import api from '../api/index';

const Review = ({review}) => {
  const [fullSummary, setFullSummary] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [state] = useContext(StateContext);
  const [notH,setNotH] = useState(0);
  const [, dispatch] = useContext(DispatchContext);

  const showImg = (photo) => {
      setOpenModal(true);
      setSelectedImage(photo.id)
  }
  const clickedHelpful = (id) => {

      if(!clicked) {
        setClicked(true);
        api.upvote.review({ typeId: id, productId: state.currentProduct })
        .then(() => api.load.newProduct(state.currentProduct, dispatch))
        .catch(err => console.log('problem ',err))
      }
  }
  const clickedNotHelpful = () => {
      setClicked(true);
      setNotH(1);
  }
    return (
    <IndividualReviewContainer>
        <div>By: {review.reviewer_name} | {moment(review.date).format("MMM Do, YYYY")}</div>
        <SummaryContainer>
            <b>{review.summary.substr(0,60)}</b>
            <div>{fullSummary ? review.body : (review.body.substr(0,250))}</div>
            <button hidden={fullSummary || review.body.length <250} onClick={()=>setFullSummary(true)}>show more</button>
        </SummaryContainer>
        {review.recommend.toString() && <div>I recommend this product! &#10003;</div>}
        {review.response && <div>Seller Response: {review.response}</div>}
        {review.photos.map((photo, id) => {
            return(<span key={id}>
                <img key={photo.id} src={photo.url} alt='' height="50" width="50" onClick={() => {showImg(photo)}}/>
                {(openModal && photo.id===selectedImage)&& (<BackDrop onClick={()=>setOpenModal(!openModal)}>  <ImageContainer src={photo.url} alt=''/> </BackDrop>)}
                </span>
            )
        })}
        <Star ratingAvg={review.rating}/>
        <div>
            {clicked? <div>Thank you for the feedback!</div> : <div>Was this review helpful?</div>}
            <span onClick={()=> clickedHelpful(review.review_id)}>Yes({review.helpfulness}) | </span>
            <span onClick={()=> clickedNotHelpful()}>No({notH}) | </span>
        </div>
    </IndividualReviewContainer>
    )
}


const SummaryContainer = styled.div`
    margin-left: 30px;
`

const IndividualReviewContainer = styled.div`
border-bottom: 0.5px solid black;
`
const ImageContainer = styled.img`
max-width: 90%;
max-height: 90%;
`

const BackDrop = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
z-index: 2;
background: rgba(0, 0, 0, 0.90);
`
export default Review;


