import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap'
import axios from 'axios';
import './Notifications.css'


function Notifications(props) {

    const { slideshow } = props

    const [animation, setAnimation] = useState(false)
    const [notifications, setNotifications] = useState([
        "No Notifications"
    ])
    const [count, setCount] = useState(0)

    useEffect(() => {
        let source = axios.CancelToken.source();
        axios.get(`http://localhost:3001/notifications`, {
            cancelToken: source.token
        })
            .then((response) => {
                setNotifications(response.data.notifications)
            })
            .catch((error) => {
                console.log(error)
            })
        return () => { 
            source.cancel("Cancelling in cleanup");
        }
    }, [animation])

    // Notification Animation useEffect
    useEffect(() => {
        // How long the text will appear
        if(!slideshow) {
            if(animation === false) {
                setTimeout(() => {
                    setAnimation(true)
                }, 10000)
            }
            // How long till NEXT text will appear
            if(animation === true){
                setTimeout(() => {
                    setCount(count + 1)
                    setAnimation(false)
                    if(count === notifications.length-1) {
                        setCount(0)
                    }
                }, 3000)
            }
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