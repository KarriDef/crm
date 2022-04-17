import AuthPage from "./pages/auth/AuthPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ClientsPage from "./pages/dashboard/ClientsPage";
import CreateClient from "./pages/dashboard/CreateClient";
import EditClient from "./pages/dashboard/EditClient";
import AccountPage from "./pages/auth/AccountPage";
import UserContext from "./context/UserContext";
import axios from "axios";
import TasksPage from "./pages/dashboard/TasksPage";

function App() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('token'))
    const [userData, setUserData] = useState(null)
    const user = useContext(UserContext)
    user.accessToken = [accessToken, setAccessToken]
    user.data = [userData, setUserData]

    useEffect(()=>{
        let data = {
            headers: {'authorization': "Bearer "+accessToken}
        }
        axios.get('http://localhost:5000/api/employee', data)
            .then(res=>{
                setUserData(res.data[0])
            })
            .catch(err=>{
                console.log(err)
            })
    },[accessToken])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            {!!userData ?(
                <>
                    <Route exact path="/account" element={<AccountPage/>}/>
                    <Route exact path="/clients" element={<ClientsPage/>}/>
                    <Route exact path="/clients/create" element={<CreateClient/>}/>
                    <Route exact path="/clients/edit/:id" element={<EditClient/>}/>
                    <Route exact path="/tasks" element={<TasksPage/>}/>
                </>
            ):(
                <>
                    <Route exact path="/login" element={<AuthPage/>} />
                    <Route exact path="/forgot" element={<ForgotPassword/>}/>
                </>
            )}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
