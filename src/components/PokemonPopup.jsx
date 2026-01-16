import './PokemonPopup.scss'
import {useIntl} from 'react-intl'
import CrossWhiteIcon from './../assets/cross-white.svg'
import { useEffect, useState } from 'react';
import Heading from './Heading';
import Button from './Button';
import { calculateAveStats, calculateSumStats, colorResistance, colorType, fourDigitsString } from '../utils/helpers';
import Body from './Body';
import Type from './Type';
import {types} from '../data/types.js';
import TypeCase from './TypeCase.jsx';
import FullPopupContent from './FullPopupContent.jsx';

const PokemonPopup = (props) => {
    const intl = useIntl(null)
    const [color, setColor] = useState("")

    useEffect(()=>{
        setColor(colorType(props.pokemon.types[0].fr))
    }, [])

    const closePopup = () => {
        if(props.closePopup) props.closePopup()
    }

    return (
        <div className="PokemonPopup">
            <FullPopupContent
                title={props.pokemon.names['fr']}
                subTitle={props.pokemon.names['en']}
                id={fourDigitsString(props.pokemon.id)}
                closePopup={closePopup}
            >
                <div className="PokemonPopupContent">
                    <div className="PokemonBand">
                        <div className="PokemonHeader">
                            <div className="PokemonImage">
                                <img src={props.pokemon.sprites.official_artwork}/>
                            </div>
                            <div className="PokemonTypes">
                                {props.pokemon.types.map((type, id) => (
                                    <Type key={'type-'+id} type={type.fr}/>
                                ))}
                            </div>
                        </div>
                        <div className="PokemonDetails">
                            <div className="PokemonDetail">
                                <div className="Detail DetailHeader" style={{backgroundColor:color}}>
                                    <Body>{intl.formatMessage({id:'category'})}</Body>
                                </div>
                                <div className="Detail DetailContent">
                                    <Body>{props.pokemon.category.fr}</Body>
                                </div>
                            </div>
                            <div className="PokemonDetail">
                                <div className="Detail DetailHeader" style={{backgroundColor:color}}>
                                    <Body>{intl.formatMessage({id:'height'})}</Body>
                                </div>
                                <div className="Detail DetailContent">
                                    <Body>{intl.formatMessage({id:'height-m'}, {height:props.pokemon.height})}</Body>
                                </div>
                            </div>
                            <div className="PokemonDetail">
                                <div className="Detail DetailHeader" style={{backgroundColor:color}}>
                                    <Body>{intl.formatMessage({id:'weight'})}</Body>
                                </div>
                                <div className="Detail DetailContent">
                                    <Body>{intl.formatMessage({id:'weight-kg'}, {weight:props.pokemon.weight})}</Body>
                                </div>
                            </div>
                            <div className="PokemonDetail">
                                <div className="Detail DetailHeader" style={{backgroundColor:color}}>
                                    <Body>{intl.formatMessage({id:'abilities'})}</Body>
                                </div>
                                <div className="Detail DetailContent">{
                                    props.pokemon.abilities.map((ability, idAbility) => (
                                        <Body key={"ability-"+idAbility}>{ability.fr}</Body>
                                    ))
                                }</div>
                            </div>
                            <div className="PokemonDetail">
                                <div className="Detail DetailHeader" style={{backgroundColor:color}}>
                                    <Body>{intl.formatMessage({id:'egg-groups'})}</Body>
                                </div>
                                <div className="Detail DetailContent">{
                                    props.pokemon.egg_groups.map((egg, idEgg) => (
                                        <Body key={"egg-"+idEgg}>{egg.fr}</Body>
                                    ))
                                }</div>
                            </div>
                        </div>
                    </div>
                    <div className="PokemonAttributes">
                        <div className="AttributesTable">
                            <div className="AttributesHeader" style={{backgroundColor:color}}>
                                <Body>{intl.formatMessage({id:"vulnerabilities"})}</Body>
                            </div>
                            <div className="TypesContainer">
                                {Object.keys(types).map((type, idType) => (
                                    <TypeCase key={'table-case-' + idType} type={type} types={props.pokemon.types}/>
                                ))}
                            </div>
                        </div>
                        <div className="AttributesTable">
                            <div className="AttributesHeader" style={{backgroundColor:color}}>
                                <Body>{intl.formatMessage({id:"stats-title"})}</Body>
                            </div>
                            <div className="AttributesContent">
                                <div className="AttributeRow">
                                    <div className="Case CaseHeader" style={{backgroundColor:color}}><Body>{intl.formatMessage({id:"stats"})}</Body></div>
                                    <div className="Case CaseDetail" style={{backgroundColor:color}}><Body>{intl.formatMessage({id:"base-stats"})}</Body></div>
                                </div>
                                {Object.keys(props.pokemon.stats).map((stat, idStat) => (
                                    <div className="AttributeRow" key={"stat-"+stat + "-" + idStat}>
                                        <div className="Case CaseHeader" style={{backgroundColor:color}}><Body>{intl.formatMessage({id:stat})}</Body></div>
                                        <div className="Case CaseDetail">
                                            <Body>{props.pokemon.stats[stat]}</Body>
                                            <div className="StatGauge">
                                                <div className="bar" style={{width:((100*props.pokemon.stats[stat])/200) + '%'}}/>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="AttributeRow inversed">
                                    <div className="Case CaseHeader" style={{backgroundColor:color}}><Body>{intl.formatMessage({id:"stats-sum"})}</Body></div>
                                    <div className="Case CaseDetail"><Body weight={'bold'}>{calculateSumStats(props.pokemon.stats)}</Body></div>
                                </div>
                                <div className="AttributeRow inversed">
                                    <div className="Case CaseHeader" style={{backgroundColor:color}}><Body>{intl.formatMessage({id:"stats-ave"})}</Body></div>
                                    <div className="Case CaseDetail"><Body weight={'bold'}>{calculateAveStats(props.pokemon.stats)}</Body></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FullPopupContent>
        </div>
    )
}

export default PokemonPopup