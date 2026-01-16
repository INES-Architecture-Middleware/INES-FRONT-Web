import { useIntl } from 'react-intl'
import './TeamAnalyse.scss'
import FullPopupContent from './FullPopupContent'
import Pokeball from './Pokeball'
import { colorType } from '../utils/helpers'
import Body from './Body'
import TypeCase from './TypeCase'
import { types } from '../data/types'
import TypeBar from './TypeBar'

const TeamAnalyse = (props) => {
    const intl = useIntl()

    if(!props.pokemons_id) return null

    const teamTypes = []
    for(const pokemon of props.pokemons_id){
        teamTypes.push(pokemon.types)
    }

    return (
        <div className="TeamAnalysePopup">
            <FullPopupContent
                closePopup={props.closePopup}
                title={props.name}
                subTitle={"team-analyse"}
            >
                <div className="TeamAnalyseContainer">
                    <div className="AnalysePokemonCases">
                        {Array.from({length:6}).map((_, id) => (
                            <div className="AnalysePokemonCase" key={"analyse-ball-" + id}>
                                <Pokeball color={(props.pokemons_id && props.pokemons_id.length > id) ? colorType(props.pokemons_id[id].types[0].en) : undefined}/>
                                {(props.pokemons_id && props.pokemons_id.length > id) && <div className="SpriteContent">
                                    <img src={props.pokemons_id[id].sprites?.official_artwork} alt="Sprite"/>
                                </div>}
                            </div>
                        ))}
                    </div>
                    <div className="TeamTable">
                        <div className="TeamTableHeader">
                            <Body>{intl.formatMessage({id:"team-defenses"})}</Body>
                        </div>
                        <div className="TeamTableContent">
                            {Object.keys(types).map((type, idType) => (
                                <div className="TeamTableType" key={'table-defense-case-' + idType}>
                                    <TypeBar key={'table-case-' + idType} category={"defense"} type={type} types={teamTypes}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="TeamTable">
                        <div className="TeamTableHeader">
                            <Body>{intl.formatMessage({id:"team-coverage"})}</Body>
                        </div>
                        <div className="TeamTableContent">
                            {Object.keys(types).map((type, idType) => (
                                <div className="TeamTableType" key={'table-coverage-case-' + idType}>
                                    <TypeBar key={'table-case-' + idType} type={type} types={teamTypes}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </FullPopupContent>
        </div>
    )
}

export default TeamAnalyse