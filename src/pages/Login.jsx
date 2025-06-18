import { useIntl } from "react-intl";
import './Login.scss'
import LoginForm from "../components/LoginForm";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const intl = useIntl()

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = () => {
        window.localStorage.setItem("authToken", "TOKEN")
        navigate('/')
    }

    return (
        <div className="Login">
            <LoginForm title={"login"}>
                <Input onEnterPress={login} title={'username'} value={username} onChange={(e)=>{setUsername(e)}}/>
                <Input onEnterPress={login} title={'password'} type={'password'} value={password} onChange={(e)=>{setPassword(e)}}/>
                <Button label={'validate'} onClick={login}/>
                <Button type={'tercery'} label={'no-account'} onClick={()=>{navigate('/register')}}/>
            </LoginForm>
        </div>
    )
}

export default Login