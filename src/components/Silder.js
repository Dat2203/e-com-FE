import React, { useEffect, useRef, useState } from "react";

function Silder(props) {
  const sliderData = [
    { imageUrl: "assets/banners/banner_tet.png" },
    { imageUrl: "assets/banners/banner_2.png" },
    { imageUrl: "assets/banners/banner_5.jpg" },
  ];
  const [slideIndex, setSlideIndex] = useState(0);
  const ImgWraper = useRef();

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
      console.log(slideIndex);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
      console.log(slideIndex);
    }
  };
  useEffect(() => {
    ImgWraper.current.style.transform = `translateX(${slideIndex * -100}vw)`;
  }, [slideIndex]);

  useEffect(() => {
    const SlideAuto = setInterval(() => {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }, 6000);

    return () => {
      clearInterval(SlideAuto);
    };
  }, [slideIndex]);
  return (
    <div className="slider">
      <div
        className="slider__btn slider__btn--left"
        direction="left"
        onClick={() => handleClick("left")}
      >
        <i className="bx bx-left-arrow"></i>
      </div>
      <div className="slider__img" ref={ImgWraper}>
        {sliderData.map((slider, index) => (
          <div className="slider__img__container" key={index}>
            <img src={slider.imageUrl} alt={index}></img>
          </div>
        ))}
      </div>
      <div
        className="slider__btn slider__btn--right "
        direction="right"
        onClick={() => handleClick("right")}
      >
        <i className="bx bx-right-arrow"></i>
      </div>
    </div>
  );
}

export default Silder;
