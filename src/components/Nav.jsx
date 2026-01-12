import './Nav.scss'
import Logo from './../assets/logo.svg'
import LogoutIcon from './../assets/logout.svg'
import LogoutWhiteIcon from './../assets/logout-white.svg'
import Heading from './Heading'
import { useIntl } from 'react-intl'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import Body from './Body'
import ThemeContext from './ThemeContext'

const Nav = (props) => {
    const intl = useIntl()

    const { theme, toggleTheme, fetching } = useContext(ThemeContext);

    const navigate = useNavigate()

    const onLoginClicked = () => {
        navigate('/login')
    }

    return (
        <div className="Nav">
            <div className="NavContent">
                <div className="NavLogo">
                    <img src={Logo} alt="Logo du site" />
                </div>
                <div className="NavTitle">
                    <Heading size={'h2'}>{intl.formatMessage({id:"pokemon-team-planner"})}</Heading>
                </div>
            </div>
            <div className="NavContent">
                {props.logged == null ?
                <></>
                : props.logged ?
                <>
                    <div className="username">
                        <Body weight={'bold'}>{window.localStorage.getItem("username") ? window.localStorage.getItem("username") : ""}</Body>
                    </div>
                    <div className="LogoutButton" onClick={props.logout}>
                        <img src={theme === 'light' ? LogoutIcon : LogoutWhiteIcon} alt="Logout icon"/>
                    </div>
                </>
                :
                <Button label={'login'} onClick={onLoginClicked}/>
                }
            </div>
        </div>
    )
}

export default Nav