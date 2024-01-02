import React from "react";

function Slider() {
  return (
    <>
      <style>
        {`
          .slideshow,
          .slideshow::after {
            position: fixed;
            width: 100%;
            margin: 0;
            height: 100%;
            top: 0px;
            left: 0px;
            z-index: 0px;
          }
          .slideshow::after {
            content: "";
          }
          .img-bg-slide {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0px;
            left: 0px;
            color: transparent;
            background-size: cover;
            background-position: 100% 100%;
            background-repeat: none;
            opacity: 0;
            z-index: 0;
            animation: backgroundSlideshow 30s linear infinite 0s;
          }
          .slideshow li:nth-child(1) .img-bg-slide {
            background-image: url("Poster.jpg");
            animation-delay: 0s;
          }
          .slideshow li:nth-child(2) .img-bg-slide {
            background-image: url("Poster3.jpg");
            animation-delay: 7.5s;
          }
          .slideshow li:nth-child(3) .img-bg-slide {
            background-image: url("Poster4.jpg");
            animation-delay: 15s;
          }
          .slideshow li:nth-child(4) .img-bg-slide {
            background-image: url("Poster2.jpg");
            animation-delay: 22.5s;
          }

          @keyframes backgroundSlideshow {
            0% {
              opacity: 0;
            }
            6.25% {
              opacity: 1;
            }
            18.75% {
              opacity: 1;
            }
            31.25% {
              opacity: 0;
            }
            100% {
              opacity: 0;
            }
          }
        `}
      </style>
      <div className=""></div>
      <ul type="none" className="slideshow">
        <li>
          <span className="img-bg-slide">Image 01</span>
        </li>
        <li>
          <span className="img-bg-slide">Image 02</span>
        </li>
        <li>
          <span className="img-bg-slide">Image 03</span>
        </li>
        <li>
          <span className="img-bg-slide">Image 04</span>
        </li>
      </ul>
    </>
  );
}

export default Slider;
