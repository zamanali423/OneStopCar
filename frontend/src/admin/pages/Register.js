import React from "react";
import Login from "./Login";
const Register = () => {
  return (
    <>
      <div className="block-space block-space--layout--after-header"></div>
      <div className="block">
        <div className="container container--max--lg">
          <div className="row">
            {/* login */}
            <Login />
            {/* register */}
            <div className="col-md-6 d-flex mt-4 mt-md-0">
              <div className="card flex-grow-1 mb-0 ml-0 ml-lg-3 mr-0 mr-lg-4">
                <div className="card-body card-body--padding--2">
                  <h3 className="card-title">Register</h3>
                  <form>
                    <div className="form-group">
                      <label for="signup-email">Email address</label>
                      <input
                        id="signup-email"
                        type="email"
                        className="form-control"
                        placeholder="customer@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label for="signup-password">Password</label>
                      <input
                        id="signup-password"
                        type="password"
                        className="form-control"
                        placeholder="Secret word"
                      />
                    </div>
                    <div className="form-group">
                      <label for="signup-confirm">Repeat password</label>
                      <input
                        id="signup-confirm"
                        type="password"
                        className="form-control"
                        placeholder="Secret word"
                      />
                    </div>
                    <div className="form-group mb-0">
                      <button type="submit" className="btn btn-primary mt-3">
                        Register
                      </button>
                    </div>
                  </form>
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

export default Register;
