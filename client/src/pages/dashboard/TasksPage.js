import Header from "../../components/Header";
import SideNavigation from "../../components/SideNavigation";
import {Breadcrumb, Button, Col, Icon, Modal, Row, Textarea, TextInput} from "react-materialize";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import './css/taskPage.css'
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";

const Task = ()=>{

    const [dueDate, setDueDate] = useState(new Date())
    const [desc,setDesc] = useState('')

    function handleDelete(){

    }

    function handleEdit(){

    }

    return(
        <div className="left-align task-card" style={{border: '1px solid gray', borderRadius: '5px'}}>
            <div style={{borderBottom: "1px solid gray", padding: '10px'}}>
                <b><a href="#">Имя клиента</a></b>
            </div>
            <div style={{borderBottom: "1px solid gray", padding: '10px'}}>
                <b>Звонок</b>
                <p>Описание</p>
            </div>
            <div style={{borderBottom: "1px solid gray", padding: '10px'}}>
                <Row style={{margin: "0"}} className="center-align">
                    <Col style={{cursor: "pointer"}} s={4}><Icon style={{cursor: "pointer"}} className="green-text">check</Icon></Col>
                    <Modal
                        id="modal-edit-task"
                        header="Редактирование"
                        actions={[
                            <Button flat modal="close" node="button" className="red white-text left" waves="red">Отмена</Button>,
                            <Button onClick={()=>handleEdit()} flat modal="close" node="button" className="green white-text" waves="green">Сохранить</Button>
                        ]}
                        trigger={
                            <Col style={{cursor: "pointer"}} s={4}><Icon style={{cursor: "pointer"}}>edit</Icon></Col>
                        }
                    >
                        <label htmlFor="">
                            <p>Дата и время</p>
                            <DateTimePicker format="dd-MM-yyyy hh:mm" onChange={value=>setDueDate(value)} value={dueDate} locale="ru" disableClock showLeadingZeros={false}/>
                        </label>
                        <Textarea value={desc} onChange={e => setDesc(e.target.value)} label="Описание"/>
                    </Modal>
                    <Modal
                        header="Вы действительно хотите удалить задачу?"
                        actions={[
                            <Button flat modal="close" node="button" className="green white-text left" waves="green">Отмена</Button>,
                            <Button onClick={(e)=>handleDelete(e)} flat modal="close" node="button" className="red white-text" waves="red">Удалить</Button>
                        ]}
                        trigger={
                            <Col onClick={()=>handleDelete()} style={{cursor: "pointer"}} s={4}><Icon className="red-text">delete</Icon></Col>
                        }
                    >
                        <p>Измение будет невозможно вернуть</p>
                    </Modal>
                </Row>
            </div>
        </div>
    )
}


const TasksPage = () =>{
    const user = useContext(UserContext)
    const [accessToken] = user.accessToken
    const [tasks, setTasks] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/api/action', {headers: {'authorization': "Bearer "+accessToken}})
            .then(res=>{
                console.log(res.data)
            })
            .catch(err=>console.lor(err))
    },[])

    const hrStyle = {
        width: "100%",
        height: "1px",
        margin: "10px auto 20px auto"
    }
    return(
        <>
            <Header/>
            <Row className="mainRow">
                <Col s={2}><SideNavigation active="tasks"/></Col>
                <Col s={10}>
                    <div className="content">
                        <Breadcrumb className="blue bc">
                            <a href="/clients">Главная</a>
                            <a href="/tasks">Задачи</a>
                        </Breadcrumb>
                        <div className="tableWrapper">
                            <div className="tableHolder">
                                <Row>
                                    <Col style={{padding: '0 10px'}} className="center-align" s={4}>
                                        <b>Сегодня</b>
                                        <div style={{...hrStyle, background: "orange"}}/>
                                        <Task/>
                                    </Col>
                                    <Col style={{padding: '0 10px'}} className="center-align" s={4}>
                                        <b>Завтра</b>
                                        <div style={{...hrStyle, background: "lightblue"}}/>
                                    </Col>
                                    <Col style={{padding: '0 10px'}} className="center-align" s={4}>
                                        <b>Просроченные</b>
                                        <div style={{...hrStyle, background: "red"}}/>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}


export default TasksPage