import React from "react";

const Breadcrumb = ({ previous, current }) => {
  return (
    <>
      <nav
        className="breadcrumb block-header__breadcrumb"
        aria-label="breadcrumb"
      >
        <ol className="breadcrumb__list">
          <li
            className="breadcrumb__spaceship-safe-area"
            role="presentation"
          ></li>
          <li className="breadcrumb__item breadcrumb__item--parent breadcrumb__item--first">
            <a href="/" className="breadcrumb__item-link">
              Home
            </a>
          </li>
          {previous && (
            <li className="breadcrumb__item breadcrumb__item--parent">
              <a href="" className="breadcrumb__item-link">
                {previous}
              </a>
            </li>
          )}
          <li
            className="breadcrumb__item breadcrumb__item--current breadcrumb__item--last"
            aria-current="page"
          >
            <span className="breadcrumb__item-link">{current}</span>
          </li>
          <li className="breadcrumb__title-safe-area" role="presentation"></li>
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
