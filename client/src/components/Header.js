import './css/header.css'
import {Badge, Button, Icon, Modal} from "react-materialize";
import SystemInfo from "./SystemInfo";
import {useContext, useState} from "react";
import UserContext from "../context/UserContext";



const Notification = () =>{

}

const Header = ()=>{

    const user = useContext(UserContext)
    const [userData, setUserData] = user.data


    return(
        <header>
            <Modal
                header="Информация о системе"
                actions={[
                    <Button flat modal="close" node="button" className="red white-text"><Icon>close</Icon></Button>
                ]}
                trigger={<Button><Icon>info</Icon></Button>}>
                <SystemInfo/>
            </Modal>
            <Button><Icon>drafts</Icon><Badge className="red white-text">1</Badge></Button>
            <div className="profile">
                <a href="/account"><Icon>person</Icon></a>
                <Button><span className="black-text"><b>{userData.full_name}</b></span></Button>
                <Icon>keyboard_arrow_down</Icon>
            </div>
        </header>
    )
}

export default Header