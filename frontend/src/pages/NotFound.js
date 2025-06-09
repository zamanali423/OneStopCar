import React from "react";

const NotFound = () => {
  return (
    <>
      <div className="block-space block-space--layout--spaceship-ledge-height"></div>
      <div className="block">
        <div className="container">
          <div className="not-found">
            <div className="not-found__404">Oops! Error 404</div>
            <div className="not-found__content">
              <h1 className="not-found__title">Page Not Found</h1>
              <p className="not-found__text">
                We can't seem to find the page you're looking for.
                <br />
                Try to use the search.
              </p>
              <form className="not-found__search">
                <input
                  type="text"
                  className="not-found__search-input form-control"
                  placeholder="Search Query..."
                />
                <button
                  type="submit"
                  className="not-found__search-button btn btn-primary"
                >
                  Search
                </button>
              </form>
              <p className="not-found__text">
                Or go to the home page to start over.
              </p>
              <a className="btn btn-secondary btn-sm" href="/">
                Go To Home Page
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="block-space block-space--layout--before-footer"></div>
    </>
  );
};

export default NotFound;
