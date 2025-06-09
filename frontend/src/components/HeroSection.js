import React, { useContext, useEffect, useState } from "react";
import bg from "../assets/images/bg.jpg";
import { toast } from "react-hot-toast";
import { productContext } from "../context/productContext/productContext";
import Modal from "react-modal";

const HeroSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { url } = useContext(productContext);
  const [inputData, setInputData] = useState({
    name: "",
    model: "",
    year: "",
    beam: "",
  });
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (inputData[name] !== value) {
      setInputData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getSubCategory = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        `${url}/shop/categories?name=${inputData.name}&model=${inputData.model}&year=${inputData.year}&beam=${inputData.beam}`
      );

      if (!res.ok) throw new Error("Model not found");

      const subCat = await res.json();
      const yearValue = parseInt(inputData.year);
      const validYears = Array.isArray(subCat.years)
        ? subCat.years.filter(
            (entry) =>
              entry.from <= yearValue &&
              entry.to >= yearValue &&
              entry.beams.some((b) => b.beam === inputData.beam)
          )
        : [];

      if (validYears.length === 0) {
        throw new Error("No matching year or beam found");
      }

      const filteredBeams = validYears.flatMap((entry) =>
        entry.beams.filter((b) => b.beam === inputData.beam)
      );

      const categories = filteredBeams.map((b) => b.category);
      setCategory(categories);
      setOpen(true);
      setInputData({ name: "", model: "", year: "", beam: "" });
    } catch (error) {
      toast(error.message || "Internal server error", {
        icon: "❌",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const carModels = {
    toyota: ["Carolla", "Prius", "Camry", "Premio", "Yaris", "Hilux", "Vitz"],
    honda: ["Civic", "City", "Br-v", "Air Wave", "Fit", "Vezel"],
    suzuki: ["Alto", "Cultus", "Mehran", "Every", "Wagon R", "Swift"],
    changan: ["Alsvin", "Karvan"],
    nissan: ["Dayz", "Otti", "Juke", "Note"],
    hundai: ["Tucson", "Sonata", "Santro"],
    kia: ["Sportage", "Carnival", "Picanto"],
    daihatsu: ["Qoure", "Mira", "Move"],
  };

  const years = Array.from({ length: 2025 - 1980 + 1 }, (_, i) => 1980 + i);

  return (
    <>
      <div className="block-finder block">
        <div
          className="block-finder__image"
          style={{ backgroundImage: `url(${bg})` }}
        ></div>
        <div className="block-finder__body container container--max--xl">
          <div className="block-finder__title">
            Illuminate Your Drive with OneStopCar LED Lights
          </div>
          <div className="block-finder__subtitle">
            If not sure about LED size, search here
          </div>

          <form className="block-finder__form" onSubmit={getSubCategory}>
            {/* Vehicle Company */}
            <div className="block-finder__form-control block-finder__form-control--select">
              <select
                name="name"
                value={inputData.name}
                onChange={handleInput}
                aria-label="Vehicle Company"
              >
                <option value="">Select Company</option>
                {Object.keys(carModels).map((company) => (
                  <option key={company} value={company}>
                    {company.charAt(0).toUpperCase() + company.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle Model */}
            <div className="block-finder__form-control block-finder__form-control--select">
              <select
                name="model"
                value={inputData.model}
                onChange={handleInput}
                aria-label="Vehicle Model"
                disabled={!inputData.name}
              >
                <option value="">Select Model</option>
                {carModels[inputData.name]?.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle Year */}
            <div className="block-finder__form-control block-finder__form-control--select">
              <select
                name="year"
                value={inputData.year}
                onChange={handleInput}
                aria-label="Vehicle Year"
                disabled={!inputData.model}
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Beam Type */}
            <div className="block-finder__form-control block-finder__form-control--select">
              <select
                name="beam"
                value={inputData.beam}
                onChange={handleInput}
                aria-label="Vehicle Beam"
                disabled={!inputData.year}
              >
                <option value="">Select Beam</option>
                <option value="low">Low Beam</option>
                <option value="high">High Beam</option>
                <option value="both">Both</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="block-finder__form-control block-finder__form-control--button"
              disabled={!inputData.beam || isLoading}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>
      </div>

      {/* Modal to display available categories */}
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        contentLabel="Category Modal"
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            width: "300px",
            textAlign: "center",
          },
        }}
      >
        <h3>Available Categories</h3>
        {category.length > 0 ? (
          category.map((cat, index) => <h3 key={index}>{cat}</h3>)
        ) : (
          <h3>No categories found</h3>
        )}
        <button
          onClick={() => setOpen(false)}
          style={{
            marginTop: "20px",
            padding: "8px 16px",
            border: "none",
            backgroundColor: "#2D5BE3",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </Modal>
    </>
  );
};

export default HeroSection;
