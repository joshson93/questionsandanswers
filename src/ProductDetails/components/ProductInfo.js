import React, {useState, useEffect, useRef, useContext} from "react";
// import { Link, BrowserRouter } from 'react-router-dom';
import Carousel from './ProductCarousel.js';
import { DispatchContext } from './../../appState/index.js';
import { FlexRow, FlexColumn } from './../styles/Flex.styled.js'
import { StylesImages, StylesContainer } from './../styles/Styles.styled.js'
import StyledSizeQty from './../styles/SizeQty.styled.js'
import { StyledOverviewContainer, StyledPrice, StyledCurrentStyle, StyledCategory, StyledReviews } from './../styles/Overview.styled.js'
import { StyledExpandedViewContainer, StyledExpandedViewModal, StyledDotImage, ZoomedImage, ExpandedViewImage } from './../styles/ExpandedCarouselView.styled.js';
// import './../styles/magnifier.css';
import _ from 'underscore';
import Stars from './../styles/Star.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import Magnifier from "react-magnifier";

function ProductInfo(props) {
  const [activeStyle, setActiveStyle] = useState({});
  const [skus, setSkus] = useState([]);
  const [availableQty, setAvailableQty] = useState(0);
  const [isAddCartValid, setIsAddCartValid] = useState(true);
  const [salePrice, setSalePrice] = useState(null);
  const selectedSize = useRef('default');
  const selectedQuantity = useRef(0);
  const [expandedViewImage, setExpandedViewImage] = useState(null);
  const [expandedViewIndex, setExpandedViewIndex] = useState(null);
  const [showExpandedView, setShowExpandedView] = useState(false);
  const [zoomView, setZoomView] = useState(false);
  const [, dispatch] = useContext(DispatchContext);

  const handleSizeDuplicates = (originalSkus) => {
    const sizeDuplicates = originalSkus.reduce((allSkus, currentSku) => {
      const size = currentSku.size;
      const quantity = currentSku.quantity;
      if (!allSkus[size]) {
        allSkus[size] = quantity;
      } else {
        allSkus[size] += quantity;
      }

      return allSkus;
    }, {});
    return sizeDuplicates;
  }

  // Triggered when the whole product changes
  useEffect(() => {
    if (props.styles) {
      setActiveStyle(props.styles.results[0]);
      if (!props.styles.results.skus) {
        setSkus(['OUT OF STOCK']);
      }
      const initialSkus = handleSizeDuplicates((Object.values(props.styles.results[0].skus)));
      setSkus(Object.entries(initialSkus));
      setExpandedViewIndex(0);
      setExpandedViewImage(props.styles.results[0].photos[0].url)
    }
  }, [props.styles])

  // Triggered when the active style changes
  useEffect(() => {
    if (activeStyle.name) {
      const newSkus = handleSizeDuplicates((Object.values(activeStyle.skus)));
      setSkus(Object.entries(newSkus));

      setSalePrice( activeStyle.sale_price || null );
    }
  }, [activeStyle])

  useEffect(() => {
    if (activeStyle.photos) {
      setExpandedViewImage(activeStyle.photos[expandedViewIndex]['url']);
    }
  }, [expandedViewIndex, activeStyle])


  if (activeStyle.name) {
    const {name, category} = props.product;

    const handleSelectedStyle = (e, style) => {
      setActiveStyle(style);
    }

    const allStyles = props.styles.results.map(style =>
      <StylesImages src={style.photos[0].thumbnail_url} alt={style.name} key={style.style_id} active={style.name === activeStyle.name} onClick={(e) => handleSelectedStyle(e, style)}/>
    )

    const availableSizes = skus.map((sku, index) =>
      <option key={index} value={sku[0]}>{sku[0]}</option>
    )

    const onSizeChange = (e) => {
      const selectedSizeIndex = e.target.options.selectedIndex - 1;

      if (selectedSizeIndex === -1) {
        setAvailableQty(0);
      } else if (skus[selectedSizeIndex][1] > 15) {
        setIsAddCartValid(true);
        setAvailableQty(15);
      } else {
        setIsAddCartValid(true);
        setAvailableQty(skus[selectedSizeIndex][1]);
      }
    }

    const availableQuantities = (_.range(1, availableQty + 1)).map((qty, index) =>
      <option key={index} value={qty}>{qty}</option>
    )

    const defaultQty = <option value="none">-</option>;

    const handleAddToCart = () => {
      if (selectedSize.current.value !== 'default') {
        dispatch({
          type: 'ADD_PRODUCT_TO_CART',
          payload: {
            style: activeStyle.name,
            size: selectedSize.current.value,
            quantity: selectedQuantity.current.value,
          }
        })
      } else {
        selectedSize.current.focus();
        setIsAddCartValid(false);
      }
    }

    const toggleExpandedView = (e, index) => {
      setExpandedViewIndex(index);
      setShowExpandedView(!showExpandedView);
      if (!showExpandedView) {
        setZoomView(false);
      }
    }

    const handleArrowsClickExpandedView = (e, num) => {
      const currentIndex = expandedViewIndex;
      const allPhotos = activeStyle.photos.length - 1;
      if (currentIndex + num < 0) {
        setExpandedViewIndex(allPhotos);
      } else if (currentIndex + num > allPhotos) {
        setExpandedViewIndex(0);
      } else {
        setExpandedViewIndex(prev => prev + num);
      }
    }

    const expandedViewDots = activeStyle.photos.map((dot, index) => <StyledDotImage activeDot={expandedViewIndex === index ? true : false } key={index}/>)

    const container = document.getElementById('container');

    const handleZoom = (e) => {
      const zoomScale = 2.5;
      const glass = document.getElementById('glass');

      glass.style.left = e.clientX - (e.clientX * 30/100) + 'px';
      glass.style.top = e.clientY - (e.clientY * 30/100)+ 'px';
      glass.style.backgroundSize = (container.offsetWidth * zoomScale) + 'px';
      glass.style.backgroundPosition = (-glass.offsetLeft * zoomScale - 120) + 'px '
        + (-glass.offsetTop * zoomScale - 120) + 'px';
    }

    const ratingAverage = () => {
      var total = 0, totalcount = 0;

      for(var i in props.rating) {
        total += Number(props.rating[i]*i);
        totalcount += Number(props.rating[i]);

      }

      return (Math.round(total / totalcount * 4) / 4).toFixed(1);
    }


    return(<>
      {/**  Expanded View (Modal) */}
      {showExpandedView ?
      <StyledExpandedViewModal onClick={(e) => toggleExpandedView(e, expandedViewIndex)}>
        <StyledExpandedViewContainer onClick={(e) =>{ setZoomView(!zoomView); e.stopPropagation()}} bgImg={expandedViewImage} id="container">
          { !zoomView ? <>
            <button onClick={(e, num) => {handleArrowsClickExpandedView(e, -1); e.stopPropagation(); }}>{'<'}</button>
            {expandedViewDots}
            <button onClick={(e, num) => {handleArrowsClickExpandedView(e, +1); e.stopPropagation(); }}>{'>'}</button> </> : <Magnifier src={expandedViewImage} width={container.offsetWidth} zoomFactor={2.5}/> }
          </StyledExpandedViewContainer>
      </StyledExpandedViewModal> : '' }

      {/**  Carousel */}
      <FlexRow>
      <Carousel photos={activeStyle.photos} handleExpandedView={toggleExpandedView} expandedImage={expandedViewIndex} newProduct={props.styles}/>

      {/**  Right-side (main product info) */}
      <FlexColumn>
        <StyledOverviewContainer>
          <FlexRow>
            <Stars ratingAvg={ratingAverage()}/>
            <StyledReviews href="/#ratings">Read all {props.reviews} reviews</StyledReviews>
          </FlexRow>
          <StyledCategory>{category}</StyledCategory>
          <h1>{name}</h1>
          <StyledPrice salePrice={ salePrice ? true : false }><span>${ salePrice ? salePrice  : activeStyle.original_price }</span><span>{ salePrice ? '$' + activeStyle.original_price  : '' }</span></StyledPrice>
          <StyledCurrentStyle><span>style</span> {activeStyle.name}</StyledCurrentStyle>
        </StyledOverviewContainer>
        <StylesContainer>
          {allStyles}
        </StylesContainer>
          <StyledSizeQty>
            <p>{isAddCartValid ? '' : 'Please select a size'}</p>
            <FlexRow>
              <select name="size" id="size" onChange={onSizeChange} ref={selectedSize} disabled={skus[0] === 'OUT OF STOCK' ? true : false}>
                <option key="default" value="default">{skus[0] === 'OUT OF STOCK' ? 'OUT OF STOCK' : 'SELECT SIZE'}</option>
                {availableSizes}
              </select>
              <select name="quantity" id="quantity" disabled={availableQty ? false : true} ref={selectedQuantity}>
                {selectedSize.current.value === 'default' ? defaultQty : availableQuantities}
              </select>
            </FlexRow>
            <button onClick={handleAddToCart}><FontAwesomeIcon icon={faCartArrowDown} size='xl' style={{'marginRight': '0.7em'}} />Add to cart</button>
            <button><FontAwesomeIcon icon={farHeart} size='xl'/></button>
          </StyledSizeQty>
      </FlexColumn>
    </FlexRow></>)
  } else {
    return <p>loading</p>
  }
}

export default ProductInfo;