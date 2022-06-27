import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './JamaatPrayer.css'

function JamaatPrayer(props) {

    const { prayersStatus, prayerTimes, jummah } = props

    const prayerNames = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"]

    const [currentPrayer, setCurrentPrayer] = useState("")
    const [currentTime, setCurrentTime] = useState("")

    // Finding current prayer
    useEffect(() => {
        // console.log(prayersStatus)
        // console.log(prayerTimes)
        // console.log(jummah)
        
        if(jummah && prayersStatus[3] === false) {
            setCurrentPrayer("Jumuʿah")
        } else {
            for(let i=0; i < prayersStatus.length;  i++) {
                if(prayersStatus[i] === false) {
                    // console.log(prayerNames[i-1])
                    console.log(prayerNames[i-1])
                    setCurrentPrayer(prayerNames[i-1])
                    break
                }
                setCurrentPrayer(prayerNames[5])
            }
        }

        return () => { 

        }
    }, [])

    // Setting prayer time
    useEffect(() => {
        if(currentPrayer === "Fajr") { setCurrentTime(prayerTimes[1]) }
        if(currentPrayer === "Sunrise") { setCurrentTime(prayerTimes[2]) }
        if(currentPrayer === "Dhuhr") { setCurrentTime(prayerTimes[4]) }
        if(currentPrayer === "Jumuʿah") { setCurrentTime(prayerTimes[4]) }
        if(currentPrayer === "Asr") { setCurrentTime(prayerTimes[6]) }
        if(currentPrayer === "Maghrib") { setCurrentTime(prayerTimes[8]) }
        if(currentPrayer === "Isha") { setCurrentTime(prayerTimes[10]) }

        return () => { 

        }
    }, [currentPrayer])

    console.log(currentPrayer)
    console.log(prayersStatus)

    return (
        <>
        <div className="jamaat-prayer-container">
            {currentPrayer &&
                <div>
                    <img className="jamaat-image" src={`jamaat/${currentPrayer.toLowerCase()}.png`} alt={`jamaat-${currentPrayer.toLowerCase()}`} />
                    <h1 className={`jamaat-prayer-name-${currentPrayer.toLowerCase()}`}>{currentPrayer}</h1>
                    <h1 className={`jamaat-prayer-time-${currentPrayer.toLowerCase()}`}>{currentTime}</h1>
                </div>
            }
        </div>
        </>
    )

}

export default JamaatPrayer