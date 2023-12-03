// PujaPage.js

import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { NavBar } from '../components/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function PujaPage() {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    pujaName: '',
    price: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
   
      const response = await axios.post('https://templedb-production.onrender.com/pujaadd', formData);

      if (response.status === 200) {
        if (response.data.success === true) {
          alert("പൂജയുടെ വിശദാംശങ്ങൾ ചേർത്തു")
        } else {
          alert("പൂജ ചേർക്കുന്നതിൽ പിശക്. ദയവായി വീണ്ടും ശ്രമിക്കുക.");
        }
      } else {
        alert('പൂജാ വിശദാംശങ്ങൾ സമർപ്പിക്കുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
      console.error('Error submitting puja details:', error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <Card bg="dark" text="light" className="mx-auto" style={{ maxWidth: '600px', borderRadius: '10px' }}>
          <Card.Header className="text-center">
            <h5>പൂജ വിശദാംശങ്ങൾ</h5>
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

              <Button variant="primary" type="submit" style={{ width: '100%' }} className="my-4">
                പൂജ ചേർക്കുക
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <p className='text-center mt-4'>© Developed by Bharath Prayok Softwares Chittarikkal</p>
    </>
  );
}
