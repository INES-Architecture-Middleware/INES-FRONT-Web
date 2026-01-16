import './Login.scss'
import LoginForm from "../components/LoginForm";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import Request from "../utils/Request";

const Login = (props) => {
    const params = useParams()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState([])

    const login = () => {
        if(username && password && props.login){
            Request.post('/login', {username:username, password:password}).then((res) => {
                if(res){
                    props.login(res.token, res.user._id, username)
                    navigate('/')
                }else{
                    setErrors(['login-error'])
                }
            }).catch(err => {
                console.log(err)
                setErrors(['login-error'])
                return
            })
        }
    }

    const register = () => {
        const token = params.token
        if(
            username && 
            password && 
            confirmPassword && 
            props.login &&
            token
        ){
            Request.post('/register', {username:username, password:password, confirmPassword:confirmPassword, registerToken:token}).then((res) => {
                if(res){
                    props.login(res.token, res.user._id, username)
                    navigate('/')
                }else{
                    setErrors(['login-error'])
                }
            }).catch(err => {
                console.log(err)
                setErrors(['login-error'])
                return
            })
        }
    }

    const renderLoginForm = () => {

        return (
            <div className="Login">
                <LoginForm title={"login"}>
                    <div className="FieldsContainer">
                        <Input error={errors && errors.length > 0 && errors.indexOf("login-error") >= 0 ? "login-error" : null} onEnterPress={login} title={'username-field'} placeholder={'username-placeholder'} value={username} onChange={(e)=>{setUsername(e)}}/>
                        <Input error={errors && errors.length > 0 && errors.indexOf("login-error") >= 0 ? "login-error" : null} onEnterPress={login} title={'password-field'} placeholder={'password-placeholder'} type={'password'} value={password} onChange={(e)=>{setPassword(e)}}/>
                    </div>
                    <div className="ButtonContainer">
                        <Button disabled={!username || !password} label={'validate'} onClick={login}/>
                    </div>
                </LoginForm>
            </div>
        )
    }

    const renderRegisterForm = () => {

        return(
            <div className="Login">
                <LoginForm title={"register"}>
                    <Input error={errors && errors.length > 0 && errors.indexOf("already-use") >= 0 ? "already-use" : null} onEnterPress={register} title={'username-field'} placeholder={'username-placeholder'} value={username} onChange={(e)=>{setUsername(e)}}/>
                    <Input error={errors && errors.length > 0 && errors.indexOf("password-error") >= 0 ? "password-error" : null} onEnterPress={register} title={'password-field'} placeholder={'password-placeholder'} type={'password'} value={password} onChange={(e)=>{setPassword(e)}}/>
                    <Input error={errors && errors.length > 0 && errors.indexOf("password-error") >= 0 ? "password-error" : null} onEnterPress={register} title={'confirm-password-field'} placeholder={'confirm-password-placeholder'} type={'password'} value={confirmPassword} onChange={(e)=>{setConfirmPassword(e)}}/>
                    <Button label={'validate'} disabled={!username || !password || !confirmPassword} onClick={register}/>
                    <Button type={'tercery'} label={'already-have'} onClick={()=>{navigate('/login')}}/>
                </LoginForm>
            </div>
        )
    }

    return (
        props.tab === 'register' ? renderRegisterForm()
        : renderLoginForm()
    )
}

export default Login