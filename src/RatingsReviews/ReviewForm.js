import React, { useState, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import styled from 'styled-components';
import api from '../api/index';
import Stars from './Star.js';

export default function ReviewForm(props) {
  const [state] = useContext(StateContext);
  const [overallRating, setOverallRating] = useState();
  const [starClicked, setStarClicked] = useState(false);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [img, setImg] = useState();
  const [recommend, setRecommend] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [c, setC] = useState({});
  const [, dispatch] = useContext(DispatchContext);

  const starDescription = ['Poor', 'Fair', 'Average', 'Good', 'Great'];
  const cSelector = {
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
    Size: [
      'A size too small',
      '½ a size too small',
      'Perfect',
      '½ a size too big',
      'A size too wide',
    ],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too Wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
  };

  const onSubmitHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    // eslint-disable-next-line no-useless-escape
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!overallRating) {
      alert('choose a star rating');
    } else if (body.length < 50) {
      alert('please write more in the body');
    } else if (!recommend) {
      alert('choose to recommend or not');
    } else if (!regex.test(email)) {
      alert('email is in an incorrect format');
    } else {
      var newReview = {
        product_id: state.currentProduct,
        rating: overallRating,
        summary: summary,
        body: body,
        recommend: recommend,
        name: name,
        email: email,
        photos: img,
        characteristics: c,
      };
      api.post
        .review({ typeId: props.id, post: newReview, productId: state.currentProduct })
        .then((res) => console.log('post question res', res))
        .then(() => {
          props.showForm(false);
          setName('');
          setEmail('');
          setBody('');
          api.load.newProduct(state.currentProduct, dispatch);
        })
        .catch((err) => console.log('question not sent!'));
    }
  };
  const setStars = (e) => {
    setOverallRating(Number(e.target.id) + 1);
    setStarClicked(true);
  };

  const onImageChange = (e) => {
    if (e.target.files.length > 5) {
      alert('Only up to 5 files accepted.');
      e.preventDefault();
    } else if (e.target.files.length === 0) {
      setImg(null);
    } else {
      setImg(
        Object.entries(e.target.files).map((file) => {
          return URL.createObjectURL(file[1]);
        })
      );
    }
  };

  const onCChange = (char, value) => {
    var obj = c;
    obj[char] = value;
    setC(obj);
  };
  return (
    <Modal onClick={(e) => e.stopPropagation()}>
      <ReviewFormContainer>
        <form onSubmit={onSubmitHandler}>
          <h1>Write your Review </h1>
          <h2>{`About the ${state.details.product.name}`}</h2>
          <OverallRatingContainer onClick={setStars}>
            Overall Rating:
            <Stars ratingAvg={overallRating} />
            {starClicked && (
              <p>
                {overallRating} star: {starDescription[overallRating - 1]}{' '}
              </p>
            )}
          </OverallRatingContainer>
          <div>
            Do you recommend the Product?
            <input
              type='radio'
              name={`recommend`}
              value='off'
              onChange={(e) => setRecommend(true)}
            />
            Yes
            <input
              type='radio'
              name={`recommend`}
              value='off'
              onChange={(e) => setRecommend(false)}
            />
            No
          </div>

          <div>Characteristics</div>
          <CharacteristicsContainer>
            {Object.entries(state.reviews.meta.characteristics).map((characteristic, id) => {
              return (
                <div key={id}>
                  {characteristic[0]}
                  <div>
                    <input
                      type='radio'
                      name={`${characteristic[0]}`}
                      value='off'
                      onChange={() => onCChange(characteristic[1].id, 1)}
                    />
                    {cSelector[characteristic[0]][0]}
                  </div>
                  <div>
                    <input
                      type='radio'
                      name={`${characteristic[0]}`}
                      value='off'
                      onChange={() => onCChange(characteristic[1].id, 2)}
                    />
                    {cSelector[characteristic[0]][1]}
                  </div>
                  <div>
                    <input
                      type='radio'
                      name={`${characteristic[0]}`}
                      value='off'
                      onChange={() => onCChange(characteristic[1].id, 3)}
                    />
                    {cSelector[characteristic[0]][2]}
                  </div>
                  <div>
                    <input
                      type='radio'
                      name={`${characteristic[0]}`}
                      value='off'
                      onChange={() => onCChange(characteristic[1].id, 4)}
                    />
                    {cSelector[characteristic[0]][3]}
                  </div>
                  <div>
                    <input
                      type='radio'
                      name={`${characteristic[0]}`}
                      value='off'
                      onChange={() => onCChange(characteristic[1].id, 5)}
                    />
                    {cSelector[characteristic[0]][4]}
                  </div>
                </div>
              );
            })}
          </CharacteristicsContainer>
          <input
            type='file'
            id='avatar'
            name='avatar'
            accept='image/png, image/jpeg'
            onChange={onImageChange}
            multiple
          />
          {img &&
            img.map((photo, id) => {
              return <img key={id} src={photo} height='50' width='50' alt='' />;
            })}
          <div>
            User nickname:
            <TextContainer
              type='text'
              placeholder='Example: jackson11!'
              value={name}
              maxlength='60'
              onChange={(e) => setName(e.target.value)}
              required
            />
            <p>For privacy reasons, do not use your full name or email address</p>
          </div>
          <div>
            User e-mail:
            <TextContainer
              type='text'
              placeholder='Example: jackson11@gmail.com'
              value={email}
              maxlength='60'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p>For authentication reasons, you will not be emailed</p>
          </div>
          <ReviewTextContainer>
            <ReviewSummaryTextContainer
              type='text'
              placeholder='Example: Best purchase ever!'
              value={summary}
              maxlength='60'
              onChange={(e) => setSummary(e.target.value)}
              required
            />
            <ReviewBodyContainer
              placeholder='Why did you like the product or not?'
              value={body}
              minlength='50'
              maxlength='1000'
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </ReviewTextContainer>

          {body.length >= 50 ? (
            <div>Minimum Reached</div>
          ) : (
            <div>Minimum required characters left: {50 - body.length}</div>
          )}
          <CenterItemsWrapper>
            <InputSubmit type='submit' />
          </CenterItemsWrapper>
        </form>
      </ReviewFormContainer>
    </Modal>
  );
}

const ReviewFormContainer = styled.div`
  background-color: #f3f3f3;
  border-radius: 5px;
  padding: 20px;
`;
const OverallRatingContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const CharacteristicsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const ReviewSummaryTextContainer = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  height: 30px;
  width: 100%;
`;
const ReviewTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ReviewBodyContainer = styled.textarea`
  resize: none;
  height: 200px;
  width: 100%;
`;
const TextContainer = styled.input`
  height: 30px;
  width: 100%;
`;
const Modal = styled.div`
  position: fixed;
  top: 30vh;
  left: 15%;
  width: 75%;
  z-index: 2;
`;
const InputSubmit = styled.input`
  background-color: #ccc;
  color: black;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const CenterItemsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;
