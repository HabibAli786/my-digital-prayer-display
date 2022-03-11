import { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';

import Notifications from '../Notifications/Notifications'
import JamaatPrayer from '../JamaatPrayer/JamaatPrayer';
import MakroohTime from '../MakroohTime/MakroohTime'
import './PrayerTimes.css'
import { Link } from 'react-router-dom';

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
    
    let day = tomorrow.getDate()
    day = day.toString()
    if(day.length === 1) {
        day = `0${day}`
    }

    let month = tomorrow.getMonth()+1
    month = month.toString()
    if(month.length === 1) {
        month = `0${month}`
    }
    
    const year = tomorrow.getFullYear()

    return day + "-" + month + "-" + year
}

const weekDay = () => {
    const date = new Date()
    const weekday = date.toLocaleString("default", { weekday: "long" })
    return weekday
}

const dayMonth = () => {
    const date = new Date()
    const dayOfMonth = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    return dayOfMonth + " " + month
}

const strToDate = (str) => {
    if(!str) return "error"
    if(str.length === 8) {
        if(str === "00:00:00") {
            return "No Date to Convert"
        } else {
            const date = new Date()
            const strHours = str.slice(0, 2)
            const strMinutes = str.slice(3, 5)
            const strSeconds = str.slice(6, 8)

            const result = date.setHours(strHours, strMinutes, strSeconds)

            // console.log(result)

            return result
        }
        // console.log(str)
    } else {
        console.log(str + " str not long enough")
    }
    // console.log(str)
}

function PrayerTimes() {

    const [clock, setClock] = useState("00:00:00")

    // Day and month
    const [date, setDate] = useState([weekDay(), dayMonth()])
    const [hijri, setHijri] = useState(null)

    // Prayertimes
    const [times, setTimes] = useState([
        "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00"
    ])
    const [prayerFinished, setprayerFinished] = useState([false, false, false, false, false, false])
    const [isJummah, setIsJummah] = useState(false)
    const [jamaatStarted, setJamaatStarted] = useState()
    
    // Slides
    const [slides, setSlides] = useState([])
    const [numOfSlides, setNumOfSlides] = useState(null)
    const [slideshowCount, setSlideshowCount] = useState(0)
    const [displaySlideshow, setDisplaySlideshow] = useState(false)

    // Makrooh
    const [makrooh, setMakrooh] = useState(false)

    // Update live clock every second
    useEffect(() => {
        setInterval(() => {
            setClock(Clock())
        }, 1000)

        // return () => { 
        //     setClock("00:00:00")
        // }
    }, [clock])

    // Update day, month and Jummah if it is Friday
    useEffect(() => {
        if(strToDate(clock) > strToDate("00:00:01") && strToDate(clock) < strToDate(times[10]+":00")) {
            const compareDate = new Date()
            const compareDay = compareDate.toLocaleString("default", { weekday: "long" })
            if(date[0] !== compareDay) {
                setDate([weekDay(), dayMonth()])
            }
            if(date[0] === "Friday") {
                setIsJummah(true)
            } else {
                setIsJummah(false)
            }
        }
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
    
    // Display Jamaat Display
    useEffect(() => {
        let clockDate = new Date()
        let jamaatStart = new Date()
        let jamaatEnd = new Date()

        const clockHours = clock.slice(0, 2)
        const clockMinutes = clock.slice(3, 5)
        const clockSeconds = clock.slice(6, 8)
        
        clockDate.setHours(clockHours, clockMinutes, clockSeconds)

        let result = false

        for(let i=0; i < 11; i += 1) {
            if(i === 0 || i === 2 || i === 3 || i === 5 || i === 7 || i === 9) {
                continue
            }

            const timesHours = times[i].slice(0, 2)
            const timesMinutes = times[i].slice(3, 5)
            const timesSeconds = times[i].slice(6, 8)

            const jamaatEndMinutes = parseInt(timesMinutes) + 5

            jamaatStart.setHours(timesHours, timesMinutes, timesSeconds)
            jamaatEnd.setHours(timesHours, jamaatEndMinutes.toString(), timesSeconds)
            
            if(clockDate > jamaatStart && clockDate < jamaatEnd) {
                result = true
                break
            } else {
                result = false
            }
        }
        if(result) {
            setJamaatStarted(true)
        } else {
            setJamaatStarted(false)
        }

    }, [clock])

    // Display Makrooh Time
    useEffect(() => {
        let clockDate = new Date()
        let makroohStart = new Date()
        let makroohEnd = new Date()

        const clockHours = clock.slice(0, 2)
        const clockMinutes = clock.slice(3, 5)
        const clockSeconds = clock.slice(6, 8)
        
        clockDate.setHours(clockHours, clockMinutes, clockSeconds)

        let result = false

        for(let i=0; i < 11; i += 1) {
            if(i === 0 || i === 1 || i === 4 || i === 5 || i === 6 || i === 8 || i === 9 || i === 10) {
                continue
            }

            const timesHours = times[i].slice(0, 2)
            const timesMinutes = times[i].slice(3, 5)
            const timesSeconds = times[i].slice(6, 8)

            const makroohStartMinutes = parseInt(timesMinutes) - 20

            makroohStart.setHours(timesHours, makroohStartMinutes.toString(), timesSeconds)
            makroohEnd.setHours(timesHours, timesMinutes, timesSeconds)
            
            if(clockDate >= makroohStart && clockDate < makroohEnd) {
                result = true
                break
            } else {
                result = false
            }
        }
        if(result) {
            setMakrooh(true)
        } else {
            setMakrooh(false)
        }

    }, [clock])

    // set intial prayertimes
    useEffect(() => {
        axios.get(`http://localhost:3001/prayertimes/`)
        .then((response) => {
            const prayertimes = response.data.slice(1)
            const arr = []
            if(prayertimes.length > 1) {
                for(let i=0; i < prayertimes.length; i++) {
                    if(prayertimes[i].startTime) { arr.push(prayertimes[i].startTime) }
                    if(prayertimes[i].jamaat) { arr.push(prayertimes[i].jamaat) }
                    if(prayertimes[i].hijriDate && prayertimes[i].hijriMonth && prayertimes[i].hijriYear) { 
                        setHijri([prayertimes[i].hijriDate, prayertimes[i].hijriMonth, prayertimes[i].hijriYear])
                    }          
                }
                setTimes(arr)
            }
        })
        .catch((error) => {
            console.log(error)
        })
        return () => {
            
        }
    }, [])

    // Update prayertimes after every jamaat
    useEffect(() => {
        for(let i=0; i <= prayerFinished.length-1; i+=1 ) {
            if(prayerFinished[i] === true) {
                // console.log(i)
                const nextDate = nextDay()
                axios.get(`http://localhost:3001/prayertimes/${nextDate}`)
                .then((response) => {
                    const prayertimes = response.data.slice(1)
                    // const arr = []
                    // console.log(i)
                    // console.log(prayertimes)
                    if(prayertimes.length > 1) {
                        if(prayertimes[i].startTime) {
                            // Fajr 
                            if(i === 0) { times[0] = prayertimes[i].startTime }
                            // Sunrise
                            if(i === 1) { times[2] = prayertimes[i].startTime }
                            // Dhuhr
                            if(i === 2) { times[3] = prayertimes[i].startTime }
                            // Asr
                            if(i === 3) { times[5] = prayertimes[i].startTime }
                            // Maghrib
                            if(i === 4) { times[7] = prayertimes[i].startTime }
                            // Isha
                            if(i === 5) { times[9] = prayertimes[i].startTime } 
                        }
                        if(prayertimes[i].jamaat) { 
                            if(i === 0) { times[1] = prayertimes[i].jamaat }
                            if(i === 2) { times[4] = prayertimes[i].jamaat }
                            if(i === 3) { times[6] = prayertimes[i].jamaat }
                            if(i === 4) { times[8] = prayertimes[i].jamaat }
                            if(i === 5) { times[10] = prayertimes[i].jamaat }
                        }
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }
    }, [clock])

    // Update Hijri Date after Maghrib
    useEffect(() => {
        if(prayerFinished[4]) {
            const nextDate = nextDay()
            axios.get(`http://localhost:3001/prayertimes/${nextDate}`)
            .then((response) => {
                const prayertimes = response.data.slice(1)
                // const arr = []
                if(prayertimes.length > 1) {
                    for(let i=0; i < prayertimes.length; i++) {
                        // console.log(prayertimes[i])
                        if(prayertimes[i].hijriDate && prayertimes[i].hijriMonth && prayertimes[i].hijriYear) { 
                            setHijri([prayertimes[i].hijriDate, prayertimes[i].hijriMonth, prayertimes[i].hijriYear])
                        }                     
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [prayerFinished])

    // Updating number of slides
    useEffect(() => {
        axios.get(`http://localhost:3001/media/slides`)
            .then((response) => {
                const data = response.data
                setNumOfSlides(data.numOfFiles)
                if(data.files.length >= 1) {
                    setSlides(data.files)
                } else {
                    setSlides([])
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    // Slideshow Animation useEffect
    useEffect(() => {
        // How long will the image take to come on the screen
        console.log(slideshowCount)
        console.log(displaySlideshow)
        if(displaySlideshow === false) {
            setTimeout(() => {
                setDisplaySlideshow(true)
            }, 60000)
            // setAnimation(false)
        }
        // How long the image will be on the screen
        if(displaySlideshow === true){
            setTimeout(() => {
                // setSlideshowCount(slideshowCount + 1)
                setDisplaySlideshow(false)
                if(slideshowCount === numOfSlides-1) {
                    setSlideshowCount(0)
                } else {
                    setSlideshowCount(slideshowCount + 1)
                }
                // console.log("slideshowcount " + slideshowCount)
                // console.log("numofslideshowimages " + numOfSlides)
            }, 15000)
        }
        
    }, [displaySlideshow])

    return(
        <>
        {/* <JamaatPrayer prayer={} time={} /> */}
        {!jamaatStarted ?
        <div className="prayertimes-main-div">
            {displaySlideshow ? 
                <img className={displaySlideshow === true ? "slideshow-display slideshow-img" : "slideshow-hide"} 
                    src={`http://localhost:3001/media/slides/${slides[slideshowCount]}`} 
                    alt="slidshow" 
                />
            :
            <div>
                {/* Logo */}
                <Link to="/">
                    <img className="logo" src='http://localhost:3001/media/logo' alt="logo" />
                </Link>
                
                {/* Hijri and Normal Date */}
                <h1 className="weekday">{date[0]}</h1>
                <h1 className="dayMonth">{`${date[1]} ${new Date().getFullYear()}`}</h1>
                <h1 className="hijri">{hijri !== null ? `${hijri[0]}  ${hijri[1]} ${hijri[2]}` : ""}</h1>

                {/* Clock */}
                <h1 className={makrooh ? "clock-hours makrooh-clock" : "clock-hours"}>{clock.slice(0, 2)}</h1>
                <h1 className={makrooh ? "clock-colon-1 makrooh-clock" : "clock-colon-1"}>:</h1>
                <h1 className={makrooh ? "clock-minutes makrooh-clock" : "clock-minutes"}>{clock.slice(3, 5)}</h1>
                <h1 className={makrooh ? "clock-colon-2 makrooh-clock" : "clock-colon-2"}>:</h1>
                <h1 className={makrooh ? "clock-seconds makrooh-clock" : "clock-seconds"}>{clock.slice(6, 8)}</h1>

                {/* Makrooh or QR Code */}
                {makrooh ?
                    <MakroohTime /> : <img className='prayertimes-qr-code' src="images/qr-code.png" alt="qr-code" /> 
                }

                {/* Prayertimes */}
                <Container className="table-container">
                    <Row className="row0">
                        <Col className="col-4"></Col>
                        <Col className="col-4"></Col>
                        <Col className="col-2 start-time">Start</Col>
                        <Col className="col-2 jamaat active-color">Jamaat</Col>
                    </Row>
                    <Row className={prayerFinished[0] === true ? "finshed row1" : "finished row1"}>
                        <Col className="col-4 salaah-name">صلاة الفجر</Col>
                        <Col className="col-4">Fajr</Col>
                        <Col className="col-2">{`${times[0].slice(0, 2) % 12 || 12}:${times[0].slice(3,5)}`}</Col>
                        <Col className="col-2 active-color">{`${times[1].slice(0, 2) % 12 || 12}:${times[1].slice(3,5)}`}</Col>
                    </Row>
                    <Row className={prayerFinished[1] === true ? "finshed row2" : "finished row2"}>
                        <Col className="col-4 salaah-name">الشُّروق</Col>
                        <Col className="col-4">Sunrise</Col>
                        <Col className="col-2">{`${times[2].slice(0, 2) % 12 || 12}:${times[2].slice(3,5)}`}</Col>
                        <Col className="col-2 active-color">-- --</Col>
                    </Row>
                    <Row className={prayerFinished[2] === true ? "finshed row3" : "finished row3"}>
                        { isJummah ?
                            <>
                                <Col className="col-4 salaah-name">صَلَاة ٱلْجُمُعَة</Col>
                                <Col className="col-4">Jumuʿah</Col>
                            </>
                            :
                            <>
                                <Col className="col-4 salaah-name">صَلَاة ٱلظُّهْر</Col>
                                <Col className="col-4">Ẓuhr</Col>
                            </>
                        }
                        <Col className="col-2">{`${times[3].slice(0, 2) % 12 || 12}:${times[3].slice(3,5)}`}</Col>
                        <Col className="col-2 active-color">{`${times[4].slice(0, 2) % 12 || 12}:${times[4].slice(3,5)}`}</Col>
                    </Row>
                    <Row className={prayerFinished[3] === true ? "finshed row4" : "finished row4"}>
                        <Col className="col-4 salaah-name">صَلَاةُ العَصْر</Col>
                        <Col className="col-4">Asr</Col>
                        <Col className="col-2">{`${times[5].slice(0, 2) % 12 || 12}:${times[5].slice(3,5)}`}</Col>
                        <Col className="col-2 active-color">{`${times[6].slice(0, 2) % 12 || 12}:${times[6].slice(3,5)}`}</Col>
                    </Row>
                    <Row className={prayerFinished[4] === true ? "finshed row5" : "finished row5"}>
                        <Col className="col-4 salaah-name">صَلَاةُ اَلْمَغْرِب</Col>
                        <Col className="col-4">Maghrib</Col>
                        <Col className="col-2">{`${times[7].slice(0, 2) % 12 || 12}:${times[7].slice(3,5)}`}</Col>
                        <Col className="col-2 active-color">{`${times[8].slice(0, 2) % 12 || 12}:${times[8].slice(3,5)}`}</Col>
                    </Row>
                    <Row className={prayerFinished[5] === true ? "finshed row6" : "finished row6"}>
                        <Col className="col-4 salaah-name">صَلَاةُ العِشَاء</Col>
                        <Col className="col-4">Isha</Col>
                        <Col className="col-2">{`${times[9].slice(0, 2) % 12 || 12}:${times[9].slice(3,5)}`}</Col>
                        <Col className="col-2 active-color">{`${times[10].slice(0, 2) % 12 || 12}:${times[10].slice(3,5)}`}</Col>
                    </Row>
                </Container>
                <Notifications slideshow={displaySlideshow} />
            </div>
            }  
        </div> 
        :
            // <img className={displaySlideshow === true ? "slideshow-display slideshow-img" : "slideshow-hide"} src={`http://localhost:3001/media/slides/${slides[slideshowCount]}`} alt="slidshow" /> 
            <JamaatPrayer prayersStatus={prayerFinished} prayerTimes={times} jummah={isJummah} />
        }
        </>
    )
}

export default PrayerTimes;
