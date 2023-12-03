import axios from "axios";
import React, { useState,useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { NavBar } from "../components/NavBar";

export function AdminPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [Passcode, setPasscode] = useState("");
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("login") == 'true';
    if (!isLoggedIn) {
      navigateTo("/");
    }
  }, []);
  const handleGeneratePasscode = async () => {
    if(mobileNumber!=""){
    try {
      const resp = await axios.post("https://templedb-production.onrender.com/userCode", {
        phoneNumber: mobileNumber,
      });
      if (resp.data.userCodeExists == true) {
        alert(`Already Passcode Generated for this number`);
        setPasscode("*****")
      } else {
        console.log(resp.data);
        setPasscode(resp.data.userCode);
      }
    } catch (err) {
      console.log("err->", err);
    }
}else{
    alert('Please enter a valid Mobile Number')
}
  };
  const handleCodeClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Generated Code for temple web Portal",
          text: `Passcode generated for ${mobileNumber}: **${Passcode}**. Please do not share this Passcode`,
        });
      } catch (error) {
        console.error("Error sharing code:", error);
      }
    } else {
      console.log(`Fallback: Share this code: ${Passcode}`);
    }
  };
  return (
    <>
      <NavBar />
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#343541" }}
    >
        
      <Card style={{ width: "300px" }}>
        <Card.Body>
          <Card.Title className="text-center">Generate passcode</Card.Title>
          <Form>
            <Form.Group controlId="formMobileNumber" className="my-5">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              onClick={handleGeneratePasscode}
              style={{ width: "100%" }}
            >
              Generate Passcode
            </Button>
          </Form>
          <div className="text-center mt-4">
            <p>
              Generated Code is{" "}
              <span
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={handleCodeClick}
              >
                <h1>{Passcode}</h1>
              </span>
            </p>
          </div>
        </Card.Body>
      </Card>
    </div>
    </>
  );
}
