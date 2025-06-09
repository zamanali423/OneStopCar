import React from "react";

const Banners = () => {
  return (
    <>
      <div className="block-banners block">
        <div className="container">
          <div className="block-banners__list">
            <a
              href=""
              className="block-banners__item block-banners__item--style--one"
            >
              <span className="block-banners__item-image">
                <img src="images/banners/banner1.jpg" alt="" />
              </span>
              <span className="block-banners__item-image block-banners__item-image--blur">
                <img src="images/banners/banner1.jpg" alt="" />
              </span>
              <span className="block-banners__item-title">Motor Oils</span>
              <span className="block-banners__item-details">
                Synthetic motor oil with free shipping
                <br />
                Friction free life guaranteed
              </span>
              <span className="block-banners__item-button btn btn-primary btn-sm">
                Shop Now
              </span>
            </a>
            <a
              href=""
              className="block-banners__item block-banners__item--style--two"
            >
              <span className="block-banners__item-image">
                <img src="images/banners/banner2.jpg" alt="" />
              </span>
              <span className="block-banners__item-image block-banners__item-image--blur">
                <img src="images/banners/banner2.jpg" alt="" />
              </span>
              <span className="block-banners__item-title">Save up to $40</span>
              <span className="block-banners__item-details">
                Luxurious interior part for real aesthetes
                <br />
                Leather, fabric, ivory and more.
              </span>
              <span className="block-banners__item-button btn btn-primary btn-sm">
                Shop Now
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banners;
