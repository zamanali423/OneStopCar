import React from "react";
import Navigate from "./Navigate";
const Change_Password = () => {
  return (
    <>
      <div className="block-space block-space--layout--after-header"></div>
      <div className="block">
        <div className="container container--max--xl">
          <div className="row">
            <Navigate/>
            <div className="col-12 col-lg-9 mt-4 mt-lg-0">
              <div className="card">
                <div className="card-header">
                  <h5>Change Password</h5>
                </div>
                <div className="card-divider"></div>
                <div className="card-body card-body--padding--2">
                  <div className="row no-gutters">
                    <div className="col-12 col-lg-7 col-xl-6">
                      <div className="form-group">
                        <label for="password-current">Current Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password-current"
                          placeholder="Current Password"
                        />
                      </div>
                      <div className="form-group">
                        <label for="password-new">New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password-new"
                          placeholder="New Password"
                        />
                      </div>
                      <div className="form-group">
                        <label for="password-confirm">
                          Reenter New Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password-confirm"
                          placeholder="Reenter New Password"
                        />
                      </div>
                      <div className="form-group mb-0">
                        <button className="btn btn-primary mt-3">Change</button>
                      </div>
                    </div>
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

export default Change_Password;
