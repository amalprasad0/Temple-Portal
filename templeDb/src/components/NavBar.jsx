import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

export function NavBar() {
  const isAdmin = localStorage.getItem('admin') === 'true';
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#/member">ക്ഷേത്രം പോർട്ടൽ</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#/userdetails">വിവരങ്ങൾ ചേർക്കുക</Nav.Link>
              <Nav.Link href="#/birthday">ഇന്ന് ജന്മദിനം</Nav.Link>
              <Nav.Link href="#send-notification">അറിയിപ്പ് അയയ്ക്കുക</Nav.Link>
              <Nav.Link href="#/member">അംഗങ്ങളുടെ വിശദാംശങ്ങൾ</Nav.Link>
              <Nav.Link onClick={()=>{
                localStorage.removeItem('login')
                window.location.reload();
              }}>Sign Out</Nav.Link>
              {isAdmin && <Nav.Link href="#/genereatecode">Generate Passcode</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
