import './css/clientsPage.css'
import Header from "../../components/Header";
import SideNavigation from "../../components/SideNavigation"
import {Breadcrumb, Button, Col, Icon, Row, Tab, Tabs, TextInput} from "react-materialize";
import {useContext, useEffect, useMemo, useState} from "react";
import $ from 'jquery'
import {useTable, useSortBy, useGlobalFilter, useAsyncDebounce} from "react-table";
import axios from "axios";
import UserContext from "../../context/UserContext";
import moment from "moment";

function styleData(){
    for (let i = 0; i < $('table tbody tr').length; i++) {
        let dataCell = $($('table tbody tr')[i]).children()[0] //icon
        let color = $(dataCell).text()+"-text"
        $(dataCell).addClass(color)
        $(dataCell).html("<i class='material-icons'>lens</i>")

        //phone
        let phone = $($('table tbody tr')[i]).children()[2]
        let phoneNumber = $(phone).text()
        let phoneLink = phoneNumber.replace(/[^+\d]/g, '')
        $(phone).html(`<a href="${"tel:"+phoneLink}">${phoneNumber}</a>`)

        //Date
        let dateCell = $($('table tbody tr')[i]).children()[4]
        let newDate = moment(new Date(dateCell.innerHTML)).format("DD.MM.YYYY")
        $(dateCell).text(newDate)
    }
}

function GlobalFilter({globalFilter, setGlobalFilter}) {
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
        styleData()
    }, 200);

    return (
        <Row className="filter-row">
            <TextInput
                s={6}
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value)
                    onChange(e.target.value)
                }}
                placeholder="Поиск"
            />
            <Col>
                <Button onClick={()=>{
                    setValue("")
                    onChange("")
                }}><Icon>close</Icon></Button>
            </Col>
        </Row>
    )
}
const MyClientsTable = () =>{
    const user = useContext(UserContext)
    const [accessToken, setAccessToken] = user.accessToken

    const [clients, setClients] = useState([])

    useEffect(()=>{
        let req = {headers: {'authorization': "bearer "+accessToken}}
        axios.get("http://localhost:5000/api/clients/my", req)
            .then(res=>{
                setClients(res.data)
            })
            .catch(e=>console.log(e))
    },[])

    const data = useMemo(()=>{
        let newClients = []
        for (let i = 0; i < clients.length; i++) {
            clients[i].alias = (<a href={"clients/edit/"+clients[i].id}>{clients[i].alias}</a>)
            newClients.push(clients[i])
        }
        return newClients
    },[clients])
    const columns = useMemo(()=>[
        {
            Header: 'Актуальность',
            accessor: 'inactive'
        },
        {
            Header: 'Наименование',
            accessor: 'alias'
        },
        {
            Header: 'Телефон',
            accessor: 'phone'
        },
        {
            Header: 'Город',
            accessor: 'address'
        },
        {
            Header: 'Дата регистрации',
            accessor: 'сreate'
        },
        {
            Header: 'ИНН',
            accessor: 'inn'
        },
        {
            Header: 'Тип деятельности',
            accessor: 'type_action'
        }
    ], [])

    useEffect(()=>{
        styleData()
    },[data])

    const tableInstance = useTable({columns, data}, useGlobalFilter, useSortBy)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = tableInstance



return(

<div className="tableWrapper">
    <div className="tableHolder">
        <Row>
            <Col s={6}>
                <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter}/>
            </Col>
            <Col s={6}>
                <Button className="blue right"><a className="white-text" href="/clients/create">Добавить клиента</a></Button>
            </Col>
        </Row>
        <table className="highlight" {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                        >
                            {column.render('Header')}
                            <span>
                                            {column.isSorted
                                                ? column.isSortedDesc ? <Icon>arrow_drop_down</Icon>:<Icon>arrow_drop_up</Icon>:''
                                            }
                                        </span>
                        </th>
                    ))}
                </tr>
            ))}

            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                                <td{...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>
</div>
)
}
const AllClientsTable = () =>{
    const user = useContext(UserContext)
    const [accessToken, setAccessToken] = user.accessToken

    const [clients, setClients] = useState([])

    useEffect(()=>{
        let req = {headers: {'authorization': "bearer "+accessToken}}
        axios.get("http://localhost:5000/api/clients/all", req)
            .then(res=>{
                setClients(res.data)
            })
            .catch(e=>console.log(e))
    },[])

    const data = useMemo(()=>clients,[clients])
    const columns = useMemo(()=>[
        {
            Header: 'Актуальность',
            accessor: 'inactive'
        },
        {
            Header: 'Наименование',
            accessor: 'alias'
        },
        {
            Header: 'Телефон',
            accessor: 'phone'
        },
        {
            Header: 'Город',
            accessor: 'address'
        },
        {
            Header: 'Дата регистрации',
            accessor: 'сreate'
        },
        {
            Header: 'ИНН',
            accessor: 'inn'
        },
        {
            Header: 'Тип деятельности',
            accessor: 'type_action'
        }
    ], [])

    useEffect(()=>{
        styleData()
    },[data])

    const tableInstance = useTable({columns, data}, useGlobalFilter, useSortBy)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = tableInstance



    return(

        <div className="tableWrapper">
            <div className="tableHolder">
                <Row>
                    <Col s={6}>
                        <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter}/>
                    </Col>
                    <Col s={6}>
                        <Button className="blue right"><a className="white-text" href="/clients/create">Добавить клиента</a></Button>
                    </Col>
                </Row>
                <table className="highlight" {...getTableProps()}>
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                >
                                    {column.render('Header')}
                                    <span>
                                            {column.isSorted
                                                ? column.isSortedDesc ? <Icon>arrow_drop_down</Icon>:<Icon>arrow_drop_up</Icon>:''
                                            }
                                        </span>
                                </th>
                            ))}
                        </tr>
                    ))}

                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td{...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


const ClientsPage = ()=>{


return(
<>
    <Header/>
    <Row className="mainRow">
        <Col s={2}><SideNavigation active="clients"/></Col>
        <Col s={10}>
        <div className="content">
            <Breadcrumb className="blue bc">
                <a href="/clients">Главная</a>
                <a href="/clients">Клиенты</a>
            </Breadcrumb>
            <Tabs>
                <Tab title="Мои клиенты">
                    <MyClientsTable/>
                </Tab>
                <Tab title="Все клиенты">
                    <AllClientsTable/>
                </Tab>
            </Tabs>
        </div>
        </Col>
    </Row>
</>
)
}

export default ClientsPage