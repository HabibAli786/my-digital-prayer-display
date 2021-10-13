import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap'
import { Redirect } from 'react-router';
import './User.css'

function User() {

    const [auth, setAuth] = useState(false)

    const Logout = () => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:3001/admin/logout'
        }).then((res) => {
            console.log(res.data)
            if(res.data === "Logged out") {
                setAuth(false)
            } else {
                setAuth(true)
            }
        })
    }


    return (
        <>
        <div>
            <h1>Welcome to the Admin Page</h1>
            <Button onClick={Logout}>Logout</Button>
            {
                !auth && <Redirect to="/admin" />
            }
        </div>
        </>
    )
}

export default User