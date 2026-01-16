import React, { useContext, useEffect, useRef, useState } from "react"
import Heading from "../components/Heading"
import Input from "../components/Input"
import "./Team.scss"
import { useIntl } from "react-intl"
import Button from "../components/Button"
import Pokeball from "../components/Pokeball"
import { colorType } from "../utils/helpers"
import PlusIcon from "./../assets/plus-white.svg"
import RenameIcon from "./../assets/rename_white.svg"
import SwitchIcon from "./../assets/switch_white.svg"
import AnalyseIcon from "./../assets/analyse_white.svg"
import SaveIcon from "./../assets/save_white.svg"
import ExtendIcon from "./../assets/extend_white.svg"
import CrossIcon from "./../assets/cross-white.svg"
import TrashIcon from "./../assets/trash-white.svg"
import EditIcon from "./../assets/edit-white.svg"
import Request from "../utils/Request"
import Body from "../components/Body"
import PopupContext from '../contexts/PopupContext'
import { useNavigate } from "react-router-dom"

const TeamDetails = (props) => {
    const intl = useIntl()

    return (
        <div className={"TeamDetails" + (props.selected && props.selected !== props._id ? " disabled" : "")}>
            <div className="TeamDetailsHeader">
                <Heading size={'h6'}>{props.name}</Heading>
                {props.selected && props._id === props.selected && <Body size={'small'} weight={'light'} primary>{intl.formatMessage({id:"editing"})}</Body>}
            </div>
            <div className="TeamDetail">
                {props.pokemons_id.map((pokemon, id) => (
                    <div className="TeamDetailSprite" key={props._id + "-sprite-" + id}>
                        <img src={pokemon.sprites.front_default}/>
                    </div>
                ))}
            </div>
            <div className="TeamDetailsActions">
                <Button icon={AnalyseIcon} size={'full'} type={'secondary'} label={'show-analyse-team'} onClick={()=>props.handleAnalyseClicked(props)}/>
                {
                    props.selected && props._id === props.selected ?
                    <Button icon={CrossIcon} size={'full'} type={'secondary'} label={'cancel-edition'} onClick={()=>props.handleEditTeam(props)}/>
                    :<div className="ActionsRow">
                        <Button icon={EditIcon} size={'full'} type={'secondary'} label={'edit'} onClick={()=>props.handleEditTeam(props)}/>
                        <Button icon={TrashIcon} size={'full'} type={'secondary'} label={'delete'} onClick={()=>props.handleDeleteTeam(props._id)}/>
                    </div>
                }
            </div>
        </div>
    )
}

const EditPopup = (props) =>{
    const intl = useIntl()
    const [value, setValue] = useState(props.value || "")

    const save = () => {
        if(props.save && value !== "") props.save(value)
    }

    return (
        <div className="EditPopup">
            {props.title && <div className="PopupContentHeader">
                <div className="PopupTitle">
                    <Heading size={'h4'}>{intl.formatMessage({id:props.title})}</Heading>
                </div>
            </div>}
            <div className="PopupContent">
                <Input title={'team-name'} placeholder={"team-name-placeholder"} value={value} onChange={(str) => {setValue(str)}}/>
            </div>
            <div className="PopupButtons">
                <Button size={'full'} type={'secondary'} label={'cancel'} onClick={props.close} />
                <Button size={'full'} disabled={value === ""} label={"validate"} onClick={save}/>
            </div>
        </div>
    )
}

const Team = (props) => {
    const intl = useIntl()

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [menuOpened, setMenuOpened] = useState(false)
    const [search, setSearch] = useState("")
    const [teams, setTeams] = useState([])
    const [filteredTeam, setFilteredTeam] = useState([])
    const [selectedTeam, setSelectedTeam] = useState(null)
    const [isTablet, setIsTablet] = useState(window.innerWidth < 1024)
    const isTabletRef = useRef(isTablet)

    const { openPopup, closePopup } = useContext(PopupContext)

    const fetchList = async (team) => {
        return new Promise((resolve, reject) => {
            Request.post('/pokemon/list', { ids:team.pokemons_id }).then((res) => {
                if(res && res.length > 0){
                    resolve(res)
                }else reject("Res empty")
            }).catch(err => {
                reject(err)
            })
        })
    }

    const fetchTeams = () => {
        let userId = window.localStorage.getItem('userId')
        if(userId){
            Request.get('/team?userId='+userId).then(async res => {
                const teamsTmp = []
                for(const team of res){
                    try{
                        const pokemons = await fetchList(team)
                        teamsTmp.push({
                            ...team,
                            pokemons_id:pokemons
                        })
                    }catch(err){
                        console.log(err)
                    }
                }
                setTeams(teamsTmp.filter(t => search ? search === t.name : t))
            }).catch(err => {
                console.log(err)
            }) 
        }
    }

    useEffect(()=>{
        fetchTeams()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(()=>{
        setFilteredTeam(teams.filter(t => search !== "" ? t.name.toLowerCase().includes(search.toLowerCase()) : t))
    }, [teams, search])

    const handleResize = (e) => {
        if(!isTabletRef.current && e.target.innerWidth <= 1024){
            isTabletRef.current = true
            setIsTablet(true)
        }else if(isTabletRef.current && e.target.innerWidth < 1024){
            isTabletRef.current = false
            setIsTablet(false)
        }
    }

    const resetTeam = () => {
        setSelectedTeam(null)
        setName('')
        props.resetTeam()
    }

    const handleAnalyseClicked = (team) => {
        console.log("analysed")
    }

    const hanldeRandomClicked = () => {
        Request.get("/pokemon/random").then((res) =>  {
            props.editTeam(res)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleSaveClicked = (e, _name = null) => {
        let userId = window.localStorage.getItem('userId')
        const nameTmp = _name || name
        if(!props.logged){
            console.log(nameTmp)
            window.localStorage.setItem("current_team_name", nameTmp)
            window.localStorage.setItem("current_team_pokemons", JSON.stringify(props.team.map(t => t.id)))
            navigate('/login')
        }else{
            if(selectedTeam){
                Request.put('/team', {
                    _id:selectedTeam,
                    name:nameTmp,
                    pokemonIds:props.team.map(t => t.id),
                    user:{
                        _id:userId,
                    }
                }).then(res => {
                    fetchTeams()
                    resetTeam()
                }).catch(err => {
                    console.log(err)
                    return
                })
            }else{
                Request.post('/team', {
                    name:nameTmp,
                    pokemonIds:props.team.map(t => t.id),
                    user:{
                        _id:userId,
                    }
                }).then(res => {
                    fetchTeams()
                    resetTeam()
                }).catch(err => {
                    console.log(err)
                    return
                })
            }
        }
    }

    const handleMenuStateChanged = () => {
        setMenuOpened(!menuOpened)
    }

    const handleEditTeam = (team) => {
        if(selectedTeam && team._id === selectedTeam){
            resetTeam()
        }else{
            setSelectedTeam(team._id)
            setName(team.name)
            props.editTeam(team.pokemons_id)
            setMenuOpened(false)
        }
    }

    const handleChangeName = () => {
        openPopup(<EditPopup
            title={"choose-name"}
            save={(str)=>{handleSaveClicked(null, str);closePopup()}}
            close={closePopup}
            value={name}
        />)
    }

    const handleDeleteTeam = (id) => {
        Request.delete('/team/'+id).then(res => {
            fetchTeams()
        }).catch(err => {
            console.log(err)
            return
        })
    }

    return (
        <>
            <div className={"TeamOpacity" + (menuOpened ? " opened" : "")} onClick={()=>setMenuOpened(false)}/>
            <div className={"Team" + (menuOpened ? " opened" : "")}>
                <div className="TeamContainer secondary">
                    {!props.logged ? 
                    <div className="NoLogged">
                        <Body>{intl.formatMessage({id:"no-logged"})}</Body>
                        <Button label={'login'} onClick={()=>{navigate('/login')}}/>
                    </div>
                    :<div className="TeamContent">
                        <div className="TeamHeader">
                            <div className="Title">
                                <Heading size={'h6'}>{intl.formatMessage({id:"my-teams"})}</Heading>
                            </div>
                            <div className="SearchContainer">
                                <Input disabled={selectedTeam} type={'search'} placeholder={'search-team'} value={search} onChange={(str) => {setSearch(str)}} />
                                <div className="ButtonContainer">
                                    <Button icon={PlusIcon} type={"secondary"} onClick={resetTeam} />
                                </div>
                            </div>
                        </div>
                        <div className="Teams">
                            {teams.length === 0 ?
                            <Body>{intl.formatMessage({id:"team-empty"})}</Body>
                            :filteredTeam.length === 0 ?
                            <Body>{intl.formatMessage({id:"search-empty"})}</Body>
                            :filteredTeam.map((team, teamId) => (
                                <React.Fragment key={'team-' + teamId}>
                                    <TeamDetails 
                                        {...team} 
                                        selected={selectedTeam}
                                        handleAnalyseClicked={handleAnalyseClicked} 
                                        handleEditTeam={handleEditTeam} 
                                        handleDeleteTeam={handleDeleteTeam}
                                    />
                                    {teamId !== filteredTeam.length -1 && <div className="Divider"/>}                        
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    }
                </div>
                <div className="TeamContainer">
                    <div className="TeamContent">
                        <div className="TeamHeader">
                            <div className="Title">
                                <Heading size={'h4'}>{intl.formatMessage({id:selectedTeam ? "edit-team" : "new-team"})}</Heading>
                            </div>
                            <div className="TeamName">
                                <Input title={'team-name'} placeholder={"team-name-placeholder"} value={name} onChange={(str) => {setName(str)}}/>
                            </div>
                        </div>
                        <div className="TeamCases">
                            {Array.from({length:6}).map((_, id) => (
                                <div className="TeamCase" key={"pokeball-"+id}>
                                    <Pokeball color={(props.team && props.team.length > id) ? colorType(props.team[id].types[0].en) : undefined}/>
                                    {(props.team && props.team.length > id) && <div className="SpriteContent" onClick={()=>props.removeToTeam(id)}>
                                        <img src={props.team[id].sprites?.front_default} alt="Sprite"/>
                                    </div>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="TeamActions">
                        <Button type={'secondary'} icon={SwitchIcon} size={'full'} label={'create-random-team'} onClick={hanldeRandomClicked}/>
                        <Button type={'secondary'} icon={AnalyseIcon} disabled={props.team.length === 0} size={'full'} label={'show-analyse-team'} onClick={()=>handleAnalyseClicked(props.team)}/>
                        <Button type={'secondary'} icon={SaveIcon} disabled={props.team.length === 0 || name === ""} size={'full'} label={'save-team'} onClick={handleSaveClicked}/>
                        <Button type={'secondary'} icon={ExtendIcon} size={'full'} label={'view-teams'} onClick={handleMenuStateChanged}/>
                    </div>
                    <div className="TeamActionsMobile">
                        <Button type={'secondary'} size={'full'} icon={SwitchIcon} onClick={hanldeRandomClicked}/>
                        <Button type={'secondary'} disabled={props.team.length === 0} size={'full'} icon={AnalyseIcon} onClick={()=>handleAnalyseClicked(props.team)}/>
                        <Button type={'secondary'} disabled={props.team.length === 0} size={'full'} icon={SaveIcon} onClick={handleChangeName}/>
                        <Button type={'secondary'} size={'full'} icon={ExtendIcon} onClick={handleMenuStateChanged}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Team