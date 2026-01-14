import { colorType } from '../utils/helpers'
import Body from './Body'
import './Type.scss'

const Type = (props) => {

    return (
        <div className="Type" style={{borderColor:colorType(props.type)}}>
            <Body center>{props.type}</Body>
        </div>
    )
}

export default Type