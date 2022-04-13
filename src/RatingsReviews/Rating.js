import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import "./styles.css";


export default function Rating({data}){
    function ratingAverage(){
        var total = 0, totalcount = 0;

        for(var i in data.ratings) {
            total += Number(data.ratings[i]*i);
            totalcount += Number(data.ratings[i]);

        }

        return (Math.round(total / totalcount * 4) / 4).toFixed(2);
    }
    function recommendPercentage(){
        var numerator = Number(data.recommended.true);
        var denominator = Number(data.recommended.false);
        return Math.round((numerator /(numerator+denominator))*100);
    }
   
    function Stars() {
        let rating = ratingAverage() || 0;
        let stars = [];
        while (stars.length < 5) {
            if (rating > 1) {
                stars.push(1);
            } else if (rating > 0) {
                let empty = Math.abs(0 - rating);
                let quart = Math.abs(0.25 - rating);
                let half = Math.abs(0.5 - rating);
                let three = Math.abs(0.75 - rating);
                let full = Math.abs(1 - rating);
                let closest = Math.min(empty, quart, half, three, full);
                switch (closest) {
                    case (empty): 
                        stars.push(0);
                        break;
                    case quart: 
                        stars.push(0.28);
                        break;
                    case half: 
                        stars.push(0.5);
                        break;
                    case three: 
                        stars.push(0.72);
                        break;
                    case full: 
                        stars.push(1.0);
                        break;
                    default: 
                        console.log("OOPS");
                        stars.push(0);
                        break;
                }
            } else {
                stars.push(0);
            }
            rating = rating - 1;
        }
        return (
            <div>
                {stars.map((item, i) => {
                    return (
                        <div className="single-star-container" key={i}>
                            <div className="single-star-fill" style={{"width" : `${parseInt(item*31)}px`}}>
                                <img className="single-star-outline" src="https://raw.githubusercontent.com/psfonseka/five-stars/master/dist/star.png" alt="stars alt"></img>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
        
     };
    function StarBars(){
        var total = 0;
        for(var i in data.ratings) {
            total += Number(data.ratings[i]);
        }
        return Object.values(data.ratings).map((rating,id) =>{
            console.log(Number(rating)/total)
           return (
            <>{id+1} STAR: {rating}
            <div key={id} class="bar-container">
                <div class="bar-5" style={{'width' : `${Number(rating)/total *100}%`}}></div>
            </div>
            </>
           ) 
        });
    }
    function Characteristics(){
        return Object.entries(data.characteristics).map((characteristic)=>{
            return (
                <>
                <div key={characteristic[1].id}>{characteristic[0]}: {Number(characteristic[1].value).toFixed(2)}</div>
                
                <div class="bar-container">
                    <div class="bar-5" style={{'width' : `${Number(characteristic[1].value).toFixed(2)*20}%`}}></div>
                </div>
                </>
            )
        })
     }
    return (
        <div>
            
           <div>rating: {ratingAverage()}</div>
           <div>{recommendPercentage()}% of reviews recommend this product</div>
           <Characteristics />
           <Stars/>
           <StarBars/>
        </div>
    )
}

