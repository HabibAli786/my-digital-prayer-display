import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import Papa from 'papaparse'
import './PrayerTimes.css'

async function GetData(artist) {
    const data = Papa.parse(await fetchCsv());
    console.log("-----PAPA DATA-------")
    console.log(data);
    console.log(data.data[1])
    return data;
}

async function fetchCsv() {
    const response = await fetch('csv/prayertimes-2021.csv');
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    console.log("-------CSV-------")
    console.log('csv', csv);
    return csv;
}

const Clock = () => {
    const date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    if(hours.toString().length === 1) {
        hours.toString()
        hours = `0${hours}`
    }

    if(minutes.toString().length === 1) {
        minutes.toString()
        minutes = `0${minutes}`
    }

    if(seconds.toString().length === 1) {
        seconds.toString()
        seconds = `0${seconds}`
    }

    // console.log(`${hours}:${minutes}:${seconds}`)

    return (`${hours}:${minutes}:${seconds}`)
}

const CurrentDate = () => {
    const date = new Date()
    const weekday = date.toLocaleString("default", { weekday: "long" })
    const dayOfMonth = date.getUTCDate()
    const month = date.toLocaleString('default', { month: 'long' })
    return weekday + " " + dayOfMonth + " " + month
}

GetData()

function PrayerTimes() {

    const [clock, setClock] = useState(Clock())
    const [date, setDate] = useState(CurrentDate())

    useEffect(() => {
        setTimeout(() => {
            setClock(Clock())
        }, 1000)
    }, [clock])

    useEffect(() => {
        setTimeout(() => {
            setDate(CurrentDate())
        }, 8000)
    }, [date])

    return(
        <>
        <Container className="table-container">
            <Row>
                <Col className="col-4"></Col>
                <Col className="col-4"></Col>
                <Col className="col-2 start-time">Start</Col>
                <Col className="col-2 jamaat active-color">Jamaat</Col>
            </Row>
            <Row>
                <Col className="col-4">فَجْر‎</Col>
                <Col className="col-4">Fajr</Col>
                <Col className="col-2">3:06</Col>
                <Col className="col-2 active-color">4:00</Col>
            </Row>
            <Row>
                <Col className="col-4">-- --</Col>
                <Col className="col-4">Sunrise</Col>
                <Col className="col-2">4:41</Col>
                <Col className="col-2 active-color">-- --</Col>
            </Row>
            <Row>
                <Col className="col-4">صَلَاة ٱلظُّهْر</Col>
                <Col className="col-4">Zuhr</Col>
                <Col className="col-2">1:11</Col>
                <Col className="col-2 active-color">1:30</Col>
            </Row>
            <Row>
                <Col className="col-4">صَلَاةُ العَصْر</Col>
                <Col className="col-4">Asr</Col>
                <Col className="col-2">6:44</Col>
                <Col className="col-2 active-color">8:00</Col>
            </Row>
            <Row>
                <Col className="col-4">صَلَاةُ اَلْمَغْرِب</Col>
                <Col className="col-4">Maghrib</Col>
                <Col className="col-2">9:32</Col>
                <Col className="col-2 active-color">9:32</Col>
            </Row>
            <Row>
                <Col className="col-4">صَلَاةُ العِشَاء‎</Col>
                <Col className="col-4">Isha</Col>
                <Col className="col-2">10:50</Col>
                <Col className="col-2 active-color">11:00</Col>
            </Row>
        </Container>
        <a href="/">
            <img className="logo" src='/images/iqra.png' alt="logo" />
        </a>
        <h1 className="date">{date}</h1>
        <h1 className="clock">{clock}</h1>
        </>
    )
}

export default PrayerTimes;