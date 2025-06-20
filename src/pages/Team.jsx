import { useContext, useEffect, useState } from 'react'
import Heading from '../components/Heading'
import './Team.scss'
import { useIntl } from 'react-intl'
import Body from '../components/Body'
import Button from '../components/Button'
import Logo from './../assets/logo.svg'
import Input from '../components/Input'
import Trash from './../assets/trash.svg'
import TrashWhite from './../assets/trash-white.svg'
import Edit from './../assets/edit.svg'
import EditWhite from './../assets/edit-white.svg'
import ThemeContext from '../components/ThemeContext'


const TeamView = (props) => {
    const intl = useIntl()

    const [name, setName] = useState("")

    return (
        <div className="TeamView">
            <div className="TeamViewTitle">
                <Heading size={'h6'}>{intl.formatMessage({id:"create-team"})}</Heading>
                <Body size={'h6'}>{intl.formatMessage({id:"create-team-description"})}</Body>
                <Input value={name} onChange={setName} placeholder={"name"}/>
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
                <Button size={'large'} disabled={name === '' || props.newTeam.length === 0} label={'save'} onClick={()=>{props.saveTeam(name)}}/>
                <Button size={'large'} type={'secondary'} label={'cancel'} onClick={props.onCancel}/>
            </div>
        </div>
    )
}

const Team = (props) => {
    const intl = useIntl()

    const [logged, setLogged] = useState(false)
    const [currentPage, setCurrentPage] = useState("home")

    const { theme, toggleTheme, fetching } = useContext(ThemeContext);

    useEffect(()=>{
        if(window.localStorage.getItem('authToken')) setLogged(true)
    }, [])

    const onCancel = () => {
        setCurrentPage("home")
        props.setTeam([])
    }

    const onSave = (name) => {
        setCurrentPage('home')
        if(props.saveTeam) props.saveTeam(name)
    }

    return (
        <div className="Team">
            {
                logged && currentPage === "home" ? 
                <div className="TeamContainer">
                    <div className="TeamTitle">
                        <Heading size={'h2'}>{intl.formatMessage({id:'my-teams'})}</Heading>
                    </div>
                    <div className="TeamContent">
                        {props.teams.length === 0 ? 
                        <div className="TeamEmpty">
                            <Body>{intl.formatMessage({id:"team-empty"})}</Body>
                            <Button label={'team-create'} onClick={()=>{setCurrentPage('create')}}/>
                        </div> 
                        :
                        <>
                            {props.teams.map((t, id) => (
                                <div key={'team-' + id} className="TeamCase">
                                    <Body>{t.name}</Body>
                                    <div className="Buttons">
                                        <div className="ButtonIcon" onClick={()=>{props.editTeam(t)}}>
                                            <img src={theme === 'dark' ? EditWhite : Edit} alt="Edit icon" />
                                        </div>
                                        <div className="ButtonIcon" onClick={()=>{props.deleteTeam(t)}}>
                                            <img src={theme === 'dark' ? TrashWhite : Trash} alt="Trash icon" />
                                        </div>
                                    </div>
                                </div>  
                            ))}
                            <div className="ButtonContent" style={{marginTop:20}}>
                                <Button label={'team-create'} onClick={()=>{setCurrentPage('create')}}/>
                            </div>
                        </>}
                    </div>
                </div>
                :<TeamView removeToTeam={props.removeToTeam} onCancel={onCancel} saveTeam={onSave} newTeam={props.newTeam} setTeam={props.setTeam}/>
            }
            
        </div>
    )
}

export default Team