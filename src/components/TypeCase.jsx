import { useIntl } from "react-intl"
import { colorResistance, colorType } from "../utils/helpers"
import Body from "./Body"
import './TypeCase.scss'
import { calculateResistances } from "../data/types"
import Type from "./Type"

const TypeCase = (props) => {
    const intl = useIntl()
    
    const resistance = calculateResistances(props.types.map(f => f.en?.toLowerCase()), props.type)

    return (
        <div className="TypeCase">
            <Type type={props.type} case/>
            <div className="TypeContent">
                <Body color={colorResistance(resistance)}>{intl.formatMessage({id:'r-'+resistance})}</Body>
            </div>
        </div>
    )
}

export default TypeCase