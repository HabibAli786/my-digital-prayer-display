import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios';
import './Notifications.css'


function Notifications() {
    const [animation, setAnimation] = useState(false)
    const [notifications, setNotifications] = useState([
        "Surah Mulk after Maghrib", "Dars after Zuhr", "Collections for Eid after Jummah", "Eid on the 23rd of July"
    ])
    const [count, setCount] = useState(0)

    // Notification Animation useEffect
    useEffect(() => {
        // How long the text will appear
        if(animation === false) {
            setTimeout(() => {
                setAnimation(true)
            }, 10000)
        }
        // How long NEXT text will appear
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


    return (

        <Card className="card-annc mx-5">
            <Card.Body>
                <Card.Text className={animation === true ? "annc-current" : "annc-next"}>
                {notifications[count]}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Notifications