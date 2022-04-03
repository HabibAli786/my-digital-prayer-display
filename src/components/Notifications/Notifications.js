import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux';
import { set_count, set_notifi } from '../Redux/actions/notificationAction';

import './Notifications.css'

function Notifications(props) {

    const { slideshow, notifi, count, set_count, set_notifi } = props

    const [animation, setAnimation] = useState(false)
    // const [count, setCount] = useState(0)

    useEffect(() => {
        let source = axios.CancelToken.source();
        // console.log("I am running in thunk")
        let notifications = null

        axios.get(`http://localhost:3001/notifications`)
            .then((response) => {
            // console.log(response.data.notifications)
            if(response.data.notifications) {
                notifications = response.data.notifications
                // console.log(notifications)
                set_notifi(notifications)
            }
        })
        .catch((error) => {
            console.log(error)
            notifications = ["No Notifications"]
            set_notifi(notifications)
        })
        
        return () => { 
            source.cancel("Cancelling in cleanup");
        }
    }, [])

    // Notification Animation useEffect
    useEffect(() => {
        let animationTrue
        let animationFalse
        // How long the text will appear
        if(animation === false) {
            animationTrue = setTimeout(() => {
                setAnimation(true)
            }, 6000)
        } else {
            if(animation === true){
                animationFalse = setTimeout(() => {
                    if(!slideshow) {
                        set_count(count + 1)
                        setAnimation(false)
                        if(count === notifi.length-1) {
                            set_count(0)
                        }
                    }
                }, 3000)
            }
        }
        return () => { 
            clearTimeout(animationTrue)
            clearTimeout(animationFalse)
        }
    }, [animation])

    console.log(notifi[count])

    return (
        <Card border="dark" className="card-annc mx-5">
            <Card.Body>
                <Card.Text className={animation === true ? "annc-current" : "annc-next"}>
                {notifi[count]}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
const matchStateToProps = state => ({
    notifi : state.notifi.notifications,
    count: state.notifi.count
  })
  
const mapDispatchToProps = (dispatch) => {
    return {
        set_notifi : (notifi) => dispatch(set_notifi(notifi)),
        set_count : (count) => dispatch(set_count(count))
    }
}

// export default Admin
export default connect(matchStateToProps, mapDispatchToProps)(Notifications);