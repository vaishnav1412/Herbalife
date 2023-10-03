import React, { useEffect, useState } from "react";
import "./bmi.css";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import instance from "../../Axios/axiosConfig";

const Bmi = () => {
  const dispatch = useDispatch();
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [user, setUser] = useState("");

  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");

  const fetchUserDetails = async () => {
    try {
      dispatch(showLoading());

      instance
        .post("/api/user/profiledetails")
        .then((response) => {
          setUser(response.data.data);
          dispatch(hideLoading());
        })
        .catch((error) => {
          dispatch(hideLoading());
          toast.error("something went worng......");
        });
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error fetching user details", error);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  const id = user._id;
  let calcBmi = (event) => {
    event.preventDefault();
    if (weight === 0 || height === 0) {
      if (weight === 0) {
        setError("Please enter a valid weight");
      }
      if (height === 0) {
        setError1("Please enter a valid height");
      }
    } else {
      let convertedWeight = weight;
      let convertedHeight = height;

      if (weightUnit === "gram") {
        convertedWeight = weight / 1000;
      } else if (weightUnit === "pound") {
        convertedWeight = weight * 0.453592;
      }

      if (heightUnit === "meter") {
        convertedHeight = height * 100;
      } else if (heightUnit === "inch") {
        convertedHeight = height * 2.54;
      } else if (heightUnit === "feet") {
        convertedHeight = height * 30.48;
      }

      const bmiValue =
        (convertedWeight / (convertedHeight * convertedHeight)) * 10000;
      setBmi(bmiValue.toFixed(2));

      if (bmiValue < 23) {
        setMessage("You are under weight...");
      } else if (bmiValue >= 23 && bmiValue < 27) {
        setMessage1("You are a healthy weight...");
      } else if (bmiValue >= 27 && bmiValue < 31) {
        setMessage("You are over weight...");
      } else if (bmiValue >= 31 && bmiValue < 36) {
        setMessage("You are OBESE...");
      } else {
        setMessage("You are extremly OBESE...");
      }
    }
  };

  let imgSrc;
  if (bmi < 1) {
    imgSrc = null;
  } else {
    if (bmi < 23) {
      imgSrc = require("../../assets/bmi/under-removebg-preview.png");
    } else if (bmi >= 23 && bmi < 27) {
      imgSrc = require("../../assets/bmi/normal-removebg-preview.png");
    } else if (bmi >= 27 && bmi < 31) {
      imgSrc = require("../../assets/bmi/much-higher-removebg-preview.png");
    } else if (bmi >= 31 && bmi < 36) {
      imgSrc = require("../../assets/bmi/much-more-removebg-preview.png");
    } else {
      imgSrc = require("../../assets/bmi/over-removebg-preview.png");
    }
  }
  const updatebmi = async () => {
    const formData = {
      bmi,
      id,
    };

    const response = await instance.post("/api/user/savebmi", formData);

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast("something went worng");
    }
  };

  useEffect(() => {
    updatebmi();
  }, [bmi]);

  let reload = () => {
    window.location.reload();
  };

  return (
    <div
      className="bmi_app"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: "20px",
        marginBottom: "15px",
      }}
    >
      <div
        className="bmi_container"
        style={{
          boxShadow: "0px 0px 12px #ccc",
          borderRadius: "8px",
          padding: "1rem",
        }}
      >
        <h2 className="bmi_center text-2xl font-bold">BMI calculator</h2>
        <form onSubmit={calcBmi}>
          <div className="input-group">
            <label>Weight</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                className="input_bmi"
                style={{
                  width: "70%",
                  fontSize: "1.2rem",
                  padding: "8px 4px",
                  margin: "8px 0",
                  borderRadius: "8px",
                  backgroundColor: "lightslategrey",
                }}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value)}
                style={{
                  fontSize: "1.2rem",
                  margin: "8px 0",
                  marginLeft: "8px",
                  borderRadius: "8px",
                  backgroundColor: "ThreeDFace",
                }}
              >
                <option value="kg">kg</option>
                <option value="gram">gram</option>
                <option value="pound">pound</option>
              </select>
            </div>
            <p className="error">{error}</p>
          </div>
          <div className="input-group">
            <label>Height</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                className="input_bmi"
                style={{
                  width: "70%",
                  fontSize: "1.2rem",
                  padding: "8px 4px",
                  margin: "8px 0",
                  borderRadius: "8px",
                  backgroundColor: "lightslategrey",
                }}
                value={height}
                onChange={(event) => setHeight(event.target.value)}
              />
              <select
                value={heightUnit}
                onChange={(e) => setHeightUnit(e.target.value)}
                style={{
                  fontSize: "1.2rem",
                  margin: "8px 0",
                  marginLeft: "8px",
                  borderRadius: "8px",
                  backgroundColor: "ThreeDFace",
                }}
              >
                <option value="cm">cm</option>
                <option value="meter">meter</option>
                <option value="inch">inch</option>
                <option value="feet">feet</option>
              </select>
            </div>
            <p className="error">{error1}</p>
          </div>
          <div>
            <button className="btn" type="submit">
              Submit
            </button>
            <button className="btn btn_outline" type="button" onClick={reload}>
              Reload
            </button>
          </div>
        </form>
        <div className="bmi_center" style={{ textAlign: "center" }}>
          <h3>Your BMI is: {bmi}</h3>
          <p className="error">{message}</p>
          <p className="success">{message1}</p>
        </div>
        <div
          className="imag_container"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={imgSrc} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Bmi;
