import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap'
import axios from 'axios';
import './Notifications.css'
import { connect, useDispatch } from 'react-redux';
import { set_count, set_notifi } from '../Redux/actions/notificationAction';
import { setNotifi } from '../Redux/reducers/notificationReducer';


function Notifications(props) {

    const { slideshow, notifi, count, set_count } = props

    const [animation, setAnimation] = useState(false)
    // const [count, setCount] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setNotifi())
    }, [])

    // Notification Animation useEffect
    useEffect(() => {
        // How long the text will appear
        if(animation === false) {
            setTimeout(() => {
                setAnimation(true)
            }, 6000)
        } else {
            if(animation === true){
                setTimeout(() => {
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
    }, [animation])

    console.log(count)
    console.log(animation)

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