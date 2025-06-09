import React, { useContext } from "react";
import { Shopping_Cart, MobileShoppingCart } from "./Shopping_Cart";
import { productContext } from "../context/productContext/productContext";
import toast from "react-hot-toast";
import { Link } from "react-router";

const Navbar = () => {
  const { title, setTitle, searchProduct, productRef } =
    useContext(productContext);
  const searchProductBtn = () => {
    searchProduct();
    if (productRef.current) {
      productRef.current.scrollIntoView({ behavior: "smooth" });
    }
    toast("Searching...", {
      icon: "🔍",
      duration: 2000,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <>
      {/* site__mobile-header */}
      <header className="site__mobile-header">
        <div className="mobile-header">
          <div className="container">
            <div className="mobile-header__body">
              <button className="mobile-header__menu-button" type="button">
                <svg width="18px" height="14px">
                  <path d="M-0,8L-0,6L18,6L18,8L-0,8ZM-0,-0L18,-0L18,2L-0,2L-0,-0ZM14,14L-0,14L-0,12L14,12L14,14Z" />
                </svg>
              </button>
              <a className="mobile-header__logo" href="/">
                {/* <!-- mobile-logo --> */}
                <h3
                  className="mobile-header__logo-part-one"
                  style={{ fontWeight: "bold" }}
                >
                  One
                </h3>
                <h3
                  className="mobile-header__logo-part-two"
                  style={{ color: "#000", fontWeight: "bold" }}
                >
                  StopCar
                </h3>
                {/* <!-- mobile-logo / end --> */}
              </a>
              <div className="mobile-header__search mobile-search">
                <form className="mobile-search__body">
                  <input
                    type="text"
                    className="mobile-search__input"
                    placeholder="Enter keyword or part number"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <button
                    type="button"
                    className="mobile-search__vehicle-picker"
                    aria-label="Select Vehicle"
                  >
                    <svg width="20" height="20">
                      <path
                        d="M6.6,2c2,0,4.8,0,6.8,0c1,0,2.9,0.8,3.6,2.2C17.7,5.7,17.9,7,18.4,7C20,7,20,8,20,8v1h-1v7.5c0,0.8-0.7,1.5-1.5,1.5h-1
	c-0.8,0-1.5-0.7-1.5-1.5V16H5v0.5C5,17.3,4.3,18,3.5,18h-1C1.7,18,1,17.3,1,16.5V16V9H0V8c0,0,0.1-1,1.6-1C2.1,7,2.3,5.7,3,4.2
	C3.7,2.8,5.6,2,6.6,2z M13.3,4H6.7c-0.8,0-1.4,0-2,0.7c-0.5,0.6-0.8,1.5-1,2C3.6,7.1,3.5,7.9,3.7,8C4.5,8.4,6.1,9,10,9
	c4,0,5.4-0.6,6.3-1c0.2-0.1,0.2-0.8,0-1.2c-0.2-0.4-0.5-1.5-1-2C14.7,4,14.1,4,13.3,4z M4,10c-0.4-0.3-1.5-0.5-2,0
	c-0.4,0.4-0.4,1.6,0,2c0.5,0.5,4,0.4,4,0C6,11.2,4.5,10.3,4,10z M14,12c0,0.4,3.5,0.5,4,0c0.4-0.4,0.4-1.6,0-2c-0.5-0.5-1.3-0.3-2,0
	C15.5,10.2,14,11.3,14,12z"
                      />
                    </svg>
                    <span className="mobile-search__vehicle-picker-label">
                      Vehicle
                    </span>
                  </button>
                  <button
                    type="button"
                    className="mobile-search__button mobile-search__button--search"
                    onClick={searchProductBtn}
                  >
                    <svg width="20" height="20">
                      <path
                        d="M19.2,17.8c0,0-0.2,0.5-0.5,0.8c-0.4,0.4-0.9,0.6-0.9,0.6s-0.9,0.7-2.8-1.6c-1.1-1.4-2.2-2.8-3.1-3.9C10.9,14.5,9.5,15,8,15
	c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7c0,1.5-0.5,2.9-1.3,4c1.1,0.8,2.5,2,4,3.1C20,16.8,19.2,17.8,19.2,17.8z M8,3C5.2,3,3,5.2,3,8
	c0,2.8,2.2,5,5,5c2.8,0,5-2.2,5-5C13,5.2,10.8,3,8,3z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="mobile-search__button mobile-search__button--close"
                  >
                    <svg width="20" height="20">
                      <path
                        d="M16.7,16.7L16.7,16.7c-0.4,0.4-1,0.4-1.4,0L10,11.4l-5.3,5.3c-0.4,0.4-1,0.4-1.4,0l0,0c-0.4-0.4-0.4-1,0-1.4L8.6,10L3.3,4.7
	c-0.4-0.4-0.4-1,0-1.4l0,0c0.4-0.4,1-0.4,1.4,0L10,8.6l5.3-5.3c0.4-0.4,1-0.4,1.4,0l0,0c0.4,0.4,0.4,1,0,1.4L11.4,10l5.3,5.3
	C17.1,15.7,17.1,16.3,16.7,16.7z"
                      />
                    </svg>
                  </button>
                  <div className="mobile-search__field"></div>
                </form>
              </div>

              {/* cart  */}
              <MobileShoppingCart />
            </div>
          </div>
        </div>
      </header>
      {/* <!-- site__mobile-header / end -->

        <!-- site__header --> */}
      <header className="site__header">
        <div className="header">
          <div className="header__megamenu-area megamenu-area"></div>
          <div className="header__topbar-start-bg"></div>
          <div className="header__topbar-start">
            <div className="topbar topbar--spaceship-start">
              <div className="topbar__item-text d-none d-xxl-flex">
                Call Us: (0311) 053-2034
              </div>
              <div className="topbar__item-text">
                <a className="topbar__link" href="about_us">
                  About Us
                </a>
              </div>
              <div className="topbar__item-text">
                <a className="topbar__link" href="contact_us">
                  Contacts
                </a>
              </div>
              <div className="topbar__item-text">
                <a className="topbar__link" href="order_tracker">
                  Track Order
                </a>
              </div>
            </div>
          </div>
          <div className="header__topbar-end-bg"></div>
          <div className="header__topbar-end">
            <div className="topbar topbar--spaceship-end">
              <div className="topbar__item-button">
                <a href="/" className="topbar__button">
                  <span className="topbar__button-label">Compare:</span>
                  <span className="topbar__button-title">5</span>
                </a>
              </div>
              <div className="topbar__item-button topbar__menu">
                <button
                  className="topbar__button topbar__button--has-arrow topbar__menu-button"
                  type="button"
                >
                  <span className="topbar__button-label">Currency:</span>
                  <span className="topbar__button-title">PKR</span>
                </button>
              </div>
              <div className="topbar__menu">
                <button
                  className="topbar__button topbar__button--has-arrow topbar__menu-button"
                  type="button"
                >
                  <span className="topbar__button-label">Language:</span>
                  <span className="topbar__button-title">EN</span>
                </button>
                <div className="topbar__menu-body">
                  <a className="topbar__menu-item" href="/">
                    <img src="images/languages/language-1.png" alt="" />
                    <span>English</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="header__navbar">
            <div className="header__navbar-menu">
              <div className="main-menu">
                <ul className="main-menu__list">
                  <li className="main-menu__item main-menu__item--submenu--menu main-menu__item--has-submenu">
                    <a href="/" className="main-menu__link">
                      Home
                    </a>
                  </li>
                  <li className="main-menu__item main-menu__item--submenu--menu main-menu__item--has-submenu">
                    <a href="shop" className="main-menu__link">
                      Shop
                    </a>
                  </li>

                  <li className="main-menu__item main-menu__item--submenu--menu main-menu__item--has-submenu">
                    <a href="about_us" className="main-menu__link">
                      About Us
                    </a>
                  </li>

                  <li className="main-menu__item main-menu__item--submenu--menu main-menu__item--has-submenu">
                    <a href="contact_us" className="main-menu__link">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="header__logo">
            <a href="/" className="logo">
              <div className="logo__slogan">
                Auto parts, Led's and accessories for Cars
              </div>
              <div className="logo__image">
                {/* <!-- logo --> */}
                <h1
                  className="logo__part-primary"
                  style={{ fontWeight: "bold" }}
                >
                  One
                </h1>
                <h1
                  className="logo__part-secondary"
                  style={{ color: "#000", fontWeight: "bold" }}
                >
                  StopCar
                </h1>

                {/* <!-- logo / end --> */}
              </div>
            </a>
          </div>
          <div className="header__search">
            <div className="search">
              <form action="" className="search__body">
                <div className="search__shadow"></div>
                <input
                  className="search__input"
                  type="text"
                  placeholder="Enter Keyword or Part Number"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button
                  className="search__button search__button--start"
                  type="button"
                  onClick={() => searchProduct()}
                >
                  <span className="search__button-icon">
                    <svg width="20" height="20">
                      <path
                        d="M6.6,2c2,0,4.8,0,6.8,0c1,0,2.9,0.8,3.6,2.2C17.7,5.7,17.9,7,18.4,7C20,7,20,8,20,8v1h-1v7.5c0,0.8-0.7,1.5-1.5,1.5h-1
	c-0.8,0-1.5-0.7-1.5-1.5V16H5v0.5C5,17.3,4.3,18,3.5,18h-1C1.7,18,1,17.3,1,16.5V16V9H0V8c0,0,0.1-1,1.6-1C2.1,7,2.3,5.7,3,4.2
	C3.7,2.8,5.6,2,6.6,2z M13.3,4H6.7c-0.8,0-1.4,0-2,0.7c-0.5,0.6-0.8,1.5-1,2C3.6,7.1,3.5,7.9,3.7,8C4.5,8.4,6.1,9,10,9
	c4,0,5.4-0.6,6.3-1c0.2-0.1,0.2-0.8,0-1.2c-0.2-0.4-0.5-1.5-1-2C14.7,4,14.1,4,13.3,4z M4,10c-0.4-0.3-1.5-0.5-2,0
	c-0.4,0.4-0.4,1.6,0,2c0.5,0.5,4,0.4,4,0C6,11.2,4.5,10.3,4,10z M14,12c0,0.4,3.5,0.5,4,0c0.4-0.4,0.4-1.6,0-2c-0.5-0.5-1.3-0.3-2,0
	C15.5,10.2,14,11.3,14,12z"
                      />
                    </svg>
                  </span>
                  <span className="search__button-title">Select Vehicle</span>
                </button>
                <button
                  className="search__button search__button--end"
                  type="button"
                  onClick={searchProductBtn}
                >
                  <span className="search__button-icon">
                    <svg width="20" height="20">
                      <path
                        d="M19.2,17.8c0,0-0.2,0.5-0.5,0.8c-0.4,0.4-0.9,0.6-0.9,0.6s-0.9,0.7-2.8-1.6c-1.1-1.4-2.2-2.8-3.1-3.9C10.9,14.5,9.5,15,8,15
	c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7c0,1.5-0.5,2.9-1.3,4c1.1,0.8,2.5,2,4,3.1C20,16.8,19.2,17.8,19.2,17.8z M8,3C5.2,3,3,5.2,3,8
	c0,2.8,2.2,5,5,5c2.8,0,5-2.2,5-5C13,5.2,10.8,3,8,3z"
                      />
                    </svg>
                  </span>
                </button>
                <div className="search__box"></div>
                <div className="search__decor">
                  <div className="search__decor-start"></div>
                  <div className="search__decor-end"></div>
                </div>
              </form>
            </div>
          </div>

          <div className="header__indicators">
            <div className="indicator">
              <a href="wishlist" className="indicator__button">
                <span className="indicator__icon">
                  <svg width="32" height="32">
                    <path
                      d="M23,4c3.9,0,7,3.1,7,7c0,6.3-11.4,15.9-14,16.9C13.4,26.9,2,17.3,2,11c0-3.9,3.1-7,7-7c2.1,0,4.1,1,5.4,2.6l1.6,2l1.6-2
	C18.9,5,20.9,4,23,4 M23,2c-2.8,0-5.4,1.3-7,3.4C14.4,3.3,11.8,2,9,2c-5,0-9,4-9,9c0,8,14,19,16,19s16-11,16-19C32,6,28,2,23,2L23,2
	z"
                    />
                  </svg>
                </span>
              </a>
            </div>

            <div className="">
              <Link to="/register" className="indicator__button">
                <span className="indicator__icon">
                  <svg width="32" height="32">
                    <path
                      d="M16,18C9.4,18,4,23.4,4,30H2c0-6.2,4-11.5,9.6-13.3C9.4,15.3,8,12.8,8,10c0-4.4,3.6-8,8-8s8,3.6,8,8c0,2.8-1.5,5.3-3.6,6.7
	C26,18.5,30,23.8,30,30h-2C28,23.4,22.6,18,16,18z M22,10c0-3.3-2.7-6-6-6s-6,2.7-6,6s2.7,6,6,6S22,13.3,22,10z"
                    />
                  </svg>
                </span>
                <span className="indicator__title">Hello, Log In</span>
                <span className="indicator__value">My Account</span>
              </Link>
            </div>

            {/* shopping cart  */}
            <Shopping_Cart />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
