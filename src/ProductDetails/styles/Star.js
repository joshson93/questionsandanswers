import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
// import "./styles.css";

export default function Stars({ratingAvg}) {
    let rating = ratingAvg || 0;
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
                    <div className="single-star-container" key={i} style={{height: '1.2em', width: '1em'}}>
                        <div className="single-star-fill" style={{width: `${parseInt(item*16)}px`, height: '1.2em'}}>
                            <img id={i} className="single-star-outline" src="https://raw.githubusercontent.com/psfonseka/five-stars/master/dist/star.png" alt="stars alt" onClick={()=>{}} style={{height: '1.2em', width: '1em'}}></img>
                        </div>
                    </div>
                )
            })}
        </div>
    )

 };