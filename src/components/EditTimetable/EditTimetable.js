import axios from "axios";
import { useEffect, useState, useMemo } from "react"
import { Button, Container, Row, Table } from "react-bootstrap";
import { connect } from "react-redux";
// import { connect, useDispatch } from "react-redux";
import { Redirect } from 'react-router';
import { useTable } from "react-table";

import Header from "../Header/Header";
import { set_auth, set_username } from "../Redux/actions/authAction";
// import { authenticate } from "../Redux/reducers/authReducer";

import './EditTimetable.css'
import LoadingIcon from "../LoadingIcon/LoadingIcon";

function EditTimetable(props) {

    // const dispatch = useDispatch()
    const { auth } = props

    const columns = useMemo(
        () => [
            {
                        Header: 'Row',
                        accessor: 'row', // accessor is the "key" in the data
                      },
                      {
                        Header: 'Date',
                        accessor: 'd_date',
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
                      {
                        Header: 'Hijri Date',
                        accessor: 'hijri_date',
                      },
                      {
                        Header: 'Hijri Month',
                        accessor: 'hijri_month',
                      },
                      {
                        Header: 'Hijri Year',
                        accessor: 'hijri_year',
                      },
        ],
        []
    )

    const [data, setData] = useState([{
      row: 0,
      d_date: "00/00/0000",
      fajr_begins: "00:00",
      fajr_jamaat: "00:00",
      sunrise: "00:00",
      zuhr_begins: "00:00",
      zuhr_jamaat: "00:00",
      asr_begins: "00:00",
      asr_jamaat: "00:00",
      maghrib_begins: "00:00",
      maghrib_jamaat: "00:00",
      isha_begins: "00:00",
      isha_jamaat: "00:00",
      hijri_date: "00",
      hijri_month: "",
      hijri_year: "0000"
    }])
    
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(null)
    const [skipPageReset, setSkipPageReset] = useState(false)
    const [post, setPost] = useState(false)

    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        setData(old =>
        old.map((row, index) => {
            if (index === rowIndex) {
            return {
                ...old[rowIndex],
                [columnId]: value,
            }
            }
            return row
        })
        )
    }

    const submitData = () => {
      setPost(true)
    }

    // After data chagnes, we turn the flag back off
    // so that if data actually changes when we're not
    // editing it, the page is reset
    useEffect(() => {
        setSkipPageReset(false)
    }, [])

    useEffect(() => {
        // dispatch(authenticate())
        let source = axios.CancelToken.source();
        if(loading) {
          axios.get('http://localhost:3001/prayertimes/request/all', { cancelToken: source.token })
          .then((res) => {
              // console.log(res.data)
              setData(res.data)
              setLoading(false)
          })
          .catch((err) => {
              console.log(err)
          })
        }

        return function () {
          source.cancel("Cancelling in cleanup");
        }
    }, [])

    useEffect(() => {
      let source = axios.CancelToken.source();
      if(post) {
        // console.log(data)
        axios({
            method: 'POST',
            data: data,
            withCredentials: true,
            url: 'http://localhost:3001/prayertimes',
            cancelToken: source.token
        })
        .then((res) => {
          const message = res.data
          if(message === "Success") {
            setSuccess(true)
          } else {
            setSuccess(false)
          }
          // console.log(res.data)
        })
      }
      
      return function () {
        source.cancel("Cancelling in cleanup");
      }
    }, [post, data])

    const EditableCell = ({
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData, // This is a custom function that we supplied to our table instance
      }) => {
        // We need to keep and update the state of the cell normally
        const [value, setValue] = useState(initialValue)
      
        const onChange = e => {
          setValue(e.target.value)
        }
      
        // We'll only update the external data when the input is blurred
        const onBlur = () => {
          updateMyData(index, id, value)
        }
      
        // If the initialValue is changed external, sync it up with our state
        useEffect(() => {
          setValue(initialValue)
        }, [initialValue])
      
        return <input className="edit_input" value={value} onChange={onChange} onBlur={onBlur} />
      }

      const defaultColumn = {
        Cell: EditableCell,
      }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
      } = useTable(
        {
          columns,
          data,
          defaultColumn,
          updateMyData,
        }
    )

    
    if(auth === "Unsuccessfully Authenticated" || auth === "Server Offline" || !auth ) {
        return ( <Redirect to="/admin" /> )
    }
    if(loading === true) {
      return (
        <LoadingIcon />
      )
    } else {
        return (
            <>
            <Header />
            <h1 className="editTimetable_title">Edit Timetable</h1>
            <Container className="editTimetable_container">
                <Row>
                  <Button className="editTimetable_submitbtn" onClick={submitData}>Submit</Button>
                  {success &&
                    <h1 className="editTimetable_success">Succesfully Updated Timetable</h1>
                  }
                </Row>
                <Row>
                <Table className="edit_table" {...getTableProps()}>
                    <thead>
                    {// Loop over the header rows
                    headerGroups.map(headerGroup => (
                        // Apply the header row props
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {// Loop over the headers in each row
                        headerGroup.headers.map(column => (
                            // Apply the header cell props
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