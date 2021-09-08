import { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios';
import './PrayerTimes.css'

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

const nextDay = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const day = "0" + tomorrow.getDate()
    let month = "0" + (tomorrow.getMonth()+1)
    const year = tomorrow.getFullYear()
    
    return day + "-" + month + "-" + year
}

const weekDay = () => {
    const date = new Date()
    const weekday = date.toLocaleString("default", { weekday: "long" })
    // const dayOfMonth = date.getDate()
    // const month = date.toLocaleString('default', { month: 'long' })
    // return weekday + " " + dayOfMonth + " " + month
    return weekday
}

const dayMonth = () => {
    const date = new Date()
    const dayOfMonth = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    return dayOfMonth + " " + month
}

const strToDate = (str) => {
    console.log(str)
    if(str.length === 8) {
        if(str === "00:00:00") {
            
        } else {
            const date = new Date()
            const strHours = str.slice(0, 2)
            const strMinutes = str.slice(3, 5)
            const strSeconds = str.slice(6, 8)

            const result = date.setHours(strHours, strMinutes, strSeconds)

            console.log(result)

            return result
        }
        // console.log(str)
    } else {
        console.log(str + "str not long enough")
    }
    // console.log(str)
}

//  0 1 2 3 4 5 6 7 8 9 10
//  0 0 : 0 0 : 0 0

function PrayerTimes() {

    // Global Variables
    const numofSlidshowImages = 3

    const [clock, setClock] = useState("00:00:00")
    const [date, setDate] = useState([weekDay(), dayMonth()])
    const [times, setTimes] = useState([
        "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "0:00"
    ])

    const [prayerFinished, setprayerFinished] = useState([false, false, false, false, false, false])

    const [animation, setAnimation] = useState(false)
    const [notifications, setNotifications] = useState([
        "Surah Mulk after Maghrib", "Dars after Zuhr", "Collections for Eid after Jummah", "Eid on the 23rd of July"
    ])
    const [count, setCount] = useState(0)

    const [slideshowCount, setSlideshowCount] = useState(1)
    const [displaySlideshow, setDisplaySlideshow] = useState(false)

    // Update live clock every second
    useEffect(() => {
        setInterval(() => {
            setClock(Clock())
        }, 900)
    }, [clock])

    // Grey out prayers that have finshed
    useEffect(() => {
        let clockToDate = new Date()
        let timesToDate = new Date()
        const newPrayerFinshed = [...prayerFinished]

        const clockHours = clock.slice(0, 2)
        const clockMinutes = clock.slice(3, 5)
        const clockSeconds = clock.slice(6, 8)

        clockToDate.setHours(clockHours, clockMinutes, clockSeconds)

        let j = 0
        for(let i=0; i < 11; i += 1) {
            if(i === 0 || i === 3 || i === 5 || i === 7 || i === 9) {
                continue
            }
            const timesHours = times[i].slice(0, 2)
            const timesMinutes = times[i].slice(3, 5)
            const timesSeconds = times[i].slice(6, 8)

            timesToDate.setHours(timesHours, timesMinutes, timesSeconds)

            if(clockToDate > timesToDate) {
                newPrayerFinshed[j] = true
                setprayerFinished(newPrayerFinshed)
            } else {
                newPrayerFinshed[j] = false
                setprayerFinished(newPrayerFinshed)
            }
            j = j+1
        }                        
    }, [clock])

    // Notification Animation useEffect
    useEffect(() => {
        // How long the text will appear
        if(animation === false) {
            setTimeout(() => {
                setAnimation(true)
            }, 10000)
        }
        // How long next text will appear
        if(animation === true){
            setTimeout(() => {
                setCount(count + 1)
                setAnimation(false)
                if(count === notifications.length-1) {
                    setCount(0)
                }
            }, 3000)
        }
    }, [animation])

    // Slideshow Animation useEffect
    useEffect(() => {
        // How long will the image be off the screen
        if(displaySlideshow === false) {
            setTimeout(() => {
                setDisplaySlideshow(true)
            }, 90000)
            // setAnimation(false)
        }
        // How long the image will be on the screen
        if(displaySlideshow === true){
            setTimeout(() => {
                setSlideshowCount(slideshowCount + 1)
                setDisplaySlideshow(false)
                if(slideshowCount === numofSlidshowImages) {
                    setSlideshowCount(1)
                }
            }, 10000)
        }
    }, [displaySlideshow])

    // Run inital setDate onMount
    // useEffect(() => {
    //     axios.get('http://localhost:3001/prayertimes')
    //     .then((response) => {
    //         setDate(response.data[0].fullDay)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })

    //     return () => {
            
    //     }
    // }, [])

    // setTimes
    useEffect(() => {
        // const date = nextDay()
        // console.log(date)
        axios.get(`http://localhost:3001/prayertimes/`)
        .then((response) => {
            const prayertimes = response.data.slice(1)
            const arr = []
            for(let i=0; i < prayertimes.length; i++) {
                arr.push(prayertimes[i].startTime)
                if(prayertimes[i].jamaat) { arr.push(prayertimes[i].jamaat) }                
            }
            setTimes(arr)
        })
        .catch((error) => {
            console.log(error)
        })
        return () => {
            
        }
    }, [])
    
    // update prayer times and date when clock reaches next day
    // useEffect(() => {
    //     if(clock === "00:00:00") {
    //         GetData()
    //         .then(prayer => {
    //             for(let i=0; i < prayer.data.length; i++) {
    //                 if(prayer.data[i][0] === FullDate()) {
    //                     let slice = prayer.data[i].slice(1,14)
    //                     setTimes(slice)
    //                 }
    //             }
    //         })
    //         .catch(error => {
    //             console.log("Error:" + error)
    //         })
    //     }
    //     return () => {
            
    //     }
    // })

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
        {
            !displaySlideshow ?
        <>
        <a href="/">
            <img className="logo" src='/images/iqra.png' alt="logo" />
        </a>
        <h1 className="weekday">{date[0]}</h1>
        <h1 className="dayMonth">{date[1]}</h1>
        <h1 className="clock">{clock}</h1>
        <Container className="table-container">
            <Row>
                <Col className="col-4"></Col>
                <Col className="col-4"></Col>
                <Col className="col-2 start-time">Start</Col>
                <Col className="col-2 jamaat active-color">Jamaat</Col>
            </Row>
            <Row className={prayerFinished[0] === true ? "finshed" : "finished"}>
                <Col className="col-4">فَجْر‎</Col>
                <Col className="col-4">Fajr</Col>
                <Col className="col-2">{times[0]}</Col>
                <Col className="col-2 active-color">{times[1]}</Col>
            </Row>
            <Row className={prayerFinished[1] === true ? "finshed" : "finished"}>
                <Col className="col-4">-- --</Col>
                <Col className="col-4">Sunrise</Col>
                <Col className="col-2">{times[2]}</Col>
                <Col className="col-2 active-color">-- --</Col>
            </Row>
            <Row className={prayerFinished[2] === true ? "finshed" : "finished"}>
                <Col className="col-4">صَلَاة ٱلظُّهْر</Col>
                <Col className="col-4">Zuhr</Col>
                <Col className="col-2">{times[3]}</Col>
                <Col className="col-2 active-color">{times[4]}</Col>
            </Row>
            <Row className={prayerFinished[3] === true ? "finshed" : "finished"}>
                <Col className="col-4">صَلَاةُ العَصْر</Col>
                <Col className="col-4">Asr</Col>
                <Col className="col-2">{times[5]}</Col>
                <Col className="col-2 active-color">{times[6]}</Col>
            </Row>
            <Row className={prayerFinished[4] === true ? "finshed" : "finished"}>
                <Col className="col-4">صَلَاةُ اَلْمَغْرِب</Col>
                <Col className="col-4">Maghrib</Col>
                <Col className="col-2">{times[7]}</Col>
                <Col className="col-2 active-color">{times[8]}</Col>
            </Row>
            <Row className={prayerFinished[5] === true ? "finshed" : "finished"}>
                <Col className="col-4">صَلَاةُ العِشَاء‎</Col>
                <Col className="col-4">Isha</Col>
                <Col className="col-2">{times[9]}</Col>
                <Col className="col-2 active-color">{times[10]}</Col>
            </Row>
        </Container>
        <Card className="card-annc mx-5">
            <Card.Body>
                <Card.Text className={animation === true ? "annc-current" : "annc-next"}>
                {notifications[count]}
                </Card.Text>
            </Card.Body>
        </Card>
        </>
        :
            <img className={displaySlideshow === true ? "slideshow-display slideshow-img" : "slideshow-hide"} src={`/slideshow/slide${slideshowCount}.jpg`} alt="slidshow" /> 
        }
        </>
    )
}

export default PrayerTimes;