import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'
import { Redirect } from 'react-router';
import './User.css'

function User(props) {

    const [auth, setAuth] = useState(false)

    const Logout = () => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:3001/admin/logout'
        }).then((res) => {
            console.log(res.data)
            if(res.data === "Logged out") {
                setAuth("Not Authenticated")
            } else {
                setAuth("Authenticated")
            }
        })
    }

    useEffect(() => {
        console.log("I am prop " + props.location.state.auth)
        if(props.location.state.auth === true) {
            setAuth("Authenticated")
        } else {
            setAuth("Not Authenticated")
        }
        // console.log("I am coming from props" + props.location.state.auth)
    }, [])

    console.log("I am state " + auth)

    return (
        <>
            {
                auth === "Not Authenticated" ? <Redirect to="/admin" />
                :
                <>
                <h1>Welcome to the Admin Page</h1>
                <Button onClick={Logout}>Logout</Button>
                </>
            }
        </>
    )
}

export default User