import { Container, Row, Col } from 'react-bootstrap'
import './JamaatPrayer.css'

function JamaatPrayer(props) {

    return (
        <>
        <div>
            <Container className="jamaat-prayer-container">
                <Row>
                    <Col className="jamaat-prayer-name">صَلَاةُ العَصْر</Col>
                </Row>
                <Row>
                    <h1 className="jamaat-prayer-time">1:00</h1>
                </Row>
                <Row>
                    <h1 className="jamaat-prayer-message">Please put your phone on silent to avoid disruption</h1>
                </Row>
                <Row>
                    <Col>
                        <img className="jamaat-prayer-phone"src="images/no-phone.png" alt="no mobile phone" />
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )

}

export default JamaatPrayer