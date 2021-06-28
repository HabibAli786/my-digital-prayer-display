import { Navbar, Container, Nav, Button, Row, Col } from 'react-bootstrap'
import { BsClockHistory } from 'react-icons/bs'
import './Home.css'

function Home() {

    return(
        <>
        {/* NavBar Section */}
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

        {/* Main Content Area */}
        <Container className="main-container">
        <Row className="main-row-title">
            <Col className="main-col">
                <h1 className="header">Welcome to PrayerTimes+</h1>
            </Col>
        </Row>
        <Row className="main-row-title mt-5">
            <Col>
                <p className="subheading">A lightweight application to display prayer times for your masjid.</p>
            </Col>
        </Row>
        {/* <Row className="main-row">
            <Col className="main-col">
                <h1>Welcome to PrayerTimes+</h1>
            </Col>
        </Row> */}
        </Container>
        </>
    )
}

export default Home;