import { Container, Row, Col } from 'react-bootstrap'
// import { BsClockHistory } from 'react-icons/bs'
import Header from './Header/Header'
import './Home.css'

function Home() {

    return(
        <>
        <Header />

        <Container className="main-container">
            <Row className="main-row">
                <Col className="main-col">
                    <h1 className="header">Welcome to PrayerTimes+</h1>
                </Col>
            </Row>
            <Row className="main-row mt-5">
                <Col>
                    <p className="subheading">A lightweight application to display prayer times for your masjid.</p>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Home;