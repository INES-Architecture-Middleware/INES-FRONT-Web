import { useIntl } from 'react-intl'
import { colorType } from '../utils/helpers'
import Body from './Body'
import './Type.scss'

const Type = (props) => {
    const intl = useIntl()

    return (
        <div className={"Type" + (props.case ? " case" : "")} style={{borderColor:colorType(props.type)}}>
            <Body center>{intl.formatMessage({id:props.type})}</Body>
        </div>
    )
}

export default Type