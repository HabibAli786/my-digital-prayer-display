import axios from 'axios';
import Header from '../Header/Header';
// import { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
// import { connect, useDispatch } from 'react-redux';

import './User.css'
import Footer from '../Footer/Footer';
import { set_auth, set_username } from '../Redux/actions/authAction';
import { Link } from 'react-router-dom';
// import { authenticate } from '../Redux/reducers/authReducer';

function User(props) {

    // const dispatch = useDispatch()
    const { auth, set_auth, username, set_username } = props

    const Logout = () => {
        let source = axios.CancelToken.source();
        axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:3001/admin/logout',
            cancelToken: source.token
        }).then((res) => {
            // console.log(res.data)
            if(res.data === "Logged out") {
                set_auth(false)
                set_username(null)
            } else {
                // set_auth("Authenticated")
            }
            source.cancel('Cancelling in cleanup')
        })
    }

    // useEffect(() => {
    //     // dispatch(authenticate())
    // }, [])

    if(auth === "Unsuccessfully Authenticated" || auth === "Server Offline" || !auth ) {
        return ( <Redirect to={{ pathname: "/admin" }} />)
    } else {
        return (
            <>
            <Header />
            <Container>
                <Row className="mt-5 user-title-row">
                    <h1 className="user-title">Welcome Back, {username}</h1>
                </Row>
                <Row className="user-subheading-row">
                    <p className="mt-2 user-subheading">Please select below what you would like to do today</p>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <Link to="/uploadTimetable">
                            <Button className="button-options" variant="outline-primary" size="lg">Upload Timetable</Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to="/editTimetable">
                            <Button className="button-options" variant="outline-primary" size="lg">Edit Timetable</Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to="/uploadLogo">
                            <Button className="button-options" variant="outline-primary" size="lg">Upload Logo</Button>
                        </Link>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <Link to="/editNotifications">
                            <Button className="button-options" variant="outline-primary" size="lg">Edit Notifications</Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to="/editSlides">
                            <Button className="button-options" variant="outline-primary" size="lg">Edit Slides</Button>
                        </Link>
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
                <Row className="user-logout-row">
                    <Col>

                    </Col>
                    <Col>
                        <Button className="user-logout" onClick={Logout}>Logout</Button>
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
            </Container>
            {/* <h1>Welcome to your Admin Page, {UserData.username}</h1> */}
            <Footer />
            </>
        )
    }
}

const matchStateToProps = state => ({
    auth : state.admin.auth,
    username : state.admin.username
  })
  
const mapDispatchToProps = (dispatch) => {
    return {
        set_auth : (auth) => dispatch(set_auth(auth)),
        set_username : (username) => dispatch(set_username(username))
    }
}

export default connect(matchStateToProps, mapDispatchToProps)(User);