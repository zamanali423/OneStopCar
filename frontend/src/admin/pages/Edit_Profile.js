import React from "react";
import Navigate from "./Navigate";
const Edit_Profile = () => {
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
                  <h5>Edit Profile</h5>
                </div>
                <div className="card-divider"></div>
                <div className="card-body card-body--padding--2">
                  <div className="row no-gutters">
                    <div className="col-12 col-lg-7 col-xl-6">
                      <div className="form-group">
                        <label for="profile-first-name">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="profile-first-name"
                          placeholder="First Name"
                        />
                      </div>
                      <div className="form-group">
                        <label for="profile-last-name">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="profile-last-name"
                          placeholder="Last Name"
                        />
                      </div>
                      <div className="form-group">
                        <label for="profile-email">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          id="profile-email"
                          placeholder="Email Address"
                        />
                      </div>
                      <div className="form-group">
                        <label for="profile-phone">Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          id="profile-phone"
                          placeholder="Phone Number"
                        />
                      </div>
                      <div className="form-group mb-0">
                        <button className="btn btn-primary mt-3">Save</button>
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

export default Edit_Profile;
