import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import testimonial1 from "../assets/images/testimonial.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ali Javed",
      role: "Local Client",
      text: "The seller very kind and cooperative. Accidently ordered H11 instead of H4 but the seller issued the refund as soon as I shipped the product back. Highly recommended’¯",
      rating: 5,
      image: testimonial1,
    },
    {
      name: "Fazal Raheem",
      role: "Local Client",
      text: "Excellent Product. Very polite and friendly Communication with agent. Delivery on Time Safe & secure Result. I have Honda Civic 2005, excellent Result on road clear and bright view of Road.",
      rating: 5,
      image: testimonial1,
    },
    {
      name: "Ali Umer",
      role: "Local Client",
      text: "The light is amazingly bright, exactly as described. The build quality is far superior to local brands. Highly recommended, especially for foggy conditions. The seller is humble, very professional, and handles dealings with civility.",
      rating: 5,
      image: testimonial1,
    },
    {
      name: "Mian Tauseef",
      role: "Local Client",
      text: "bohat hee acha product hai light is very bright i have installed in my honda civic rebirth totally satisfied…raat ko din kar deti hai.",
      rating: 5,
      image: testimonial1,
    },
    {
      name: "Muhammad Umar",
      role: "Local Client",
      text: "Received lights for WagonR ❤️ They are super bright and of international brand quality. I’ve tried other brands, but these are at half the price and still offer excellent build quality and light projection. 100% recommended.",
      rating: 5,
      image: testimonial1,
    },
  ];

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="block block-reviews">
        <div className="container">
          <div className="block-reviews__title">Testimonials</div>
          <div className="block-reviews__subtitle">
            During our work we have accumulated
            <br />
            hundreds of positive reviews.
          </div>
          <div className="block-reviews__list">
            <div>
              <Slider {...settings}>
                {testimonials.map((item, index) => {
                  return (
                    <div className="block-reviews__item" key={index}>
                      <div className="block-reviews__item-avatar">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="block-reviews__item-content">
                        <div className="block-reviews__item-text">
                          {item.text}
                        </div>
                        <div className="block-reviews__item-meta">
                          <div className="block-reviews__item-rating">
                            <div className="rating">
                              <div className="rating__body">
                                {Array.from({ length: 5 }, (_, index) => (
                                  <div
                                    key={index}
                                    className={`rating__star ${
                                      index < item.rating
                                        ? "rating__star--active"
                                        : ""
                                    }`}
                                  ></div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="block-reviews__item-author">
                            {item.name}, {item.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
