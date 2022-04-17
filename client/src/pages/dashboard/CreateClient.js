import Header from "../../components/Header";
import {Breadcrumb, Button, Col, Row, Select, Textarea, TextInput} from "react-materialize";
import SideNavigation from "../../components/SideNavigation";
import './css/createClient.css'
import axios from "axios";
import {useContext, useState} from "react";
import UserContext from "../../context/UserContext";
import moment from "moment/moment";


const CreateClient = ()=> {

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

    function handleFormCreate(e){
        e.preventDefault()

        let data = {
            name, phone, inn, alias, time_zone: timeZone, email, website: site, address, note, type_action: typeAction
        }
        axios.post('http://localhost:5000/api/clients/createClient', data, {headers: {'authorization': "Bearer " + accessToken}})
            .then(res=>{
                alert(res.data)
            })
            .catch(err=>console.log(err))
    }

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
                            <a href="/clients">Главная</a>
                            <a href="/clients">Клиенты</a>
                            <a href="/clients/create">Создать</a>
                        </Breadcrumb>

                        <div className="wrapperForm">
                            <div className="holderForm">
                                <form onSubmit={e=>{handleFormCreate()}} action="">
                                    <Row>
                                        <TextInput value={name} onChange={e=>setName(e.target.value)} s={3} error="Поле не может быть пустым" validate label="Полное название"/>
                                        <TextInput value={alias} onChange={e=>setAlias(e.target.value)} s={3} error="Поле не может быть пустым" validate label="Сокращенное название"/>
                                        <TextInput value={address} onChange={e=>setAddress(e.target.value)} s={3} label="Адресс"/>
                                        <TextInput value={phone} onChange={e=>setPhone(e.target.value)} s={3} validate label="Телефон компании"/>
                                    </Row>
                                    <Row>
                                        <TextInput value={email} onChange={e=>setEmail(e.target.value)} s={4} email validate label="Email"/>
                                        <TextInput value={inn} onChange={e=>setInn(e.target.value)} s={4} label="ИНН"/>
                                        <TextInput value={site} onChange={e=>setSite(e.target.value)} s={4} validate label="Сайт компании"/>
                                    </Row>
                                    <Row>
                                        <Select value={timeZone} onChange={e=>setTimeZone(e.target.value)} s={3} label="Часовой пояс">
                                            <option value="">Н/Д</option>
                                            <option value="0">0</option>
                                            <option value="-1">-1</option>
                                            <option value="+1">+1</option>
                                            <option value="+2">+2</option>
                                            <option value="+3">+3</option>
                                            <option value="+4">+4</option>
                                            <option value="+5">+5</option>
                                            <option value="+6">+6</option>
                                            <option value="+7">+7</option>
                                            <option value="+8">+8</option>
                                            <option value="+9">+9</option>
                                        </Select>
                                        <TextInput value={typeAction} onChange={e=>setTypeAction(e.target.value)} s={3} validate label="Тип деятельности"/>
                                        <TextInput s={3} disabled label="Дата регистрации" value={moment(new Date()).format("DD.MM.YYYY")}/>
                                        <TextInput s={3} disabled label="Дата обновления" value="Не указан(о/а)"/>
                                    </Row>
                                    <Row>
                                        <Col s={3}>
                                            <p>Куратор</p>
                                            <p><a href="/account">{userData.full_name}</a></p>
                                        </Col>
                                        <Textarea value={note} onChange={e=>setNote(e.target.value)} s={6} label="Примечание"/>
                                    </Row>
                                    <Row>
                                        <Button onClick={e => handleFormCreate(e)} className="right">Сохранить</Button>
                                    </Row>
                                </form>
                            </div>
                        </div>

                    </div>
                </Col>
            </Row>
        </>
    )
}


export default CreateClient