import React from 'react';
import { Navbar, Button, Container, Nav } from 'react-bootstrap';

const whiteColor = 'white';
const greenColor = '#01634B';

function Header() {
    return (
        <>
            <style type="text/css">
                {`
                    .btn-green {
                        background-color: ${greenColor};
                        color: ${whiteColor};
                        font-weight: 700;
                    }
                    .btn-green:hover {
                        background-color: ${whiteColor};
                        color: ${greenColor};
                        border: solid 1px;
                    }
                    .btn-white {
                        background-color: ${whiteColor};
                        color: ${greenColor};
                        font-weight: 700;
                    }
                    .btn-xxl {
                    padding: 1rem 1.5rem;
                    font-size: 1.5rem;
                    }
                    `}
            </style>

            <Navbar collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <Nav.Link href="#features" className="bold margin-left">MonitorTrash</Nav.Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" className="bold margin-left">Home</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#signup">
                                <Button variant="white">Register</Button>
                            </Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                <Button variant="green">Login</Button>{' '}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    );
}

export default Header;