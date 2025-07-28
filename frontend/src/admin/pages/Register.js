import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { productContext } from "../../context/productContext/productContext";
import toast from "react-hot-toast";
import Login from "./Login";
const Register = () => {
  const navigate = useNavigate();
  const { setToken, url } = useContext(productContext);
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInput = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${url}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputFields),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.msg);
        setIsSubmitting(false);
        return;
      }

      const token = data.token;
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/dashboard");
      toast.success(data.msg);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
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
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label for="signup-email">Email address</label>
                      <input
                        id="signup-email"
                        type="email"
                        className="form-control"
                        placeholder="customer@example.com"
                          name="email"
                  value={inputFields.email}
                  onChange={handleInput}
                  required
                      />
                    </div>
                    <div className="form-group">
                      <label for="signup-password">Password</label>
                      <input
                        id="signup-password"
                        type="password"
                        className="form-control"
                        placeholder="Secret word"
                          name="password"
                  value={inputFields.password}
                  onChange={handleInput}
                  required
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
