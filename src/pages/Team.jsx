import { useEffect, useState } from 'react'
import Heading from '../components/Heading'
import './Team.scss'
import { useIntl } from 'react-intl'
import Body from '../components/Body'
import Button from '../components/Button'
import Logo from './../assets/logo.svg'

const TeamView = (props) => {
    const intl = useIntl()

    useEffect(()=>{
        console.log('New team : ', props.newTeam)
    }, [props.newTeam])

    return (
        <div className="TeamView">
            <div className="TeamViewTitle">
                <Heading size={'h6'}>{intl.formatMessage({id:"create-team"})}</Heading>
                <Body size={'h6'}>{intl.formatMessage({id:"create-team-description"})}</Body>
            </div>
            <div className="TeamViewContent">
                {
                    Array.from({length:6}).map((_, id) => (
                        <div key={"pokemon"+id} className="PokemonContent">
                            <img src={Logo} alt="Logo" />
                            {props.newTeam && props.newTeam.length > id && <div className="Sprite" onClick={()=>props.removeToTeam(id)}>
                                <img src={props.newTeam[id].sprites.front_default} alt="Sprite du pokémon" />
                            </div> }
                        </div>
                    ))
                }
            </div>
            <div className="TeamViewOptions">
                {/* <Button size={'medium'} label={'view-team-analyse'} onClick={()=>{console.log("view team analyse")}}/> */}
                <Button size={'large'} label={'save'} onClick={()=>{console.log("Save")}}/>
                <Button size={'large'} type={'secondary'} label={'cancel'} onClick={props.onCancel}/>
            </div>
        </div>
    )
}

const Team = (props) => {
    const intl = useIntl()

    const [logged, setLogged] = useState(false)
    const [currentPage, setCurrentPage] = useState("home")

    useEffect(()=>{
        if(window.localStorage.getItem('authToken')) setLogged(true)
    }, [])

    const onCancel = () => {
        setCurrentPage("home")
        props.setTeam([])
    }

    return (
        <div className="Team">
            {
                logged && currentPage === "home" ? 
                <div className="TeamContainer">
                    <div className="TeamTitle">
                        <Heading>{'my-teams'}</Heading>
                    </div>
                </div>
                :<TeamView removeToTeam={props.removeToTeam} onCancel={onCancel} newTeam={props.newTeam} setTeam={props.setTeam}/>
            }
            
        </div>
    )
}

export default Team