import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

export function NavBar() {
  const isAdmin = localStorage.getItem("admin") === "true";
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#/member">ക്ഷേത്രം പോർട്ടൽ</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">#/getDetails
            <Nav className="ml-auto">
              <Nav.Link href="#/userdetails">വിവരങ്ങൾ ചേർക്കുക</Nav.Link>
              <Nav.Link href="#/birthday">ഇന്ന് ജന്മദിനം</Nav.Link>
              <Nav.Link href="#/member">അംഗങ്ങളുടെ വിശദാംശങ്ങൾ</Nav.Link>
              <Nav.Link href="#/pujapage"> പുതിയ പൂജ ചേർക്കാൻ</Nav.Link>
              <Nav.Link href="#/dailypuja"> ഇന്നത്തെ പൂജ ചേർക്കാൻ</Nav.Link>
              <Nav.Link href="#/getDetails">സാമ്പത്തികക്കണക്ക്</Nav.Link>
              <Nav.Link
                onClick={async () => {
                  const currentURL = window.location.href;

                  if (navigator.share) {
                    try {
                      await navigator.share({
                        title: "അംഗങ്ങളുടെ രജിസ്ട്രേഷനായി ലിങ്ക് പങ്കിടുക",
                        text: `ക്ഷേത്ര പോർട്ടലിനുള്ള അംഗ രജിസ്ട്രേഷനുള്ള ലിങ്കാണിത് | ഞങ്ങളുടെ പോർട്ടലിലേക്ക് നിങ്ങളുടെ / നിങ്ങളുടെ കുടുംബാംഗങ്ങളുടെ വിശദാംശങ്ങൾ ചേർക്കുക -
                        ക്ഷേത്രം വെബ് പോർട്ടൽ`,
                        url: currentURL, // Include the URL to share
                      });
                    } catch (error) {
                      console.error("Error sharing code:", error);
                    }
                  } else {
                    console.log(`Fallback: Share this URL: ${currentURL}`);
                  }
                }}
              > 
                ലിങ്ക് പങ്കിടുക
              </Nav.Link>

              <Nav.Link
                onClick={() => {
                  localStorage.removeItem("login");
                  window.location.reload();
                }}
              >
                Sign Out
              </Nav.Link>
              {isAdmin && (
                <Nav.Link href="#/genereatecode">Generate Passcode</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
