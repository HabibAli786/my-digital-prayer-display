import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import Papa from 'papaparse'
import './PrayerTimes.css'

async function GetData(artist) {
    const data = Papa.parse(await fetchCsv());
    // console.log("-----PAPA DATA-------")
    // console.log(data);
    // console.log(data.data[1])
    return data;
}

async function fetchCsv() {
    const response = await fetch('csv/prayertimes-2021.csv');
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    // console.log("-------CSV-------")
    // console.log('csv', csv);
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

    return (`${hours}:${minutes}:${seconds}`)
}

const CurrentDate = () => {
    const date = new Date()
    const weekday = date.toLocaleString("default", { weekday: "long" })
    const dayOfMonth = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    return weekday + " " + dayOfMonth + " " + month
}

const FullDate = () => {
    const date = new Date()

    let day = date.getDate()
    day = day.toString()
    if(day.length === 1) {
        day = `0${day}`
    }

    let month = date.getMonth()+1
    month = month.toString()
    if(month.length === 1) {
        month = `0${month}`
    }
    
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

function PrayerTimes() {

    const [clock, setClock] = useState()
    const [date, setDate] = useState(CurrentDate())
    const [times, setTimes] = useState([
        "0:00", "0:00", "0:00", "0:00", "0:00", "0:00", "0:00", "0:00", "0:00", "0:00"
    ])

    // Update live clock every second
    useEffect(() => {
        setInterval(() => {
            setClock(Clock())
        }, 900)
        return () => {

        }
    }, [clock])

    // Run inital setDate onMount
    useEffect(() => {
        setDate(CurrentDate())
        return () => {
            
        }
    }, [])

    useEffect(() => {
        GetData()
            .then(prayer => {
                for(let i=0; i < prayer.data.length; i++) {
                    if(prayer.data[i][0] === FullDate()) {
                        let slice = prayer.data[i].slice(1,14)
                        setTimes(slice)
                    }
                }
            })
            .catch(error => {
                console.log("Error:" + error)
            })
        return () => {
            
        }
    }, [])

    useEffect(() => {
        if(date === "00:00:00") {
            setDate(CurrentDate())
            GetData()
            .then(prayer => {
                for(let i=0; i < prayer.data.length; i++) {
                    if(prayer.data[i][0] === FullDate()) {
                        let slice = prayer.data[i].slice(1,14)
                        setTimes(slice)
                    }
                }
            })
            .catch(error => {
                console.log("Error:" + error)
            })
        }
        return () => {
            
        }
    })

            // GetData()
            // .then(prayer => {
            //     for(let i=0; i < prayer.data.length; i++) {
            //         if(prayer.data[i][0] === FullDate()) {
            //             let slice = prayer.data[i].slice(1,14)
            //             setTimes(slice)
            //         }
            //     }
            // })
            // .catch(error => {
            //     console.log("Error:" + error)
            // })
         
    return(
        <>
        <a href="/">
            <img className="logo" src='/images/iqra.png' alt="logo" />
        </a>
        <h1 className="date">{date}</h1>
        <h1 className="clock">{clock}</h1>
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
                <Col className="col-2">{times[0]}</Col>
                <Col className="col-2 active-color">{times[1]}</Col>
            </Row>
            <Row>
                <Col className="col-4">-- --</Col>
                <Col className="col-4">Sunrise</Col>
                <Col className="col-2">{times[2]}</Col>
                <Col className="col-2 active-color">-- --</Col>
            </Row>
            <Row>
                <Col className="col-4">صَلَاة ٱلظُّهْر</Col>
                <Col className="col-4">Zuhr</Col>
                <Col className="col-2">{times[3]}</Col>
                <Col className="col-2 active-color">{times[4]}</Col>
            </Row>
            <Row>
                <Col className="col-4">صَلَاةُ العَصْر</Col>
                <Col className="col-4">Asr</Col>
                <Col className="col-2">{times[5]}</Col>
                <Col className="col-2 active-color">{times[6]}</Col>
            </Row>
            <Row>
                <Col className="col-4">صَلَاةُ اَلْمَغْرِب</Col>
                <Col className="col-4">Maghrib</Col>
                <Col className="col-2">{times[7]}</Col>
                <Col className="col-2 active-color">{times[8]}</Col>
            </Row>
            <Row>
                <Col className="col-4">صَلَاةُ العِشَاء‎</Col>
                <Col className="col-4">Isha</Col>
                <Col className="col-2">{times[9]}</Col>
                <Col className="col-2 active-color">{times[10]}</Col>
            </Row>
        </Container>
        <Card className="card-annc mx-5">
            <Card.Body>Surah Mulk after Maghrib</Card.Body>
        </Card>
        </>
    )
}

export default PrayerTimes;