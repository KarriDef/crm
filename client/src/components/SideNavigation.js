import './css/sideNavigation.css'
import {SideNav, SideNavItem} from "react-materialize";

const SideNavigation = (active)=>{
    return(
        <SideNav>
            <h2 className="center"><a href="clients" className="black-text">CRM</a></h2>
            <SideNavItem className={active.active === 'clients' ? 'active-nav' : null} href="/clients">Клиенты</SideNavItem>
            <SideNavItem className={active.active === 'tasks' ? 'active-nav' : null} href="/tasks">Задачи</SideNavItem>
        </SideNav>
    )
}

export default SideNavigation