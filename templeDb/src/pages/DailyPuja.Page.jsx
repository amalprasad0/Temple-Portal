// DailyPujaPage.js

import React, { useState } from 'react';
import { Form, Button, Dropdown, Card } from 'react-bootstrap';
import { NavBar } from '../components/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function DailyPujaPage() {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    pujaName: '',
    price: '',
    membername: '',
    star: '',
    date: ''
  });

  const isLogin = localStorage.getItem('login') === 'true';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAstroStarSelect = (selected) => {
    setFormData({ ...formData, star: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post data to the server
      confirm("പൂജാ വിശദാംശങ്ങൾ യഥാർത്ഥമാണെന്ന് ഞാൻ സ്ഥിരീകരിക്കുന്നു");
      const response = await axios.post('https://templedb-production.onrender.com/todaypuja', formData);

      if (response.status === 200) {
        if (response.data.success === true) {
          navigateTo("/added");
        } else {
          alert("Error in Adding Daily Puja Details");
        }
      } else {
        alert('Failed to add daily puja details. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
      console.error('Error adding daily puja details:', error);
    }
  };

  const nakshatrasMalayalam = [
    // ... your array of nakshatras
  ];

  return (
    <>
      {isLogin ? <NavBar /> : (
        <div>
          <h4 className="text-center mt-2 fw-semibold">ശ്രീ കിഴക്കൻകാവ് കിരാതേശ്വര ധർമ്മശാസ്താ ക്ഷേത്രം</h4>
          <p className="text-center mt-2">വിശദാംശങ്ങൾ മലയാളത്തിൽ പൂരിപ്പിക്കുക</p>
        </div>
      )}
      <div className="container mt-5">
        <Card bg="dark" text="light" className="mx-auto" style={{ maxWidth: '600px', borderRadius: '10px' }}>
          <Card.Header className="text-center">
            <h5>ദിനപ്പൂജ വിശദാംശങ്ങൾ</h5>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="pujaName">
                <Form.Label>പൂജാ പേര്:</Form.Label>
                <Form.Control
                  type="text"
                  name="pujaName"
                  value={formData.pujaName}
                  onChange={handleInputChange}
                  style={{ padding: '0.375rem 0.75rem' }}
                  required
                />
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>വില:</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  style={{ padding: '0.375rem 0.75rem' }}
                  required
                />
              </Form.Group>

              <Form.Group controlId="membername">
                <Form.Label>അംഗത്തിന്റെ പേര്:</Form.Label>
                <Form.Control
                  type="text"
                  name="membername"
                  value={formData.membername}
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

              <Form.Group controlId="date">
                <Form.Label>തിരഞ്ഞെടുത്ത തിയതി:</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
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
