import './Nav.scss'
import Logo from './../assets/logo.svg'
import LogoutIcon from './../assets/logout.svg'
import Heading from './Heading'
import { useIntl } from 'react-intl'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Body from './Body'

const Nav = (props) => {
    const intl = useIntl()

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
                <div className="LogoutButton" onClick={props.disconnect}>
                    <img src={LogoutIcon} alt="Logout icon"/>
                </div>
                :
                <Button label={'login'} type={"secondary"} onClick={onLoginClicked}/>
                }
            </div>
        </div>
    )
}

export default Nav