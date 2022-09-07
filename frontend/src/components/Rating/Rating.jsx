import {BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs';
import './Rating.css';

const Rating=(props)=>{
  const {rating, numOfReviews}=props;
  if(rating<0.5){
    return  <div className='ratingWrapper'>
              <span>
                <BsStar /><BsStar /><BsStar /><BsStar /><BsStar />
              </span>
              <span>{numOfReviews}reviews</span>
            </div>
  } else if(rating>=0.5 && rating<1){
    return  <div className='ratingWrapper'>
              <span>
                <BsStarHalf /><BsStar /><BsStar /><BsStar /><BsStar />
              </span>
              <span>{numOfReviews}reviews</span>
            </div>
  } else if(rating>=1 && rating<1.5){
    return  <div className='ratingWrapper'>
              <span>
                <BsStarFill /><BsStar /><BsStar /><BsStar /><BsStar />
              </span>
              <span>{numOfReviews}reviews</span>
            </div>
  } else if(rating>=1.5 && rating<2){
    return  <div className='ratingWrapper'>
              <span>
                <BsStarFill /><BsStarHalf /><BsStar /><BsStar /><BsStar />
              </span>
              <span>{numOfReviews}reviews</span>
            </div>
  } else if(rating>=2 && rating<2.5){
    return  <div className='ratingWrapper'>
              <span>
                <BsStarFill /><BsStarFill /><BsStar /><BsStar /><BsStar />
              </span>
              <span>{numOfReviews}reviews</span>
            </div>
  } else if(rating>=2.5 && rating<3){
    return  <div className='ratingWrapper'>
              <span>
                <BsStarFill /><BsStarFill /><BsStarHalf /><BsStar /><BsStar />
              </span>
              <span>{numOfReviews}reviews</span>
            </div>
  } else if(rating>=3 && rating<3.5){
    return  <div className='ratingWrapper'>
              <span>
                <BsStarFill /><BsStarFill /><BsStarFill /><BsStar /><BsStar />
              </span>
              <span>{numOfReviews}reviews</span>
            </div>
  } else if(rating>=3.5 && rating<4){
    return  <div className='ratingWrapper'>
              <span>
                <BsStarFill /><BsStarFill /><BsStarFill /><BsStarHalf /><BsStar />
              </span>
              <span>{numOfReviews}reviews</span>
            </div>
  } else if(rating>=4 && rating<4.5){
    return  <div className='ratingWrapper'>
              <span>
                <BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStar />
              </span>
              <span>{numOfReviews}reviews</span>
            </div>
  } else if(rating>=4.5 && rating<5){
    return  <div className='ratingWrapper'>
              <span>
                <BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarHalf />
              </span>
              <span>{numOfReviews}reviews</span>
            </div>
  } else if(rating>=5){
    return  <div className='ratingWrapper'>
              <span>
                <BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill />
              </span>
              <span>{numOfReviews}reviews</span>
            </div>
  }
}

export default Rating;