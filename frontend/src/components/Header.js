import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Конструктор курсов</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Все курсы</Nav.Link>
            {currentUser && AuthService.isCreator() && (
              <Nav.Link as={Link} to="/create">Создать курс</Nav.Link>
            )}
          </Nav>
          <Nav>
            {currentUser ? (
              <>
                <Navbar.Text className="me-3">
                  {currentUser.user.email}
                </Navbar.Text>
                <Button variant="outline-light" onClick={logOut}>Выйти</Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Войти</Nav.Link>
                <Nav.Link as={Link} to="/register">Регистрация</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 