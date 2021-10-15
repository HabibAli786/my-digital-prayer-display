import { render } from '@testing-library/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'
import { Redirect } from 'react-router';
import './User.css'

function User(props) {

    const [auth, setAuth] = useState(false)
    const [UserData, setUserData] = useState(false)

    const getUserData = () => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:3001/admin/user'
        }).then((res) => {
            console.log(res.data)
            const data = res.data
            if(data.username) {
                setUserData({
                    username: data.username
                })
            }
        })
    }

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
        if(props.location.state) {
            if(props.location.state.auth === true) {
                setAuth("Authenticated")
                getUserData()
            } else {
                setAuth("Not Authenticated")
            }
        } else {
            setAuth("Not Authenticated")
        }
    }, [])

    if(auth === "Not Authenticated") {
        return ( <Redirect to="/admin" /> )
    } else {
        return (
            <>
            <h1>Welcome to your Admin Page, {UserData.username}</h1>
            <Button onClick={Logout}>Logout</Button>
            </>
        )
    }
}

export default User