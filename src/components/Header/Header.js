import { Navbar, Container, Nav } from "react-bootstrap"
import { BsClockHistory } from 'react-icons/bs'
import { Link } from "react-router-dom"
import '../Header/Header.css'

function Header() {

    return (
        <Navbar collapseOnSelect expand="lg" bg="light">
        <Container>
            <Navbar.Brand eventkey="/" as={Link} to="/">
                <BsClockHistory size="2em"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link eventkey="/" as={Link} to="/">Home</Nav.Link>
                    <Nav.Link eventkey="/prayertimes" as={Link} to="/prayerTimes">PrayerTimes</Nav.Link>
                    <Nav.Link eventkey="/admin" as={Link} to="/admin">Admin</Nav.Link>
                </Nav>
                {/* <Navbar.Collapse className="justify-content-end">
                    <Button variant="danger">Exit</Button>
                </Navbar.Collapse> */}
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )

}

export default Header