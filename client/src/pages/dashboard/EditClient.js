import Header from "../../components/Header";
import {Breadcrumb, Button, Col, Icon, Modal, Row, Select, Tab, Tabs, Textarea, TextInput} from "react-materialize";
import SideNavigation from "../../components/SideNavigation";
import {useContext, useEffect, useMemo, useState} from "react";
import {useAsyncDebounce, useGlobalFilter, useSortBy, useTable} from "react-table";
import './css/editClient.css'
import axios from "axios";
import UserContext from "../../context/UserContext";
import {useParams} from "react-router-dom";
import moment from "moment";


const MainForm = ()=> {
    const {id} = useParams()

    const user = useContext(UserContext)
    const [accessToken, setAccessToken] = user.accessToken
    const [userData, setUserData] = user.data

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [inn, setInn] = useState('')
    const [alias, setAlias] = useState('')
    const [timeZone, setTimeZone] = useState('')
    const [email, setEmail] = useState('')
    const [site, setSite] = useState('')
    const [address, setAddress] = useState('')
    const [note, setNote] = useState('')
    const [typeAction, setTypeAction] = useState('')
    const [create, setCreate] = useState('')
    const [lastUpd, setLastUpd] = useState('')

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/clients/getClient/${id}`, {headers: {'authorization': 'bearer ' + accessToken}})
            .then(res=>{
                setName(res.data.name)
                setPhone(res.data.phone)
                setInn(res.data.inn)
                setAlias(res.data.alias)
                setTimeZone(res.data.time_zone)
                setEmail(res.data.email)
                setSite(res.data.website)
                setAddress(res.data.address)
                setNote(res.data.note)
                setTypeAction(res.data.type_action)
                setCreate(res.data.create)
                setLastUpd(res.data.last_upd)
            })
            .catch(err=>console.log(err))
    },[])

    function handleFormEdit(e){
        e.preventDefault()

        let data = {name, phone, inn, alias, time_zone: timeZone, email, website: site, address, note, type_action: typeAction}
        console.log(data)
        axios.put(`http://localhost:5000/api/clients/updateClient/${id}`, data, {headers: {'authorization': 'bearer ' + accessToken}})
            .then(res=>{
                console.log('success',res.data)
            })
            .catch(err=>console.log(err))
    }

    function handleDelete(e){
        e.preventDefault()
        axios.delete(`http://localhost:5000/api/clients/deleteClient/${id}`, {headers: {'authorization': 'bearer ' + accessToken}})
            .then(()=>{
                window.location = (`${window.location.origin}/clients`)
            })
            .catch(err=>console.log(err))
    }


    return(
        <form onSubmit={e=>{handleFormEdit(e)}} action="">
            <Row>
                <TextInput onChange={e=>setName(e.target.value)} value={name} s={3} label="???????????? ????????????????"/>
                <TextInput onChange={e=>setAlias(e.target.value)} value={alias} s={3} error="???????? ???? ?????????? ???????? ????????????" validate label="?????????????????????? ????????????????"/>
                <TextInput onChange={e=>setAddress(e.target.value)} value={address} s={3} label="????????????"/>
                <TextInput onChange={e=>setPhone(e.target.value)} value={phone} s={3} validate label="?????????????? ????????????????"/>
            </Row>
            <Row>
                <TextInput onChange={e=>setEmail(e.target.value)} value={email} s={4} email validate label="Email"/>
                <TextInput onChange={e=>setInn(e.target.value)} value={inn} s={4} label="??????"/>
                <TextInput onChange={e=>setSite(e.target.value)} value={site} s={4} validate label="???????? ????????????????"/>
            </Row>
            <Row>
                <Select onChange={e=>setTimeZone(e.target.value)} value={timeZone} s={3} label="?????????????? ????????">
                    <option value="">??/??</option>
                    <option value="0">0</option>
                    <option value="-1">-1</option>
                    <option value="1">+1</option>
                    <option value="2">+2</option>
                    <option value="3">+3</option>
                    <option value="4">+4</option>
                    <option value="5">+5</option>
                    <option value="6">+6</option>
                    <option value="7">+7</option>
                    <option value="8">+8</option>
                    <option value="9">+9</option>
                </Select>
                <TextInput onChange={e=>setTypeAction(e.target.value)} value={typeAction} s={3} validate label="?????? ????????????????????????"/>
                <TextInput onChange={e=>setCreate(e.target.value)} s={3} disabled label="???????? ??????????????????????" value={moment(create).format("DD.MM.YYYY")}/>
                <TextInput onChange={e=>setLastUpd(e.target.value)} s={3} disabled label="???????? ????????????????????" value={moment(lastUpd).format("DD.MM.YYYY")}/>
            </Row>
            <Row>
                <Col style={{padding: "0 10px"}} s={3}>
                    <p>??????????????</p>
                    <p><a href="/account">{userData.full_name}</a></p>
                </Col>
                <Textarea onChange={e=>setNote(e.target.value)} value={note} s={6} label="????????????????????"/>
            </Row>
            <Row>
                <Button onClick={e => handleFormEdit(e)} className="right">??????????????????</Button>
                <Row style={{padding: "0 20px"}}>
                    <Col>
                        <Modal
                            header="???? ?????????????????????????? ???????????? ?????????????? ???????????????"
                            actions={[
                                <Button flat modal="close" node="button" className="green white-text left" waves="green">????????????</Button>,
                                <Button onClick={(e)=>handleDelete(e)} flat modal="close" node="button" className="red white-text" waves="red">??????????????</Button>
                            ]}
                            trigger={
                                <Button className="red" waves="red" style={{display: "flex", marginRight: "10px"}}>
                                    <span>??????????????</span>
                                    <Icon className="right">delete</Icon>
                                </Button>
                            }
                        >
                            <p>?????????????? ?????????? ???????????????????? ??????????????</p>
                        </Modal>
                    </Col>
                    <Col>
                        <Button style={{display: "flex"}}>
                            <a className="white-text" href={`tel:${phone}`}>??????????????????</a>
                            <Icon className="right">phone_in_talk</Icon>
                        </Button>
                    </Col>
                </Row>
            </Row>
        </form>
    )
}


const ContactTable = ()=> {
    const data = useMemo(()=>[
        {
            fullname: '???????????? ??.??.',
            phone: '+7(953)743-03-88',
            email: 'ivanovii@mail.ru',
            position: '',
            description: '???????????????? ????????????????????',
            actions: (<><Button>????????????????</Button><Button>??????????????</Button></>)
        }
    ],[])
    const columns = useMemo(()=>[
        {
            Header: '??.??.??.',
            accessor: 'fullname'
        },
        {
            Header: '??????????????',
            accessor: 'phone'
        },
        {
            Header: 'E-mail',
            accessor: 'email'
        },
        {
            Header: '??????????????????',
            accessor: 'position'
        },
        {
            Header: '????????????????????',
            accessor: 'description'
        },
        {
            Header: '????????????????',
            accessor: 'actions'
        },
    ], [])


    const tableInstance = useTable({columns, data}, useSortBy)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance
    return(
        <table className="highlight contacts-table" {...getTableProps()}>
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
    )
}


const RequisiteForm = ()=>{
    function handleFormRequisite(e){
        e.preventDefault()
    }


    return(
        <form onSubmit={e=>{handleFormRequisite(e)}} action="">
            <Row>
                <TextInput s={3} error="???????? ???? ?????????? ???????? ????????????" validate label="??????"/>
                <TextInput s={3} label="????????"/>
                <TextInput s={3} label="??????"/>
                <TextInput s={3} validate label="?????????????????????? ????????????"/>
            </Row>
            <Row>
                <TextInput s={3} label="????????"/>
                <TextInput s={3} label="?????? ??????????"/>
                <TextInput s={3} label="?????????????????? ????????"/>
                <TextInput s={3} label="???????????????????????????????? ????????"/>
            </Row>
            <Row>
                <TextInput s={3} label="?????? ????????????????????????"/>
                <TextInput s={3} label="?????????????????? ????????????????????????"/>
            </Row>
            <Row>
                <Button className="right">??????????????????</Button>
            </Row>
        </form>
    )
}

/*
const EditableCell = ({
    value: initialValue,
    row: {index},
    column: {id},
    updateMyData
                      }) => {
    const [value, setValue] = useState(initialValue)

    const onChange = e =>{
        setValue(e.target.value)
    }

    const onBlur = () =>{
        updateMyData(index, id, value)
    }

    useEffect(()=>{
        setValue(initialValue)
    },[initialValue])

    return <input value={value} onChange={onChange} onBlur={onBlur} />
}
*/
/*
const defaultColumn = {
    Cell: EditableCell
}
*/
function GlobalFilter({globalFilter, setGlobalFilter}) {
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
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
                placeholder="??????????"
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


const EditClient = ()=> {
    return(
        <>
            <Header/>
            <Row className="mainRow">
                <Col s={2}>
                    <SideNavigation active='clients'/>
                </Col>
                <Col s={10}>
                    <div className="content">
                        <Breadcrumb className="blue bc">
                            <a href="/clients">??????????????</a>
                            <a href="/clients">??????????????</a>
                            <a href="/clients/edit">????????????????????????????</a>
                        </Breadcrumb>
                        <Tabs>
                            <Tab title="??????????????">
                                <div className="wrapperForm">
                                    <div className="holderForm">
                                        <MainForm/>
                                    </div>
                                </div>
                            </Tab>
                            <Tab title="????????????????">
                                <div className="wrapperForm">
                                    <div className="holderForm">
                                        <ContactTable/>
                                    </div>
                                </div>
                            </Tab>
                            <Tab title="??????????????????">
                                <div className="wrapperForm">
                                    <div className="holderForm">
                                        <RequisiteForm/>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </Col>
            </Row>
        </>
    )
}


export default EditClient