import { useIntl } from "react-intl";
import './Home.scss'
import { useContext, useEffect, useRef, useState } from "react";
import Request from "../utils/Request";
import Loader from "../components/Loader";
import PokemonCase from "../components/PokemonCase";
import Input from "../components/Input";
import PokemonPopup from "../components/PokemonPopup";
import InfiniteScroll from 'react-infinite-scroll-component';
import PopupContext from "../contexts/PopupContext";
import Team from "./Team";
import { useNavigate, useParams } from "react-router-dom";

const PokemonList = (props) => {

    if(!props.data || props.data.length === 0) return null

    return (
        <div className="PokemonList">
                {props.data.map((pokemon, idPokemon) => (
                    <PokemonCase disabled={props.disabled} addToTeam={()=>{props.addToTeam(pokemon)}} key={'Pokemon-'+idPokemon} {...pokemon} onClick={()=>props.handleItemClick(pokemon)}/>
                ))}
                <InfiniteScroll
                    dataLength={props.data.length} //This is important field to render the next data
                    next={props.fetch}
                    hasMore={props.data.length !== props.dataLength}
                    loader={ <div className="LoadingScroll">
                        <Loader withoutText/>
                    </div> }
                    scrollableTarget="scrollableDiv"
                >
                </InfiniteScroll>
            </div>
    )
}

const Home = (props) => {
    const intl = useIntl()

    const [data, setData] = useState([])
    const [dataLength, setDataLength] = useState(0)
    const [page, setPage] = useState("0")
    const [pageSize, setPageSize] = useState("0")
    const [search, setSearch] = useState("")
    const [fetching, setFetching] = useState(false)

    const [team, setTeam] = useState([])

    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(window.localStorage.getItem("current_team_name")) window.localStorage.removeItem("current_team_name")
        if(window.localStorage.getItem("current_team_pokemons")) window.localStorage.removeItem("current_team_pokemons")
    }, [])

    useEffect(()=>{
        let path = params['*']
        if(path !== "" && path !== "home") navigate('/')
    }, [params])

    const ref = useRef()

    let timeout = useRef()
    let inputTimeout = useRef()

    const {closePopup, openPopup} = useContext(PopupContext)

    useEffect(()=>{
        clearTimeout(inputTimeout.current)
        setFetching(true)
        inputTimeout.current = setTimeout(()=>{
            fetchPokemons({name:search}, true)
        }, 300)
    }, [search])

    const fetchPokemons = (filters, reset=false) => {
        Request.post('/pokemon/filter/'+(reset ? 0 : page), filters).then((res) => {
            setPage(reset ? 1 : Number(res.page) + 1)
            if(res.pageSize !== pageSize) setPageSize(res.pageSize)
            if(res.total !== dataLength) setDataLength(res.total)
            timeout.current = setTimeout(()=>{
                setData(reset ? res.data : [...data, ...res.data])
                setFetching(false)
            }, 1500)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchPokemons()

        return () => {
            clearTimeout(timeout.current)
            clearTimeout(inputTimeout.current)
        }
    }, [])

    const handlePokemonClick = (pokemon) => {
        openPopup(<PokemonPopup pokemon={pokemon} closePopup={closePopup}/>)
    }

    const addToTeam = (pokemon) => {
        if(pokemon){
            const teamTmp = [...team]
            if(teamTmp.length < 6) teamTmp.push(pokemon)
            else console.log("Team to large")
            setTeam(teamTmp)
        }
    }

    const removeToTeam = (id) => {
        if(id < 6 && id >= 0 && id < team.length){
            const teamTmp = [...team]
            teamTmp.splice(id, 1)
            setTeam(teamTmp)
        }
    }

    const editTeam = (_team) => {
        if(_team && _team.length > 0 && _team.length <= 6){
            setTeam(_team)
        }
    }

    const resetTeam = () => {
        setTeam([])
    }

    return (
        <div className="Home">
            <Team 
                team={team} 
                removeToTeam={removeToTeam}
                resetTeam={resetTeam}
                editTeam={editTeam}
                logged={props.logged}
            />
            <div className="HomeContainer" ref={ref} id={"scrollableDiv"}>
                <div className="SearchContainer">
                    <Input placeholder={"search-pokemon"} type={'search'} value={search} onChange={(e)=>{setSearch(e)}}/>
                </div>
                <div className="HomeContent">
                    {!data || fetching ? 
                        <Loader/>: 
                        <PokemonList 
                            fetch={()=>{fetchPokemons({name:search})}} 
                            data={data} 
                            dataLength={dataLength}
                            handleItemClick={handlePokemonClick}
                            addToTeam={addToTeam}
                            disabled={team.length === 6}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Home