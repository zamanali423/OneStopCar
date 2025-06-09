import React from "react";
import logo from "../assets/images/logo2.png"

const Footer = () => {
  return (
    <>
      <footer className="site__footer">
        <div className="site-footer">
          <div className="decor site-footer__decor decor--type--bottom">
            <div className="decor__body">
              <div className="decor__start"></div>
              <div className="decor__end"></div>
              <div className="decor__center"></div>
            </div>
          </div>
          <div className="site-footer__widgets">
            <div className="container">
              <div className="row">
                <div className="col-12 col-xl-4">
                  <div className="site-footer__widget footer-contacts">
                    <h5 className="footer-contacts__title">Contact Us</h5>
                    <div className="footer-contacts__text">
                      Your one-stop destination for premium automotive LED
                      lights, ensuring safety and style for every drive. Explore
                      our selection today for the ultimate driving experience.
                    </div>
                    <address className="footer-contacts__contacts">
                      <dl>
                        <dt>Phone Number</dt>
                        <dd>
                          <a
                            href="tel:+923110532034"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            +92 (311) 053-20-34
                          </a>
                        </dd>
                      </dl>
                      <dl>
                        <dt>Email Address</dt>
                        <dd>
                          <a
                            href="mailto:sales@onestopcar.net"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            sales@onestopcar.net
                          </a>
                        </dd>
                      </dl>
                      <dl>
                        <dt>Our Location</dt>
                        <dd>
                          <a
                            href="https://maps.app.goo.gl/XLr3dv6pDBTyWEXE7"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Main Entrance, G Mangolia Park, GT Road, Gujranwala
                          </a>
                        </dd>
                      </dl>
                      <dl>
                        <dt>Working Hours</dt>
                        <dd>Mon-Sun 10:00am - 10:00pm</dd>
                      </dl>
                    </address>
                  </div>
                </div>
                <div className="col-6 col-md-3 col-xl-2">
                  <div className="site-footer__widget footer-links">
                    <h5 className="footer-links__title">Information</h5>
                    <ul className="footer-links__list">
                      <li className="footer-links__item">
                        <a href="/" className="footer-links__link">
                          Home
                        </a>
                      </li>
                      <li className="footer-links__item">
                        <a href="contact_us" className="footer-links__link">
                          Contact Us
                        </a>
                      </li>
                      <li className="footer-links__item">
                        <a href="about_us" className="footer-links__link">
                          About Us
                        </a>
                      </li>
                      <li className="footer-links__item">
                        <a href="shop" className="footer-links__link">
                          Shop
                        </a>
                      </li>
                      <li className="footer-links__item">
                        <a
                          href="terms_condition"
                          className="footer-links__link"
                        >
                          Terms and Conditions
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-6 col-md-3 col-xl-2">
                  <div className="site-footer__widget footer-links">
                    <h5 className="footer-links__title">Hot Products</h5>
                    <ul className="footer-links__list">
                      <li className="footer-links__item">
                        <a
                          href={`${encodeURIComponent("Black Diamond LED H1")}`}
                          className="footer-links__link"
                        >
                          Black Diamond LED H1
                        </a>
                      </li>
                      <li className="footer-links__item">
                        <a
                          href={`${encodeURIComponent("Black Diamond LED H4")}`}
                          className="footer-links__link"
                        >
                          Black Diamond LED H4
                        </a>
                      </li>
                      <li className="footer-links__item">
                        <a
                          href={`${encodeURIComponent("Black Diamond LED H7")}`}
                          className="footer-links__link"
                        >
                          Black Diamond LED H7
                        </a>
                      </li>
                      <li className="footer-links__item">
                        <a
                          href={`${encodeURIComponent(
                            "Black Diamond LED H11"
                          )}`}
                          className="footer-links__link"
                        >
                          Black Diamond LED H11
                        </a>
                      </li>
                      <li className="footer-links__item">
                        <a
                          href={`${encodeURIComponent(
                            "Black Diamond LED 9005"
                          )}`}
                          className="footer-links__link"
                        >
                          Black Diamond LED 9005
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-xl-4">
                  <div className="site-footer__widget footer-newsletter">
                    <h5 className="footer-newsletter__title">Newsletter</h5>
                    <div className="footer-newsletter__text">
                      Enter your email address below to subscribe to our
                      newsletter and keep up to date with discounts and special
                      offers.
                    </div>
                    <form action="" className="footer-newsletter__form">
                      <label
                        className="sr-only"
                        for="footer-newsletter-address"
                      >
                        Email Address
                      </label>
                      <input
                        type="text"
                        className="footer-newsletter__form-input"
                        id="footer-newsletter-address"
                        placeholder="Email Address..."
                      />
                      <button className="footer-newsletter__form-button">
                        Subscribe
                      </button>
                    </form>
                    <div className="footer-newsletter__text footer-newsletter__text--social">
                      Follow us on social networks
                    </div>
                    <div className="footer-newsletter__social-links social-links">
                      <ul className="social-links__list">
                        <li className="social-links__item social-links__item--facebook">
                          <a
                            href="https://www.facebook.com/OneStopCar92?mibextid=ZbWKwL"
                            target="_blank"
                          >
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li className="social-links__item social-links__item--twitter">
                          <a
                            href="https://www.tiktok.com/@onestopcar92?_t=8mGVdakbDQF&_r=1"
                            target="_blank"
                            style={{ backgroundColor: "#000" }}
                          >
                            <i class="fab fa-tiktok"></i>
                          </a>
                        </li>
                        <li className="social-links__item social-links__item--youtube">
                          <a
                            href="https://www.youtube.com/@onestopcar92?feature=shared"
                            target="_blank"
                          >
                            <i className="fab fa-youtube"></i>
                          </a>
                        </li>
                        <li className="social-links__item social-links__item--instagram">
                          <a
                            href="https://www.instagram.com/one_stop_car_/"
                            target="_blank"
                          >
                            <i className="fab fa-instagram"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="site-footer__bottom">
            <div className="container">
              <div className="site-footer__bottom-row">
                <div className="site-footer__copyright">
                  {/* copyright */}
                  ©2022. | All rights reserved. | Designed By:{" "}
                  <a
                    href="https://wa.me/923054800647?text=Hello%20Zaman%20Ali"
                    target="_blank"
                  >
                    Zaman Ali
                  </a>
                  {/* copyright / end */}
                </div>
                <div className="site-footer__payments">
                  <img className="logoMain" src={logo} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
