import { Container, Row, Col } from 'react-bootstrap'
import './PrayerTimes.css'

function PrayerTimes() {

    return(
        <>
        <Container className="table-container">
            <Row>
                <Col className="col-3"></Col>
                <Col className="col-3"></Col>
                <Col className="col-3">Start Time</Col>
                <Col className="col-3 active-color">Jamaat</Col>
            </Row>
            <Row>
                <Col className="col-3">فَجْر‎</Col>
                <Col className="col-3">Fajr</Col>
                <Col className="col-3">3:06</Col>
                <Col className="col-3 active-color">4:00</Col>
            </Row>
            <Row>
                <Col className="col-3">Don't know</Col>
                <Col className="col-3">4:41</Col>
                <Col className="col-3">-- --</Col>
                <Col className="col-3 active-color">-- --</Col>
            </Row>
            <Row>
                <Col className="col-3">صَلَاة ٱلظُّهْر</Col>
                <Col className="col-3">Zuhr</Col>
                <Col className="col-3">1:11</Col>
                <Col className="col-3 active-color">1:30</Col>
            </Row>
            <Row>
                <Col className="col-3">صَلَاةُ العَصْر</Col>
                <Col className="col-3">Asr</Col>
                <Col className="col-3">6:44</Col>
                <Col className="col-3 active-color">8:00</Col>
            </Row>
            <Row>
                <Col className="col-3">صَلَاةُ اَلْمَغْرِب</Col>
                <Col className="col-3">Maghrib</Col>
                <Col className="col-3">9:32</Col>
                <Col className="col-3 active-color">9:32</Col>
            </Row>
            <Row>
                <Col className="col-3">صَلَاةُ العِشَاء‎</Col>
                <Col className="col-3">Isha</Col>
                <Col className="col-3">10:50</Col>
                <Col className="col-3 active-color">11:00</Col>
            </Row>
        </Container>
        </>
    )
}

export default PrayerTimes;