import { useIntl } from "react-intl";
import './Home.scss'
import { useEffect, useState } from "react";
import Request from "../utils/Request";
import Loader from "../components/Loader";
import PokemonCase from "../components/PokemonCase";
import Input from "../components/Input";
import PokemonPopup from "../components/PokemonPopup";

const Home = (props) => {
    const intl = useIntl()

    const [data, setData] = useState(null)
    const [search, setSearch] = useState("")

    const fetchPokemons = () => {
        Request.get('/pokemon').then((res) => {
            setData(res)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchPokemons()
    }, [])

    const handlePokemonClick = (pokemon) => {
        props.changePopupState(true, <PokemonPopup pokemon={pokemon} closePopup={closePopup}/>)
    }

    const closePopup = () => {
        props.changePopupState(false)
    }

    return (
        <div className="Home">
            {!data ? <Loader/>
            : <div className="HomeContainer">
                <div className="SearchContainer">
                    <Input placeholder={"search-pokemon"} type={'search'} value={search} onChange={(e)=>{setSearch(e)}}/>
                </div>
                <div className="PokemonList">
                    {data.map((pokemon, idPokemon) => (
                        <PokemonCase key={'Pokemon-'+idPokemon} {...pokemon} onClick={()=>handlePokemonClick(pokemon)}/>
                    ))}
                </div>
            </div>}
        </div>
    )
}

export default Home