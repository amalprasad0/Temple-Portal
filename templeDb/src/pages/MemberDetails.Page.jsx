import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavBar } from "../components/NavBar";
import { Player } from '@lottiefiles/react-lottie-player';
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
export function MemberDetailsPage() {
    const navigateTo=useNavigate()
  const [memberData, setMemberData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://templedb-production.onrender.com/memberdetails");
        setMemberData(response.data.memberdata);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const isLoggedIn = localStorage.getItem("login") == 'true';
        if (isLoggedIn) {
          navigateTo("/member");
        }else{
            navigateTo("/");
        }
    fetchData();
  }, []);

  const filteredMembers = memberData.filter(
    (member) =>
      member.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.memberAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.mobileNo.includes(searchTerm) ||
      member.astroStar.includes(searchTerm)
  );

  return (
    <div>
      <NavBar />
      <Container>
        {loading ? (
          <div className="text-center mt-5">
            <Player
              src='https://lottie.host/b5622132-96c5-49f0-90d1-2a6d3277c536/QjDk2AsAZB.json'
              autoplay
              loop
              style={{ height: '300px', width: '300px' }}
            />
          </div>
        ) : (
          <>
            <div
              className="search-bar my-3"
              style={{
                border: "5px solid #ced4da",
                borderRadius: "5px",
              }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="പേര്, വിലാസം, മൊബൈൽ നമ്പർ, നക്ഷത്രം"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  border: "1px solid #ced4da",
                  borderRadius: "5px",
                }}
              />
            </div>

            <div className="accordion accordion-flush" id="accordionFlushExample">
              {filteredMembers.map((member, index) => (
                <div key={index} className="accordion-item">
                  <h2 className="accordion-header" id={`flush-heading${index}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#flush-collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`flush-collapse${index}`}
                    >
                      {index + 1}: {member.memberName} - {member.familyName}
                    </button>
                  </h2>
                  <div
                    id={`flush-collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`flush-heading${index}`}
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>Mobile Number:</strong> {member.mobileNo}
                      </p>
                      <p>
                        <strong>Family Name: </strong> {member.familyName}
                      </p>
                      <p>
                        <strong>Member Address:</strong> {member.memberAddress}
                      </p>
                      <p>
                        <strong>Date of Birth:</strong> {member.memberDob}
                      </p>
                      <p>
                        <strong>Astro Star:</strong> {member.astroStar}
                      </p>
                      <p>
                        <strong>Pin Code:</strong> {member.pinCode}
                      </p>
                      <p>
                        <strong>Member Area:</strong> {member.memberArea}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
