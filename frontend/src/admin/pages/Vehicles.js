import React, { useContext } from "react";
import Navigate from "./Navigate";
import { productContext } from "../../context/productContext/productContext";

const Vehicles = () => {
  const { items } = useContext(productContext);
  return (
    <>
      <div className="block-space block-space--layout--after-header"></div>
      <div className="block">
        <div className="container container--max--xl">
          <div className="row">
            <Navigate />
            <div className="col-12 col-lg-9 mt-4 mt-lg-0">
              <div className="card">
                <div className="card-header">
                  <h5>Garage</h5>
                </div>
                <div className="card-divider"></div>
                <div className="card-body card-body--padding--2">
                  <div className="vehicles-list vehicles-list--layout--account">
                    <div className="vehicles-list__body">
                      {items.length > 0 ? (
                        items.map((product, index) => {
                          return (
                            <div className="vehicles-list__item" key={index}>
                              <div className="vehicles-list__item-info">
                                <div className="vehicles-list__item-name">
                                  {product?.title}
                                </div>
                                <div className="vehicles-list__item-details">
                                  SKU:{product?.sku} {product?.stock}
                                </div>
                                <div className="vehicles-list__item-links">
                                  <a href="">Show Parts</a>
                                </div>
                              </div>
                              <button
                                type="button"
                                className="vehicles-list__item-remove"
                              >
                                <svg width="16" height="16">
                                  <path d="M2,4V2h3V1h6v1h3v2H2z M13,13c0,1.1-0.9,2-2,2H5c-1.1,0-2-0.9-2-2V5h10V13z" />
                                </svg>
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <p>No product in garrage</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="card-divider"></div>
                <div className="card-header">
                  <h5>Add A Vehicle</h5>
                </div>
                <div className="card-divider"></div>
                <div className="card-body card-body--padding--2">
                  <div className="vehicle-form vehicle-form--layout--account">
                    <div className="vehicle-form__item vehicle-form__item--select">
                      <select
                        className="form-control form-control-select2"
                        aria-label="Year"
                      >
                        <option value="none">Select Year</option>
                        <option>2010</option>
                        <option>2011</option>
                        <option>2012</option>
                        <option>2013</option>
                        <option>2014</option>
                        <option>2015</option>
                        <option>2016</option>
                        <option>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                      </select>
                    </div>
                    <div className="vehicle-form__item vehicle-form__item--select">
                      <select
                        className="form-control form-control-select2"
                        aria-label="Brand"
                        disabled
                      >
                        <option value="none">Select Brand</option>
                        <option>Audi</option>
                        <option>BMW</option>
                        <option>Ferrari</option>
                        <option>Ford</option>
                        <option>KIA</option>
                        <option>Nissan</option>
                        <option>Tesla</option>
                        <option>Toyota</option>
                      </select>
                    </div>
                    <div className="vehicle-form__item vehicle-form__item--select">
                      <select
                        className="form-control form-control-select2"
                        aria-label="Model"
                        disabled
                      >
                        <option value="none">Select Model</option>
                        <option>Explorer</option>
                        <option>Focus S</option>
                        <option>Fusion SE</option>
                        <option>Mustang</option>
                      </select>
                    </div>
                    <div className="vehicle-form__item vehicle-form__item--select">
                      <select
                        className="form-control form-control-select2"
                        aria-label="Engine"
                        disabled
                      >
                        <option value="none">Select Engine</option>
                        <option>Gas 1.6L 125 hp AT/L4</option>
                        <option>Diesel 2.5L 200 hp AT/L5</option>
                        <option>Diesel 3.0L 250 hp MT/L5</option>
                      </select>
                    </div>
                    <div className="vehicle-form__divider">Or</div>
                    <div className="vehicle-form__item">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter VIN number"
                        aria-label="VIN number"
                      />
                    </div>
                  </div>
                  <div className="mt-4 pt-3">
                    <a href="" className="btn btn-sm btn-primary">
                      Add A Vehicle
                    </a>
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

export default Vehicles;
