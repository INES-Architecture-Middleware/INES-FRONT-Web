import './Nav.scss'
import Logo from './../assets/logo.svg'
import BurgerWhiteIcon from './../assets/burger_white.svg'
import LogoutWhiteIcon from './../assets/logout-white.svg'
import Heading from './Heading'
import { useIntl } from 'react-intl'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import Body from './Body'
import { useEffect, useRef, useState } from 'react'

const Nav = (props) => {
    const intl = useIntl()

    const [opened, setOpened] = useState(false)
    const openedRef = useRef(opened)

    useEffect(()=>{
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const navigate = useNavigate()

    const onLoginClicked = () => {
        navigate('/login')
    }

    const handleResize = () => {
        if(openedRef.current) {
            setOpened(false)
            openedRef.current = false
        }
    }

    return (
        <div className="Nav">
            <div className={"NavOpacity" + (opened ? " opened" : "")} onClick={()=>{setOpened(false);openedRef.current = false}}></div>
            <div className="NavHeader">
                <div className="NavLogo">
                    <img src={Logo} alt="Logo du site" />
                </div>
                <div className="NavTitle">
                    <Heading size={'h2'}>{intl.formatMessage({id:"pokemon-team-planner"})}</Heading>
                </div>
            </div>
            <div className={"NavContent" + (opened ? ' opened' : "")}>
                {props.logged == null ?
                <></>
                : props.logged ?
                <>
                    <div className="UsernameContainer">
                        <Body overflow maxWidth={'100%'} weight={'bold'}>{window.localStorage.getItem("username") ? window.localStorage.getItem("username") : ""}</Body>
                    </div>
                    <div className="ButtonContainer">
                        <Button type={'tercery'} icon={LogoutWhiteIcon} onClick={onLoginClicked}/>
                    </div>
                    <div className="MobileButtonContainer">
                        <Button type={'secondary'} label={'disconnect'} icon={LogoutWhiteIcon} onClick={onLoginClicked}/>
                    </div>
                </>
                :
                <Button label={'login'} onClick={onLoginClicked}/>
                }
            </div>
            <div className="BurgerContainer">
                <Button icon={BurgerWhiteIcon} type={'tercery'} onClick={()=>{setOpened(!openedRef.current);openedRef.current = !openedRef.current}}/>
            </div>
        </div>
    )
}

export default Nav