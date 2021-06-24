import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap'
import { BsClockHistory } from 'react-icons/bs'
import './Home.css'

function Home() {

    return(
        <>
        <Navbar collapseOnSelect expand="lg" bg="light">
        <Container>
            <Navbar.Brand href="/">
                <BsClockHistory size="2em"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/prayerTimes">PrayerTimes</Nav.Link>
                    <Nav.Link href="#admin">Admin</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Button variant="danger">Exit</Button>
                </Navbar.Collapse>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        </>
    )
}

export default Home;