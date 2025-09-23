import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


function Menu() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">React Minta</Navbar.Brand>
          <Navbar.Toggle aria-controls="menu" />
          <Navbar.Collapse id="menu">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Főoldal</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/leiras">
                <Nav.Link>Leírás</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/regisztracio">
                <Nav.Link>Regisztráció</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  