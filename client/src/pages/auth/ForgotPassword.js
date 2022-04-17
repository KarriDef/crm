import {Button, TextInput} from "react-materialize";
import {useState} from "react";

const ForgotPassword = ()=>{
    const [email, setEmail] = useState("")

    function handleFormSubmit(e){
        e.preventDefault()
        console.log(email)
    }

    return(
        <div className="outerWrapper">
            <div className="wrapper">
                <h2 style={{textAlign: "right"}}>CRM</h2>
                <p>Если вы забыли пароль, введите e-mail, указанный при регистрации. На почту будет отправлена ссылка для сброса пароля.</p>
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
                    <Button className="blue" style={{width: "100%"}}>Сбросить пароль</Button>
                </form>
            </div>
        </div>
    )
}


export default ForgotPassword