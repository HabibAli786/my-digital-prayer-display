import axios from "axios";
import { useEffect, useState, useMemo } from "react"
import { Button, Container, Row, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import { useTable } from "react-table";
import Header from "../Header/Header";
import { set_auth, set_username } from "../Redux/actions/authAction";
import { authenticate } from "../Redux/reducers/authReducer";

import './EditTimetable.css'

function EditTimetable(props) {

    const { auth, set_auth, username } = props
    
    const [rowData, setRowData] = useState([{
        row: 0,
        date: "00/00/0000",
        fajr_begins: "00:00",
        fajr_jamaat: "00:00",
        sunrise: "00:00",
        zuhr_begins: "00:00",
        zuhr_jamaat: "00:00",
        asr_begins: "0:00",
        asr_jamaat: "00:00",
        maghrib_begins: "00:00",
        maghrib_jamaat: "00:00",
        isha_begins: "00:00",
        isha_jamaat: "00:00"
    }])

    const data = useMemo(() => rowData, [rowData])

    const columns = useMemo(
        () => [
            {
                        Header: 'Row',
                        accessor: 'row', // accessor is the "key" in the data
                      },
                      {
                        Header: 'Date',
                        accessor: 'date',
                      },
                      {
                        Header: 'Fajr Begins',
                        accessor: 'fajr_begins',
                      },
                      {
                        Header: 'Fajr Jamaat',
                        accessor: 'fajr_jamaat',
                      },
                      {
                        Header: 'Sunrise',
                        accessor: 'sunrise',
                      },
                      {
                        Header: 'Zuhr Begins',
                        accessor: 'zuhr_begins',
                      },
                      {
                        Header: 'Zuhr Jamaat',
                        accessor: 'zuhr_jamaat',
                      },
                      {
                        Header: 'Asr Begins',
                        accessor: 'asr_begins',
                      },
                      {
                        Header: 'Asr Jamaat',
                        accessor: 'asr_jamaat',
                      },
                      {
                        Header: 'Maghrib Begins',
                        accessor: 'maghrib_begins',
                      },
                      {
                        Header: 'Maghrib Jamaat',
                        accessor: 'maghrib_jamaat',
                      },
                      {
                        Header: 'Isha Begins',
                        accessor: 'isha_begins',
                      },
                      {
                        Header: 'Isha Jamaat',
                        accessor: 'isha_jamaat',
                      },
        ],
        []
      )

    const getData = () => {
        axios.get('http://localhost:3001/prayertimes/request/all')
        .then((res) => {
            setRowData(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const tableInstance = useTable({ columns, data })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    useEffect(() => {
        authenticate()
        getData()
    }, [])

    
    if(auth === "Unsuccessfully Authenticated" || auth === "Server Offline" || !auth ) {
        return ( <Redirect to="/admin" /> )
    } else {
        return (
            <>
            <Header />
            <h1 style={{marginTop : "15px", fontSize: "50px"}}>Edit Timetable</h1>
            <Container className="editTimetable_container" fluid>
                <Row>
                    <Button className="editTimetable_submitbtn">Submit</Button>
                </Row>
                <Row>
                <Table className="edit_table" striped bordered hover {...getTableProps()}>
                    <thead>
                    {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {// Render the header
                                        column.render('Header')}
                                </th>
                        ))}
                        </tr>
                    ))}
                    </thead>
                    {/* Apply the table body props */}
                    <tbody {...getTableBodyProps()}>
                    {// Loop over the table rows
                    rows.map(row => {
                        // Prepare the row for display
                        prepareRow(row)
                        return (
                        // Apply the row props
                        <tr {...row.getRowProps()}>
                            {// Loop over the rows cells
                            row.cells.map(cell => {
                            // Apply the cell props
                            return (
                                <td {...cell.getCellProps()}>
                                {// Render the cell contents
                                cell.render('Cell')}
                                </td>
                            )
                            })}
                        </tr>
                        )
                    })}
                    </tbody>

                </Table>
                </Row>
            </Container>
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

export default connect(matchStateToProps, mapDispatchToProps)(EditTimetable);