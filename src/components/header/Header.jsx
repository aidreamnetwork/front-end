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
import { useAccount } from "wagmi";

const Header = () => {
  const { address, isConnected } = useAccount();

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
      {isConnected ? (
        <>
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
        </>
      ) : (
        <div className="wallet-warning">Please connect wallet to using app</div>
      )}
    </div>
  );
};

export default Header;
