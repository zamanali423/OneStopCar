import React, { useCallback, useContext, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import toast from "react-hot-toast";
import { productContext } from "../context/productContext/productContext";

const Contact_Us = () => {
  const [inputData, setInputData] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { url } = useContext(productContext);

  const resetForm = () => {
    setInputData({
      name: "",
      subject: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleInput = useCallback((e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateInputs = useCallback(() => {
    const emptyField = Object.entries(inputData).find(([, val]) => !val.trim());
    if (emptyField) {
      toast.error("Please fill all the required fields");
      return false;
    }
    return true;
  }, [inputData]);

  const sendMessageOnEmail = useCallback(
    async (contact) => {
      try {
        const res = await fetch(`${url}/contacts/send-email-contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contact),
        });

        if (!res.ok) {
          throw new Error("Failed to send email");
        }

        toast.success("Message sent! Check your email for contact details.");
      } catch (error) {
        console.error("Email Error:", error);
        toast.error("Failed to send message. Please try again.");
      }
    },
    [url]
  );

  const doContact = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateInputs()) return;

      setIsLoading(true);
      const contactDetail = { ...inputData, date: new Date() };

      try {
        const res = await fetch(`${url}/contacts/new-contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactDetail),
        });

        if (!res.ok) {
          throw new Error("Failed to contact");
        }

        await sendMessageOnEmail(contactDetail);
        await res.json();
        toast.success("Contact submitted successfully");
        resetForm();
      } catch (error) {
        console.error("Contact Error:", error);
        toast.error("Failed to contact. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [inputData, sendMessageOnEmail, url, validateInputs]
  );
  return (
    <>
      <div className="block-map block">
        <div className="block-map__body">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211.23608886612598!2d74.20200950818928!3d32.10230073720716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xac4eae174466d39d%3A0x10cd13bc522f26cc!2sONE%20STOP%20CAR%20LED!5e0!3m2!1sen!2s!4v1748830953318!5m2!1sen!2s"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </div>
      </div>
      <div className="block-header block-header--has-breadcrumb block-header--has-title">
        <div className="container">
          <div className="block-header__body">
            <Breadcrumb current="Contact" />
            <h1 className="block-header__title">Contact Us</h1>
          </div>
        </div>
      </div>
      <div className="block">
        <div className="container container--max--lg">
          <div className="card">
            <div className="card-body card-body--padding--2">
              <div className="row">
                <div className="col-12 col-lg-6 pb-4 pb-lg-0">
                  <div className="mr-1">
                    <h4 className="contact-us__header card-title">
                      Our Address
                    </h4>
                    <div className="contact-us__address">
                      <p>
                        Main Entrance, G Mangolia Park, GT Road, Gujranwala
                        <br />
                        Email: sales@onestopcar.net
                        <br />
                        Phone Number: +92 (311) 053-20-34
                      </p>
                      <p>
                        <strong>Opening Hours</strong>
                        <br />
                        Monday to Friday: 10am-10pm
                        <br />
                        Saturday: 10am-10pm
                        <br />
                        Sunday: 10am-10pm
                      </p>
                      <p>
                        <strong>Comment</strong>
                        <br />
                        Your one-stop destination for premium automotive LED
                        lights, ensuring safety and style for every drive.
                        Explore our selection today for the ultimate driving
                        experience.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="ml-1">
                    <h4 className="contact-us__header card-title">
                      Leave us a Message
                    </h4>
                    <form onSubmit={doContact}>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label for="form-name">Your Name</label>
                          <input
                            type="text"
                            id="form-name"
                            className="form-control"
                            placeholder="Your Name"
                            name="name"
                            value={inputData?.name}
                            onChange={handleInput}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="form-email">Email</label>
                          <input
                            type="email"
                            id="form-email"
                            className="form-control"
                            placeholder="Email Address"
                            name="email"
                            value={inputData?.email}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="form-subject">Subject</label>
                        <input
                          type="text"
                          id="form-subject"
                          className="form-control"
                          placeholder="Subject"
                          name="subject"
                          value={inputData?.subject}
                          onChange={handleInput}
                        />
                      </div>
                      <div className="form-group">
                        <label for="form-subject">Phone</label>
                        <input
                          type="text"
                          id="form-subject"
                          className="form-control"
                          placeholder="Phone"
                          name="phone"
                          value={inputData?.phone}
                          onChange={handleInput}
                        />
                      </div>
                      <div className="form-group">
                        <label for="form-message">Message</label>
                        <textarea
                          id="form-message"
                          className="form-control"
                          rows="4"
                          name="message"
                          value={inputData?.message}
                          onChange={handleInput}
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending..." : "Send Message"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block-space block-space--layout--before-footer"></div>
    </>
  );
};

export default Contact_Us;
