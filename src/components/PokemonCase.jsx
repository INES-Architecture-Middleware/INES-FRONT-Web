import { useContext, useEffect } from 'react'
import Body from './Body'
import './PokemonCase.scss'
import Button from './Button'
import ThemeContext from './ThemeContext'
import PlusIcon from './../assets/plus.svg'
import PlusWhiteIcon from './../assets/plus-white.svg'

const PokemonCase = (props) => {
    const { theme, toggleTheme, fetching } = useContext(ThemeContext);

    const handleCaseClick = () =>{
        if(props.onClick) props.onClick()
    }

    const handleButtonClick = (e) =>{
        e.preventDefault()
        e.stopPropagation()
        props.addToTeam()
    }

    return (
        <div className="PokemonCase" onClick={handleCaseClick}>
            <div className="PokemonImage">
                <img src={props.sprites.official_artwork} alt="" />
            </div>
            <div className="PokemonName">
                <Body center>{props.names.fr}</Body>
                <Body secondary center weight={'thin'} size={'small'}>{props.names.en}</Body>
                <div className="PlusButton" onClick={(e) => handleButtonClick(e)}>
                    <img src={theme === 'dark' ? PlusWhiteIcon : PlusIcon} alt="Plus icon" />
                </div>
            </div>
        </div>
    )
}

export default PokemonCase