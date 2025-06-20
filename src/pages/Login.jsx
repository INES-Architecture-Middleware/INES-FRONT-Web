import { useIntl } from "react-intl";
import './Login.scss'
import LoginForm from "../components/LoginForm";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Request from "../utils/Request";

const Login = (props) => {
    const intl = useIntl()

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const login = () => {
        if(username && password){
            Request.post('/login', {username:username, password:password}).then((res) => {
                window.localStorage.setItem("authToken", res.token)
                window.localStorage.setItem("userId", res.user._id)
                window.localStorage.setItem("username", username)
                navigate('/')
            }).catch(err => {
                console.log(err)
                setError('login-error')
                return
            })
        }
    }

    return (
        <div className="Login">
            <LoginForm title={"login"}>
                <Input error={error} onEnterPress={login} title={'username'} value={username} onChange={(e)=>{setUsername(e)}}/>
                <Input error={error} onEnterPress={login} title={'password'} type={'password'} value={password} onChange={(e)=>{setPassword(e)}}/>
                <Button disabled={!username || !password} label={'validate'} onClick={login}/>
                <Button type={'tercery'} label={'no-account'} onClick={()=>{navigate('/register')}}/>
            </LoginForm>
        </div>
    )
}

export default Login