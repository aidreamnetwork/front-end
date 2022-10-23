import React from "react";
import "./header.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import handdraw from "../../assets/Saly-25.png";
import { Link } from "react-router-dom";
import ListBid from "./ListBid";
import ListTask from "./ListTask";
import ListBidNFT from "./ListBidNFT";

const Header = () => {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    autoplay: true,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
        },
      },
    ],
  };
  return (
    <div className="header section__padding">
      <div className="header-content">
        <div>
          <h1>Dream, Mint and Trading NFTs By AI & KLAY</h1>
          <img className="shake-vertical" src={handdraw} alt="" />
        </div>
      </div>
      <div className="header-slider">
        <h1>Last 10 NFTs</h1>
          <ListBidNFT number="10" />
      </div>
      <div className="header-slider">
        <h1>Last 10 Results</h1>
          <ListBid number="10" />
      </div>
      <div className="header-slider">
        <h1>Last 10 Prompts</h1>
          <ListTask number="10" />
      </div>
      {/* <div className="header-slider">
        <h1>Top Creators</h1>
        <Slider {...settings} className="slider">
          {creators.map((creator, index) => (
            <div className="slider-card" key={index}>
              <p className="slider-card-number">{index + 1}</p>
              <div className="slider-img">
                <img src={seller1} alt="" />
                <img src={verify} className="verify" alt="" />
              </div>
              <Link to={`/miner/` + creator.address}>
                <p className="slider-card-name">{creator.name}</p>
              </Link>
              <p className="slider-card-price">
                {creator.totalart} <span> NFTs</span>
              </p>
            </div>
          ))}
        </Slider>
      </div>
      <div className="header-slider">
        <h1>Top Miners</h1>
        <Slider
          {...settings}
          {...{ autoplaySpeed: 1000, slidesToScroll: -1 }}
          className="slider"
        >
          {miners.map((miner, index) => (
            <div className="slider-card" key={index}>
              <p className="slider-card-number">{index + 1}</p>
              <div className="slider-img">
                <img src={seller1} alt="" />
                <img src={verify} className="verify" alt="" />
              </div>
              <Link to={`/miner/` + miner.address}>
                <p className="slider-card-name">{miner.name}</p>
              </Link>
              <p className="slider-card-price">
                {miner.reward} <span> KLAY</span>
              </p>
            </div>
          ))}
        </Slider>
      </div> */}
    </div>
  );
};

export default Header;
