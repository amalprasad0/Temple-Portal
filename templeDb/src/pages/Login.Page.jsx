import React, { useState,useEffect } from "react";
import { baseUrl, userReg } from "../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function LoginPage() {
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("login") == 'true';
        if (isLoggedIn) {
          navigateTo("/member");
        }else{
            navigateTo("/login");
        }
      }, []);
const navigateTo=useNavigate()
  const [response, setResponse] = useState(null);
  const onSubmit = async () => {
    try {
      let username = document.getElementById("mobile").value;
      let password = document.getElementById("passcode").value;

      if (username === "" || password === "") {
        alert("നിങ്ങൾ മൊബൈൽ നമ്പറും പാസ്‌കോഡും നൽകിയിട്ടില്ല");
      } else {
        const resp = await axios.post(`${baseUrl}${userReg}`, {
          phoneNumber: username, // Replace with actual phone number
          UserCode: password, // Replace with actual user code
        });
        
        setResponse(resp.data.userReg);
        console.log(resp)
        console.log(response);
        if (resp.data.userReg == true) {
          alert("ഉപയോക്തൃ രജിസ്ട്രേഷൻ വിജയകരമായി");
          navigateTo("/member")
          localStorage.setItem("login",true);
          if(username=="7306557354" || username=="9497601749"){
            localStorage.setItem("admin",true);
        }else{
            localStorage.setItem('admin',false);
        }
        } else {
          alert("ഉപയോക്തൃ രജിസ്ട്രേഷൻ വിജയിച്ചില്ല");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Not Registered");
    }
  };

  return (
    <div className="d-flex bg-dark align-items-center justify-content-center vh-100">
      <div className="card p-4 text-center">
        <div className="logo mb-4">
          <img
            src="https://i.pinimg.com/736x/9d/83/a8/9d83a8ac38fa33022fb0f83d0394d01a.jpg"
            width={200}
            height={200}
            alt="logo"
            className="img-fluid rounded-circle"
          />
        </div>
        <h6 className="mb-4">ശ്രീ കിഴക്കൻ കാവ് ക്ഷേത്ര പോർട്ടൽ</h6>

        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            Mobile:
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            className="form-control"
            placeholder="Enter your mobile number"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passcode" className="form-label">
            Passcode:
          </label>
          <input
            type="password"
            id="passcode"
            name="passcode"
            className="form-control"
            placeholder="Enter your passcode"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={() => {
            onSubmit();
          }}
        >
         ലോഗിൻ ചെയുക
        </button>
        <h6 className="py-3">Developed by Liquid Loop Codes Chittarikkal </h6>
      </div>
    </div>
  );
}
