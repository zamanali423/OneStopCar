import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { productContext } from "../../context/productContext/productContext";
import toast from "react-hot-toast";

const Login = () => {
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
      const response = await fetch(`${url}/users/login`, {
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
      <div className="col-md-6 d-flex">
        <div className="card flex-grow-1 mb-md-0 mr-0 mr-lg-3 ml-0 ml-lg-4">
          <div className="card-body card-body--padding--2">
            <h3 className="card-title">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="signin-email">Email address</label>
                <input
                  id="signin-email"
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
                <label for="signin-password">Password</label>
                <input
                  id="signin-password"
                  type="password"
                  className="form-control"
                  placeholder="Secret word"
                  name="password"
                  value={inputFields.password}
                  onChange={handleInput}
                  required
                />
                <small className="form-text text-muted">
                  <a href="">Forgot password?</a>
                </small>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <span className="input-check form-check-input">
                    <span className="input-check__body">
                      <input
                        className="input-check__input"
                        type="checkbox"
                        id="signin-remember"
                      />
                      <span className="input-check__box"></span>
                      <span className="input-check__icon">
                        <svg width="9px" height="7px">
                          <path d="M9,1.395L3.46,7L0,3.5L1.383,2.095L3.46,4.2L7.617,0L9,1.395Z" />
                        </svg>
                      </span>
                    </span>
                  </span>
                  <label className="form-check-label" for="signin-remember">
                    Remember Me
                  </label>
                </div>
              </div>
              <div className="form-group mb-0">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary mt-3"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
