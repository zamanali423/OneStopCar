import React from "react";
import signature from "../assets/images/signature.jpg";
import image1 from "../assets/images/Muhammad-Shahid.jpg";
import image2 from "../assets/images/zaman-ali.jpg";
import image3 from "../assets/images/Muhammad-Abid.jpg";
import image4 from "../assets/images/Sufyan-Majeed.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Testimonials from "../components/Testimonials";
import about_bg from "../assets/images/about_bg.webp";

const About_Us = () => {
  return (
    <>
      <div className="about">
        <div className="about__body">
          <div className="about__image">
            <div
              className="about__image-bg"
              style={{ backgroundImage: `url(${about_bg})` }}
            ></div>
            <div className="decor about__image-decor decor--type--bottom">
              <div className="decor__body">
                <div className="decor__start"></div>
                <div className="decor__end"></div>
                <div className="decor__center"></div>
              </div>
            </div>
          </div>
          <div className="about__card">
            <div className="about__card-title">About Us</div>
            <div className="about__card-text">
              OneStopCar is an Pakistani company with 3 years of history selling
              LED's and spare parts for cars and motorcycles. During our work we
              managed to create a unique service for the sale and delivery of
              LED's and spare parts around the Pakistan.
            </div>
            <div className="about__card-author">M.Shahid, Owner OneStopCar</div>
            <div className="about__card-signature">
              <img src={signature} width="160" height="55" alt="" />
            </div>
          </div>
          <div className="about__indicators">
            <div className="about__indicators-body">
              <div className="about__indicators-item">
                <div className="about__indicators-item-value">2</div>
                <div className="about__indicators-item-title">
                  Stores around the Gujranwala
                </div>
              </div>
              <div className="about__indicators-item">
                <div className="about__indicators-item-value">200+</div>
                <div className="about__indicators-item-title">
                  Original auto parts
                </div>
              </div>
              <div className="about__indicators-item">
                <div className="about__indicators-item-value">1000+</div>
                <div className="about__indicators-item-title">
                  Satisfied customers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block-space block-space--layout--divider-xl"></div>
      <div className="block block-teammates">
        <div className="container container--max--xl">
          <div className="block-teammates__title">Professional Team</div>
          <div className="block-teammates__subtitle">
            Meet this is our professional team.
          </div>
          <div className="block-teammates__list">
            <Slider
              dots={false}
              infinite={false}
              speed={500}
              slidesToShow={4}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={2000}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: { slidesToShow: 4 },
                },
                {
                  breakpoint: 600,
                  settings: { slidesToShow: 2 },
                },
              ]}
            >
              <div className="block-teammates__item teammate">
                <div className="teammate__avatar">
                  <img src={image1} alt="M.Shahid" />
                </div>
                <div className="teammate__info">
                  <div className="teammate__name">M.Shahid</div>
                  <div className="teammate__position">Owner OneStopCar</div>
                </div>
              </div>

              <div className="block-teammates__item teammate">
                <div className="teammate__avatar">
                  <img src={image2} alt="M.Ahmad" />
                </div>
                <div className="teammate__info">
                  <div className="teammate__name">M.Ahmad</div>
                  <div className="teammate__position">
                    Chief Executive Officer
                  </div>
                </div>
              </div>

              <div className="block-teammates__item teammate">
                <div className="teammate__avatar">
                  <img src={image3} alt="Muhammad Abid" />
                </div>
                <div className="teammate__info">
                  <div className="teammate__name">Muhammad Abid</div>
                  <div className="teammate__position">Finance Director</div>
                </div>
              </div>

              <div className="block-teammates__item teammate">
                <div className="teammate__avatar">
                  <img src={image4} alt="Sufyan Majeed" />
                </div>
                <div className="teammate__info">
                  <div className="teammate__name">Sufyan Majeed</div>
                  <div className="teammate__position">Marketing Officer</div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>

      <div className="block-space block-space--layout--divider-xl"></div>
      <Testimonials />
      <div className="block-space block-space--layout--before-footer"></div>
    </>
  );
};

export default About_Us;
