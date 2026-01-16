import { useIntl } from "react-intl"
import { colorResistance, colorType } from "../utils/helpers"
import Body from "./Body"
import './TypeBar.scss'
import { isCovered, calculateDefenses } from "../data/types"
import Type from "./Type"

const TypeBar = (props) => {
    const intl = useIntl()
    
    const bars = []
    for(const ts of props.types){
        const types = ts.map(t => t.en)
        if(props.category === "defense"){
            const defense = calculateDefenses(types, props.type)
            if(defense > 0) bars.push("good")
            else if(defense < 0) bars.push("bad")
        }else{
            if(isCovered(types, props.type)) bars.push("good")
        }
    }
    
    return (
        <div className="TypeBar">
            <Type type={props.type} case/>
            <div className="TypeBarContent">
                {Array.from({length:6}).map((_, id) => (
                    <div className={"Bar" + (bars.length >= id+1 ? ' ' + bars[id] : "")} key={(props.category ? props.category : "cover") + '-' + props.type + '-' + id}/>
                ))}           
            </div>
        </div>
    )
}

export default TypeBar