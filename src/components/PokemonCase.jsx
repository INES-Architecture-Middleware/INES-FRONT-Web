import Body from './Body'
import './PokemonCase.scss'
import Button from './Button'
import PlusWhiteIcon from './../assets/plus-white.svg'

const PokemonCase = (props) => {

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
                <div className="Names">
                    <Body center>{props.names.fr}</Body>
                    <Body secondary center weight={'thin'} size={'small'}>{props.names.en}</Body>
                </div>
                <Button stopPropagation disabled={props.disabled} icon={PlusWhiteIcon} size={'small'} type={'secondary'} onClick={(e) => handleButtonClick(e)}/>
            </div>
        </div>
    )
}

export default PokemonCase