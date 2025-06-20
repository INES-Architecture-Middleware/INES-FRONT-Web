import { useIntl } from "react-intl";
import './LoginForm.scss'
import Logo from './../assets/logo.svg'
import { useNavigate } from "react-router-dom";
import Heading from "./Heading";
import { useContext } from "react";
import ThemeContext from "./ThemeContext";

const LoginForm = (props) => {
    const intl = useIntl()

    const { theme, toggleTheme, fetching } = useContext(ThemeContext);

    const navigate = useNavigate()

    return (
        <div className={"LoginForm" + (theme === "dark" ? " dark" : "")}>
            <div className="LoginFormHeader">
                <div className="LoginFormLogo" onClick={()=>{navigate('/')}}>
                    <img src={Logo} alt="Logo de l'application" />
                </div>
            </div>
            <div className="FormContainer">
                {props.title && <div className="FormTitle"><Heading size={'h4'}>{intl.formatMessage({id:props.title})}</Heading></div>}
                <div className="FormContent">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default LoginForm