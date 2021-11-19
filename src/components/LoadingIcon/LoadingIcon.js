import { Button, Container, Row, Table, Spinner } from "react-bootstrap";
import './LoadingIcon.css'

function LoadingIcon(props) {
    return (
            <Spinner className="spinner" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
           
    )
}


export default LoadingIcon