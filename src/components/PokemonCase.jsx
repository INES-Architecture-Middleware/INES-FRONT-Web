import { useEffect } from 'react'
import Body from './Body'
import './PokemonCase.scss'

const PokemonCase = (props) => {

    const handleCaseClick = () =>{
        if(props.onClick) props.onClick()
    }

    return (
        <div className="PokemonCase" onClick={handleCaseClick}>
            <div className="PokemonImage">
                <img src={props.sprites.official_artwork} alt="" />
            </div>
            <div className="PokemonName">
                <Body center>{props.names.fr}</Body>
                <Body secondary center weight={'thin'} size={'small'}>{props.names.en}</Body>
            </div>
        </div>
    )
}

export default PokemonCase