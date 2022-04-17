import Header from "../../components/Header";
import SideNavigation from "../../components/SideNavigation";
import {Breadcrumb, Col, Row, TextInput} from "react-materialize";
import './css/accountPage.css'
import {useContext} from "react";
import UserContext from "../../context/UserContext";
import moment from "moment";

const AccountPage = ()=>{

    const user = useContext(UserContext)
    const [userData] = user.data
    console.log(userData)

    return(
        <>
            <Header/>
            <Row className="mainRow">
                <Col s={2}><SideNavigation/></Col>
                <Col s={10}>
                    <div className="content">
                        <Breadcrumb className="blue bc">
                            <a href="/clients">Главная</a>
                            <a href="/account">Профиль</a>
                        </Breadcrumb>
                    </div>

                    <div className="tableWrapper">
                        <div className="tableHolder">
                            <Row>
                                <Col style={{padding: "0 10px"}} s={3}><TextInput disabled inputClassName={"black-text"} noLayout label="Ф.И.О." value={userData.full_name}/></Col>
                                <Col style={{padding: "0 10px"}} s={3}><TextInput disabled inputClassName={"black-text"} noLayout label="Дата рождения" value={moment(userData.birth_day).format("DD.MM.YYYY")}/></Col>
                                <Col style={{padding: "0 10px"}} s={3}><TextInput disabled inputClassName={"black-text"} noLayout label="Должность" value={userData.job_title}/></Col>
                                <Col style={{padding: "0 10px"}} s={3}><TextInput disabled inputClassName={"black-text"} noLayout label="Адресс филиала" value={userData.address}/></Col>
                            </Row>

                            <Row>
                                <Col style={{padding: "0 10px"}} s={3}><TextInput disabled inputClassName={"black-text"} noLayout label="E-mail" value={userData.email}/></Col>
                                <Col style={{padding: "0 10px"}} s={3}><TextInput disabled inputClassName={"black-text"} noLayout label="Мобильный телефон" value={userData.phone}/></Col>
                                <Col style={{padding: "0 10px"}} s={3}><TextInput disabled inputClassName={"black-text"} noLayout label="О себе" value={"Не указан(о/a)"}/></Col>
                                <Col style={{padding: "0 10px"}} s={3}><TextInput disabled inputClassName={"black-text"} noLayout label="Профиль заблокирован" value={"Нет"}/></Col>
                            </Row>
                        </div>
                    </div>


                </Col>
            </Row>
        </>
    )
}


export default AccountPage