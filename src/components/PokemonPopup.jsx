import './PokemonPopup.scss'
import CrossIcon from './../assets/cross.svg'
import {useIntl} from 'react-intl'
import CrossWhiteIcon from './../assets/cross-white.svg'
import { useContext, useEffect, useState } from 'react';
import ThemeContext from './ThemeContext';
import Heading from './Heading';
import { colorType } from '../utils/helpers';
import Body from './Body';
import Type from './Type';

const PokemonPopup = (props) => {
    const intl = useIntl(null)
    const [color, setColor] = useState("")
    const { theme, toggleTheme, fetching } = useContext(ThemeContext);

    useEffect(()=>{
        console.log(props)
        setColor(colorType(props.pokemon.types[0].fr))
    }, [])

    const closePopup = () => {
        if(props.closePopup) props.closePopup()
    }

    return (
        <div className="PokemonPopup">
            <div className="PokemonPopupContainer">
                <div className="PokemonPopupHeader" style={{backgroundColor:color}}>
                    <div className="PopupTitle">
                        <Heading size={'h2'}>{props.pokemon.names['fr']}</Heading>
                    </div>
                    <div className="Cross" onClick={closePopup}>
                        <img src={theme === 'dark' ? CrossWhiteIcon : CrossIcon} alt="Cross icon" />
                    </div>
                </div>
                <div className="PokemonInfosContainer">
                    <div className="PokemonDetails">
                        <div className="PokemonImage">
                            <img src={props.pokemon.sprites.official_artwork} alt="" />
                        </div>
                        <div className="PokemonTypes">
                            {props.pokemon.types.map((type, id) => (
                                <Type key={'type-'+id} type={type.fr}/>
                            ))}
                        </div>
                        <div className="PokemonInfos">
                            <div className="PokemonInfo">
                                <div className="InfoTitle" style={{backgroundColor:color}}><Body right>{intl.formatMessage({id:"height"})}</Body></div>
                                <div className="InfoContent"><Body>{intl.formatMessage({id:'height-m'}, {height:props.pokemon.height})}</Body></div>
                            </div>
                            <div className="PokemonInfo">
                                <div className="InfoTitle" style={{backgroundColor:color}}><Body right>{intl.formatMessage({id:"weight"})}</Body></div>
                                <div className="InfoContent"><Body>{intl.formatMessage({id:'weight-kg'}, {weight:props.pokemon.weight})}</Body></div>
                            </div>
                            <div className="PokemonInfo">
                                <div className="InfoTitle" style={{backgroundColor:color}}><Body right>{intl.formatMessage({id:"abilities"})}</Body></div>
                                <div className="InfoContent">{
                                    props.pokemon.abilities.map((ability, idAbility) => (
                                        <Body key={"ability-"+idAbility}>{ability.fr}</Body>
                                    ))
                                }</div>
                            </div>
                            <div className="PokemonInfo">
                                <div className="InfoTitle" style={{backgroundColor:color}}><Body right>{intl.formatMessage({id:"egg-groups"})}</Body></div>
                                <div className="InfoContent">{
                                    props.pokemon.egg_groups.map((egg, idEgg) => (
                                        <Body key={"egg-"+idEgg}>{egg.fr}</Body>
                                    ))
                                }</div>                           
                            </div>
                        </div>
                    </div>
                    <div className="PokemonStats">
                        <div className="StatsTitle">
                            <Heading size={'h3'}>{intl.formatMessage({id:"stats-title"})}</Heading>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonPopup