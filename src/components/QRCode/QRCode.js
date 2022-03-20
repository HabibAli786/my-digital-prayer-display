import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Switch from "react-switch";
import Header from "../Header/Header";



function QRCode() {

    const [checked, setChecked] = useState({ checked: false })

    const handleChange = (nextChecked) => {
        setChecked(nextChecked)
    }


    return (
        <>
        <Header />
        <h1 style={{marginTop : "15px", fontSize: "50px"}}>QR Code Settings</h1>
        <Container>
            <Row>
                <Col>
                    <Switch onChange={handleChange} checked={checked} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>QR Code Status: {checked ? "On" : "Off"}</h1>
                </Col>
            </Row>
        </Container>
        </>
    )

}

   

export default QRCode;