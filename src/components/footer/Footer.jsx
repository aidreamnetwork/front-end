import React from 'react'
import './footer.css'
import nftlogo from '../../assets/logo.png'
import { AiOutlineInstagram,AiOutlineTwitter, } from "react-icons/ai";
import { RiDiscordFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
const Footer = () => {
  return (
    <div className='footer section__padding'>
      <div className="footer-links">
        <div className="footer-links_logo">
        <div>
          <img src={nftlogo} alt="logo" />
          <p>AI Dream Network</p>
        </div>
        </div>
        <div className="footer-links_div">
          <h4>AI Dream Network</h4>
          <p><a href="https://docs.aidream.network" target="_blank">How it Works</a></p>
          <p><a href="https://github.com/aidreamnetwork/minerapp" target="_blank">Miner App</a></p>
          <p><a href="https://github.com/aidreamnetwork/contracts" target="_blank">Contracts</a></p>
          
        </div>
        <div className="footer-links_div">
          <h4>Support</h4>
          <p><a href="mailto:redpanthercode@gmail.com">Email Me</a></p>
          <p><a target="_blank" href="https://t.me/roshikamedev">Chat With Me</a></p>
        </div>
      </div>
      <div className="footer-copyright">
        <div>
        <p> © {(new Date().getFullYear())} AI Dream Network. All Rights Reserved</p>
        </div>


      </div>
    </div>
  )
}

export default Footer
