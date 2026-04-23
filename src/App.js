import React, { useState } from "react";

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState("");

  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");
  const [graphUrl, setGraphUrl] = useState("");


  // REGISTER

  const handleRegister = async () => {

    const response = await fetch(
      "https://bmi-monitor-backend-1.onrender.com/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          height: parseFloat(height)
        })
      }
    );

    const data = await response.json();

    alert(data.message);

  };

  // LOGIN

  const handleLogin = async () => {

    const response = await fetch(
      "https://bmi-monitor-backend-1.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const data = await response.json();

    alert(data.message);

    if (data.user_id) {

      localStorage.setItem(
        "user_id",
        data.user_id
      );

      setLoggedIn(true);

    }

  };

  // ADD MEASUREMENT

  const handleAddMeasurement = async () => {

    const user_id =
      localStorage.getItem("user_id");

    const response = await fetch(
      "https://bmi-monitor-backend-1.onrender.com/add-measurement",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id,
          weight: parseFloat(weight),
          date
        })
      }
    );

    const data = await response.json();

    alert(
      "BMI: " + 
      data.bmi +
      "\nCategory: " +
      data.category
    );

  };

  // SHOW GRAPH

  const showBMIGraph = () => {

    const user_id =
      localStorage.getItem("user_id");

    setGraphUrl(
      `https://bmi-monitor-backend-1.onrender.com/bmi-graph/${user_id}`
    );

  };

  const showWeightGraph = () => {

    const user_id =
      localStorage.getItem("user_id");

    setGraphUrl(
      `https://bmi-monitor-backend-1.onrender.com/weight-graph/${user_id}`
    );

  };

  // DASHBOARD VIEW

  if (loggedIn) {

    return (

      <div
        style={{
          padding: "30px",
          backgroundColor: "#e6ffe6",
          minHeight: "100vh"
        }}
      >

        <h1>Dashboard</h1>
        <p> Developed by Dr. Israel Ndungu </p>
        
        <button
          onClick={() => {

            localStorage.removeItem("user_id");

            setLoggedIn(false);

          }}
          style={{
            marginBottom: "20px"
          }}
        >
          Logout
        </button>


        <h3>Add Measurement</h3>

        <div style={{ marginBottom: "10px" }}>

          <input
            type="number"
            placeholder="Enter Weight (kg)"
            value={weight}
            onChange={(e) =>
              setWeight(e.target.value)
            }
          />

        </div>

        <div style={{ marginBottom: "10px" }}>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />

        </div>

        <button
          onClick={handleAddMeasurement}
        >
          Add Measurement
        </button>

        <div style={{ marginTop: "20px" }}>

          <button onClick={showBMIGraph}>
            View BMI Graph
          </button>

        </div>

        <div style={{ marginTop: "10px" }}>

          <button onClick={showWeightGraph}>
            View Weight Graph
          </button>

        </div>

        {graphUrl && (

          <div style={{ marginTop: "20px" }}>

            <img
              src={graphUrl}
              alt="Graph"
              style={{
                width: "100%",
                maxWidth: "600px"
              }}
            />

          </div>

        )}      
      </div>

    );

  }

  // LOGIN / REGISTER VIEW

  return (

    <div
      style={{
        padding: "30px",
        backgroundColor: "#e6ffe6",
        minHeight: "100vh"
      }}
    >

      <h1>BMI Monitor System</h1>

      <h2>

        {isLogin ? "Login" : "Register"}

      </h2>

      <div style={{ marginBottom: "10px" }}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

      </div>

      <div style={{ marginBottom: "10px" }}>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

      </div>

      {!isLogin && (

        <div style={{ marginBottom: "10px" }}>

          <input
            type="number"
            placeholder="Enter Height (cm)"
            value={height}
            onChange={(e) =>
              setHeight(e.target.value)
            }
          />

        </div>

      )}

      {isLogin ? (

        <button onClick={handleLogin}>
          Login
        </button>

      ) : (

        <button onClick={handleRegister}>
          Register
        </button>

      )}

      <div style={{ marginTop: "15px" }}>

        <button
          onClick={() =>
            setIsLogin(!isLogin)
          }
        >

          {isLogin
            ? "Go to Register"
            : "Go to Login"}

        </button>

      </div>

    </div>

  );

}

export default App;
