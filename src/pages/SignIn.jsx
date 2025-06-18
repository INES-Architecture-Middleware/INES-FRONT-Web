import { useIntl } from "react-intl";
import './SignIn.scss'
import LoginForm from "../components/LoginForm";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = (props) => {
    const intl = useIntl()

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState([])

    const register = () => {
        if(username && password && confirmPassword){
            let errorTmp = []
            if(password !== confirmPassword) errorTmp.push("password-error")
            if(username === "username") errorTmp.push("already-use")

            if(errorTmp.length > 0){
                setErrors(errorTmp)
            }else{
                window.localStorage.setItem("authToken", 'TOKEN')
                navigate('/')
            }
        }
    }

    return (
        <div className="SignIn">
            <LoginForm title={"register"}>
                <Input error={errors && errors.length > 0 && errors.indexOf("already-use") >= 0 ? "already-use" : null} onEnterPress={register} title={'username'} value={username} onChange={(e)=>{setUsername(e)}}/>
                <Input error={errors && errors.length > 0 && errors.indexOf("password-error") >= 0 ? "password-error" : null} onEnterPress={register} title={'password'} type={'password'} value={password} onChange={(e)=>{setPassword(e)}}/>
                <Input error={errors && errors.length > 0 && errors.indexOf("password-error") >= 0 ? "password-error" : null} onEnterPress={register} title={'confirm-password'} type={'password'} value={confirmPassword} onChange={(e)=>{setConfirmPassword(e)}}/>
                <Button label={'validate'} disabled={!username || !password || !confirmPassword} onClick={register}/>
                <Button type={'tercery'} label={'already-have'} onClick={()=>{navigate('/login')}}/>
            </LoginForm>
        </div>
    )
}

export default SignIn