import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavBar } from "../components/NavBar";
import { Player } from '@lottiefiles/react-lottie-player';
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
export function BirthdayDetailsPage() {
    const navigateTo=useNavigate()
  const [memberData, setMemberData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/memberdetails");
        setMemberData(response.data.memberdata);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const isLoggedIn = localStorage.getItem("login") == 'true';
        if (isLoggedIn) {
          navigateTo("/birthday");
        }else{
            navigateTo("/login");
        }

    fetchData();
  }, []);

  const currentDate = new Date();
  const filteredMembers = memberData
    .filter(
      (member) =>
        member.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.memberAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.mobileNo.includes(searchTerm) ||
        member.astroStar.includes(searchTerm)
    )
    .filter((member) => {
      const memberDob = new Date(member.memberDob);
      return (
        memberDob.getDate() === currentDate.getDate() &&
        memberDob.getMonth() === currentDate.getMonth()
      );
    });

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
                      {index + 1}: {member.memberName} - {member.astroStar}
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
                        <strong>മൊബൈൽ നമ്പർ:</strong> {member.mobileNo}
                      </p>
                      <p>
                        <strong>കുടുംബ പേര്: </strong> {member.familyName}
                      </p>
                      <p>
                        <strong>ജനനത്തീയതി:</strong> {member.memberDob}
                      </p>
                      <p>
                        <strong>നക്ഷത്രം:</strong> {member.astroStar}
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
