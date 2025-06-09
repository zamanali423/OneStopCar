import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { productContext } from "../context/productContext/productContext";
import bg from "../assets/images/bg1.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Items from "./Items";

const Sale_Section = () => {
  const { items } = useContext(productContext);
  const sliderRef = useRef(null);
  const filteredItems = items.filter((item) => item.category === "LED's");
  const [timeLeft, setTimeLeft] = useState(3 * 24 * 60 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const format = (number) => {
    const str = number.toFixed(0);
    return str.length === 1 ? "0" + str : str;
  };

  const days = Math.floor(timeLeft / (60 * 60 * 24));
  const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      <div className="block block-sale">
        <div className="block-sale__content">
          <div className="block-sale__header">
            <div className="block-sale__title">Attention! Deal Zone</div>
            <div className="block-sale__subtitle">
              Hurry up! Discounts up to 70%
            </div>
            <div className="block-sale__timer">
              <div className="timer">
                <div className="timer__part">
                  <div className="timer__part-value timer__part-value--days">
                    {format(days)}
                  </div>
                  <div className="timer__part-label">Days</div>
                </div>
                <div className="timer__dots"></div>
                <div className="timer__part">
                  <div className="timer__part-value timer__part-value--hours">
                    {format(hours)}
                  </div>
                  <div className="timer__part-label">Hrs</div>
                </div>
                <div className="timer__dots"></div>
                <div className="timer__part">
                  <div className="timer__part-value timer__part-value--minutes">
                    {format(minutes)}
                  </div>
                  <div className="timer__part-label">Mins</div>
                </div>
                <div className="timer__dots"></div>
                <div className="timer__part">
                  <div className="timer__part-value timer__part-value--seconds">
                    {format(seconds)}
                  </div>
                  <div className="timer__part-label">Secs</div>
                </div>
              </div>
            </div>
            <div className="block-sale__controls">
              <div className="arrow block-sale__arrow block-sale__arrow--prev arrow--prev">
                <button
                  className="arrow__button"
                  type="button"
                  onClick={() => sliderRef.current.slickPrev()}
                >
                  <svg width="7" height="11">
                    <path d="M6.7,0.3L6.7,0.3c-0.4-0.4-0.9-0.4-1.3,0L0,5.5l5.4,5.2c0.4,0.4,0.9,0.3,1.3,0l0,0c0.4-0.4,0.4-1,0-1.3l-4-3.9l4-3.9C7.1,1.2,7.1,0.6,6.7,0.3z" />
                  </svg>
                </button>
              </div>
              <div className="block-sale__link">
                <a href="">View All Available Offers</a>
              </div>
              <div className="arrow block-sale__arrow block-sale__arrow--next arrow--next">
                <button
                  className="arrow__button"
                  type="button"
                  onClick={() => sliderRef.current.slickNext()}
                >
                  <svg width="7" height="11">
                    <path
                      d="M0.3,10.7L0.3,10.7c0.4,0.4,0.9,0.4,1.3,0L7,5.5L1.6,0.3C1.2-0.1,0.7,0,0.3,0.3l0,0c-0.4,0.4-0.4,1,0,1.3l4,3.9l-4,3.9
	C-0.1,9.8-0.1,10.4,0.3,10.7z"
                    />
                  </svg>
                </button>
              </div>
              <div className="decor block-sale__header-decor decor--type--center">
                <div className="decor__body">
                  <div className="decor__start"></div>
                  <div className="decor__end"></div>
                  <div className="decor__center"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="block-sale__body">
            <div className="decor block-sale__body-decor decor--type--bottom">
              <div className="decor__body">
                <div className="decor__start"></div>
                <div className="decor__end"></div>
                <div className="decor__center"></div>
              </div>
            </div>
            <div
              className="block-sale__image"
              style={{ backgroundImage: `url(${bg})` }}
            ></div>

            {/* products  */}
            <div className="container">
              <div className="block-sale__carousel">
                <Items filteredItems={filteredItems} sliderRef={sliderRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sale_Section;
