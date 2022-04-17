import 'materialize-css'
import './css/authPage.css'
import {Button, Checkbox, Col, Row, TextInput} from "react-materialize";
import {useContext, useState} from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import UserContext from "../../context/UserContext";

const AuthPage = () =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    //const [hidePass, setHidePass] = useState(true)
    const [remember, setRemember] = useState(false)

    const user = useContext(UserContext)
    const [accessToken, setAccessToken] = user.accessToken

    const navigate = useNavigate()

    function handleFormSubmit(e){
        e.preventDefault()

        let data = {login: email, password}
        axios.post('http://localhost:5000/login', data, {withCredentials: true})
            .then(res=>{
                localStorage.setItem('token', res.data.accessToken)
                setAccessToken(res.data.accessToken)
                navigate("/clients")
            })
            .catch(e=>{
                console.log(e)
            })
    }

    return(
        <div className="outerWrapper">
            <div className="wrapper">
                <h2 style={{textAlign: "right"}}>CRM</h2>
                <form onSubmit={e=>handleFormSubmit(e)} action="">
                    <TextInput
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        icon="email"
                        placeholder="Почта"
                        email
                        validate
                        required
                        error="Введите адрес почты"
                    />

                    <TextInput
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        placeholder="Пароль"
                        icon="lock"
                        password
                        validate
                        error="Введите пароль"
                        required
                    />
                    <Row>
                        <Col s={6}>
                            <Checkbox
                                value=''
                                onChange={e=>{setRemember(e.target.checked)}}
                                checked={remember}
                                className="checkbox-orange"
                                filledIn
                                label="Запомнить меня"/>
                        </Col>
                        <Col style={{textAlign: "right"}} s={6}>
                            <a href="forgot">Забыл пароль</a>
                        </Col>
                    </Row>
                    <Button className="blue" style={{width: "100%"}}>Войти</Button>
                </form>
            </div>
        </div>
    )
}

export default AuthPage