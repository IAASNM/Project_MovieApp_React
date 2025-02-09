import React, { Component, useEffect, useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

import { useSelector, useDispatch } from "react-redux";
import { userAdded, movieAdded } from "./../action";

import image2 from "./image2.png";
import image3 from "./image3.jpeg";

import { useTranslation, Trans } from 'react-i18next'



function Home(props) {
    const userRedux = useSelector((state) => state.user);
  const favMovieList = useSelector((state) => state.favMoviesList);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userRedux);
    console.log(favMovieList);
    return () => {};
  }, []);

    const items = [
        {
            src: image2,
            altText: 'Slide 1',
            page: '/movies',
            caption: <h1 className="neonText" style={{textAlign: "center", fontSize: "40px", width: "250px"}}><Trans i18nKey="Movies">Movies</Trans></h1>
        },
        {
            src: image3,
            altText: 'Slide 2',
            page: '/tv-shows',
            caption: <h1 className="neonText" style={{textAlign: "center", fontSize: "40px", width: "250px"}}><Trans i18nKey="Tv Shows">TV Shows</Trans></h1>
        }
    ];


    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const history = useHistory();


    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} height="550px" alt={item.altText} onClick={() => history.push(item.page)}/>
                <CarouselCaption captionText="" captionHeader={item.caption}/>
            </CarouselItem>
        );
    });


    return (
        <div className="fade-me container myHome">
            <h1 className="neonText" style={{textAlign: "center"}}><Trans i18nKey="Movies and TV Shows Library">Movies and TV Shows Library</Trans></h1>
            {/*<h1 className="display-4" style={{fontWeight: "bold" , color: "white", textShadow: "-1px 0 2px black, 0 1px 2px black, 1px 0 2px black, 0 -1px 2px black, 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue"}}>Movies and TV Shows Library</h1>*/}
            <h2 style={{paddingTop: "50px", paddingBottom: "25px", fontWeight: "bold", color: "white", textShadow: "-1px 0 2px black, 0 1px 2px black, 1px 0 2px black, 0 -1px 2px black, 1px 1px 2px black, 0 0 25px red, 0 0 5px red"}}>
            <Trans i18nKey="Choose Which Library You Want to Explore">Choose Which Library You Want to Explore</Trans></h2>
            {/*<h1>{props.user.name ? 'Hi ' + props.user.name : 'You are not logged in' }</h1>*/}

            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        </div>
    );
  

  
}

export default Home;
