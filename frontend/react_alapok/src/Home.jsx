import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Home() {
  return (
    <>
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="http://localhost:5173/Regisztracio">Regisztráció</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="http://localhost:5173/">Home</Nav.Link>
            <Nav.Link href="http://localhost:5173/Regiok">Regiok</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    <div>
        <h1>Home</h1>
    </div>
    </>
  )
}
export default Home