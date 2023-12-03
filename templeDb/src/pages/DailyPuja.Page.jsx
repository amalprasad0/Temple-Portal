// DailyPujaPage.js

import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, Card } from 'react-bootstrap';
import { NavBar } from '../components/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function DailyPujaPage() {
    const today = new Date().toISOString().split('T')[0];
  const navigateTo = useNavigate();
  const [pujas, setPujas] = useState([]);
  const [selectedPuja, setSelectedPuja] = useState('');
  const [pujaPrice, setPujaPrice] = useState('');
  const [formData, setFormData] = useState({
    star: '',
    date: today,
  });

  useEffect(() => {
    // Fetch all pujas from the server
    const fetchPujas = async () => {
      try {
        const response = await axios.get('https://templedb-production.onrender.com/getallpujadetails');
        if (response.data.success) {
          setPujas(response.data.allPujas);
        } else {
          console.error('Failed to fetch pujas:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching pujas:', error);
      }
    };
    const isLoggedIn = localStorage.getItem("login") == 'true';
    if (!isLoggedIn) {
      navigateTo("/");
    }
    fetchPujas();
  }, []);
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
  const handlePujaSelect = (selectedPujaId) => {
    const selectedPujaDetails = pujas.find((puja) => puja.id === selectedPujaId);
    setSelectedPuja(selectedPujaDetails.pujaName);
    setPujaPrice(selectedPujaDetails.price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get today's date in YYYY-MM-DD format

    try {
      // Post data to the server
      const response = await axios.post('https://templedb-production.onrender.com/todaypuja', {
        pujaName: selectedPuja,
        price: pujaPrice,
        star: formData.star,
        date: formData.date,
      });

      if (response.status === 200 && response.data.success) {
       alert("പൂജ കൂട്ടിച്ചേർത്തു") // You can redirect to the desired page
      } else {
        alert('പ്രതിദിന പൂജാ വിശദാംശങ്ങൾ സമർപ്പിക്കുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.');
      }
    } catch (error) {
      alert('ഒരു പിശക് സംഭവിച്ചു. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.');
      console.error('Error submitting daily puja details:', error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <Card bg="dark" text="light" className="mx-auto" style={{ maxWidth: '600px', borderRadius: '10px' }}>
          <Card.Header className="text-center">
            <h5>ദിനപ്പടയുടെ പൂജാ ഫോം</h5>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="pujaName">
                <Form.Label>പൂജാ പേര്:</Form.Label>
                <Dropdown onSelect={handlePujaSelect}>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ padding: '0.375rem 0.75rem' }}>
                    {selectedPuja || 'പൂജാ തിരഞ്ഞെടുക്കുക'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {pujas.map((puja) => (
                      <Dropdown.Item key={puja.id} eventKey={puja.id}>
                        {puja.pujaName}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              <p className='my-3'>പൂജ വില:<strong className='fs-2'> ₹ {pujaPrice}/-</strong></p>

              <Form.Group controlId="star">
                <Form.Label>നക്ഷത്രം:</Form.Label>
                <Dropdown onSelect={(selected) => setFormData({ ...formData, star: selected })}>
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
                <Form.Label>തീയതി:</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date || today}
                  onChange={handleInputChange}
                  style={{ padding: '0.375rem 0.75rem' }}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" style={{ width: '100%' }} className="my-4">
                പൂജാ ചേർക്കുക
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <p className="text-center mt-4">© Developed by Bharath Prayok Softwares Chittarikkal</p>
    </>
  );
}
