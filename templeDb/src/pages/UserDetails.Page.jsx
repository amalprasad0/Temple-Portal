// UserDetailsPage.js

import React, { useState } from 'react';
import { Form, Button, Dropdown, Card } from 'react-bootstrap';
import { NavBar } from '../components/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function UserDetailsPage() {
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({
    
  });
  const isLogin = localStorage.getItem('login') === 'true';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAstroStarSelect = (selected) => {
    setFormData({ ...formData, star: selected });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      // Post data to the server
      confirm("എന്റെ / എന്റെ കുടുംബാംഗത്തിന്റെ വിശദാംശങ്ങൾ യഥാർത്ഥമാണെന്ന് ഞാൻ സ്ഥിരീകരിക്കുന്നു");
      const response = await axios.post('https://templedb-production.onrender.com/userdetails', formData);
        console.log(response)
      if (response.status === 200) {
        if(response.data.success==true){
            navigateTo("/added");
        }else{
            alert("Error in Updating User Details")
        }
      } else {
        alert('Failed to submit user details. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
      console.error('Error submitting user details:', error);
    }
  };
  const nakshatrasMalayalam = [
    "അശ്വതി",
    "ഭരണി",
    "കാര്‍ത്തിക",
    "രോഹിണി",
    "മകയിരം",
    "തിരുവാതിര",
    "പുണർതം",
    "പൂയം",
    "ആയില്യം",
    "മകം",
    "പൂരം",
    "ഉത്രം",
    "അത്തം",
    "ചിത്തിര",
    "ചോതി",
    "വിശാഖം",
    "അനിഴം",
    "തൃക്കേട്ട",
    "മൂലം",
    "പൂരാടം",
    "ഉത്രാടം",
    "തിരുവോണം",
    "അവിട്ടം",
    "ചതയം",
    "ഉത്രട്ടാതി",
    "രേവതി"
  ];
  return (
    <>
      {isLogin ?<NavBar />:<div>
        <h4 className="text-center mt-2 fw-semibold">ശ്രീ കിഴക്കൻകാവ് കിരാതേശ്വര ധർമ്മശാസ്താ ക്ഷേത്രം</h4>
        <p className="text-center mt-2">വിശദാംശങ്ങൾ മലയാളത്തിൽ പൂരിപ്പിക്കുക</p>
        </div>}
      <div className="container mt-5">
        <Card bg="dark" text="light" className="mx-auto" style={{ maxWidth: '600px', borderRadius: '10px' }}>
          <Card.Header className="text-center">
            <h5>അംഗങ്ങളുടെ വിശദാംശങ്ങളുടെ ഫോം</h5>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="memberName">
                <Form.Label>അംഗത്തിന്റെ പേര്:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{ padding: '0.375rem 0.75rem' }}
                  required
                />
              </Form.Group>

              <Form.Group controlId="mobileNo">
                <Form.Label>മൊബൈൽ നമ്പർ:</Form.Label>
                <Form.Control
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  style={{ padding: '0.375rem 0.75rem' }}
                  required
                />
              </Form.Group>

              <Form.Group controlId="memberAddress">
                <Form.Label>വിലാസം:</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={{ padding: '0.375rem 0.75rem' }}
                  required
                />
              </Form.Group>

              <Form.Group controlId="memberDob">
                <Form.Label>ജനനത്തീയതി:</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  style={{ padding: '0.375rem 0.75rem' }}
                  required
                />
              </Form.Group>

              <Form.Group controlId="star">
                <Form.Label>നക്ഷത്രം:</Form.Label>
                <Dropdown onSelect={handleAstroStarSelect}>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ padding: '0.375rem 0.75rem' }}>
                    {formData.star || 'നക്ഷത്രം തിരഞ്ഞെടുക്കുക'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {nakshatrasMalayalam.map((nakshatra, index) => (
                      <Dropdown.Item key={index} eventKey={nakshatra}>
                        {nakshatra}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              <Form.Group controlId="pincode">
                <Form.Label>പിൻ കോഡ്:</Form.Label>
                <Form.Control
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  style={{ padding: '0.375rem 0.75rem' }}
                  required
                />
              </Form.Group>

              <Form.Group controlId="family">
                <Form.Label>കുടുംബ പേര്:</Form.Label>
                <Form.Control
                  type="text"
                  name="familyName"
                  value={formData.familyName}
                  onChange={handleInputChange}
                  style={{ padding: '0.375rem 0.75rem' }}
                  required
                />
              </Form.Group>

              <Form.Group controlId="memberArea">
                <Form.Label>സ്ഥലം</Form.Label>
                <Form.Control
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  style={{ padding: '0.375rem 0.75rem' }}
                  required
                />
              </Form.Group>
            
              <Button variant="primary" type="submit" style={{ width: '100%' }} className="my-4">
              വിവരങ്ങൾ ചേർക്കുക
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <p className='text-center mt-4'>© Developed by Bharath Prayok Softwares Chittarikkal</p>
    </>
  );
}
