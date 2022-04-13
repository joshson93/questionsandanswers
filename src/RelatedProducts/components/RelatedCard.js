import styled from 'styled-components';


export const RelatedCard = ({ data, outfit, nav, action }) => {
  if ( data.type === 'render') {
    const { name, photos } = data;
    var photoUrl = photos.length ? photos[0].url : null;

    return  (
      <RelatecCardContainer data-testid="RelatedCard" >
        {photoUrl ? <CardImage src={photoUrl} onClick={nav} data-testid="nav" ></CardImage> : <EmptyCardImage onClick={nav} data-testid="nav"  ></EmptyCardImage>}
        <CardFooter>
          <CardFooterText>{name}</CardFooterText>
          <CardFooterButtonContainer>
            <CardFooterButton data-testid="outfit" onClick={outfit} >{`${action} outfit`}</CardFooterButton>
          </CardFooterButtonContainer>
        </CardFooter>
      </RelatecCardContainer>
    );
  }
  if (data.type === 'emptyOutfit') {
    return  (
      <RelatecCardContainer data-testid="RelatedCard" onClick={outfit} >
        <EmptyTextContainer>
          <p>Click to add </p>
          <p>the viewed item </p>
          <p>to your outfit!</p>
        </EmptyTextContainer>
      </RelatecCardContainer>
    );
  }
  if (data.type === 'emptyRelated') {
    return  (
      <RelatecCardContainer data-testid="RelatedCard"  >
        <EmptyTextContainer>
          <p>Sorry, no </p>
          <p>related items. </p>
        </EmptyTextContainer>
      </RelatecCardContainer>
    );
  } else {
    return (
      <RelatecCardContainer data-testid="RelatedCard"  >
        <EmptyTextContainer>
          <p>Loading</p>
        </EmptyTextContainer>
      </RelatecCardContainer>
    )
  }

}






const mainBackground = [240, 240, 240]
var cardHeight = 250;
const cardWidth = Math.round(cardHeight * 0.66).toString()
cardHeight = cardHeight.toString()
const borderRadius = '3';

const RelatecCardContainer = styled.div`
  display: flex;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 5px;
  align-items: center;
  flex-direction: column;
  width: ${cardWidth}px;
  height: ${cardHeight}px;
  justify-content: space-evenly;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.15);
  background-color: rgb( ${mainBackground.toString()} );

`
const imgBackground = [235, 235, 235]
const CardImage = styled.img`
  height: 66%;
  display: flex;
  width: ${cardWidth}px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  background-color: rgb(${imgBackground.toString()});
`

const EmptyCardImage = styled.div`
  height: 100%;
  display: flex;
  width: ${cardWidth}px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  background-color: rgb(${imgBackground.toString()});
`
// 772 / 514

const CardFooter = styled.div`
  height: 90px;
  display: flex;
  width: ${cardWidth}px;
  border-radius: ${borderRadius}px;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  background-color: rgb(${mainBackground.toString()});
`


const CardFooterText = styled.p`
  font-size: 14px;
  margin-top: 7px;
`


const buttonBackground = [225, 225, 225]
const CardFooterButton = styled.button`
  height: 75%;
  padding: 7px;
  font-size: 12px;
  border-radius: 5px;
  background-color: rgb(${buttonBackground.toString()});

`

const CardFooterButtonContainer = styled.div`
  width: ${cardWidth}px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgb(${mainBackground.toString()});
`


const EmptyTextContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`


