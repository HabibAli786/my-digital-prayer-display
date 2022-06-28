import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { GoStop } from 'react-icons/go'
import Footer from './Footer/Footer'
// import { BsClockHistory } from 'react-icons/bs'
import Header from './Header/Header'
import './Home.css'

function Home() {

    const [screenValid, setScreenValid] = useState(false)

    const checkScreenResolution = (height, width) => {
        if(height === 2160 && width === 3840) {
            setScreenValid(true)
        }

        if(height === 1080 && width === 1920) {
            setScreenValid(true)
        }

        if(height === 720 && width === 1280) {
            setScreenValid(true)
        }
    }

    useEffect(() => {
        checkScreenResolution(window.screen.height, window.screen.width)
    }, [screenValid])

    if(!screenValid) {
        return ( 
            <>
                <GoStop className="invalid-screen-icon" /> 
                <h1 className='invalid-screen-title'>Error: Invalid Screen</h1>
                <h1 className='invalid-screen-info'>Supported screens are: 4K, 1080p and 720p</h1>
            </>
        )
    } else {
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
            <Footer />
            </>
        )
    }
}

export default Home;