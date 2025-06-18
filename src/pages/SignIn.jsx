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

    const register = () => {

    }

    return (
        <div className="SignIn">
            <LoginForm title={"register"}>
                <Input onEnterPress={register} title={'username'} value={username} onChange={(e)=>{setUsername(e)}}/>
                <Input onEnterPress={register} title={'password'} type={'password'} value={password} onChange={(e)=>{setPassword(e)}}/>
                <Input onEnterPress={register} title={'confirm-password'} type={'password'} value={confirmPassword} onChange={(e)=>{setConfirmPassword(e)}}/>
                <Button label={'validate'} onClick={register}/>
                <Button type={'tercery'} label={'already-have'} onClick={()=>{navigate('/login')}}/>
            </LoginForm>
        </div>
    )
}

export default SignIn