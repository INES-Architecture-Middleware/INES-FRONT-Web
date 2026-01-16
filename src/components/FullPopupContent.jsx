import { useIntl } from 'react-intl'
import './FullPopupContent.scss'
import Heading from './Heading'
import Body from './Body'
import Button from './Button'
import CrossWhiteIcon from './../assets/cross-white.svg'

const FullPopupContent = (props) => {
    const intl = useIntl()

    return (
        <div className="FullPopup">
            <div className="FullPopupContainer">
                <div className="FullPopupScroll">
                    <div className="FullPopupHeader">
                        <div className="PopupTitle">                    
                            {props.id && <>
                                <Heading size={'h3'}>{props.id}</Heading>
                                <div className="divider"/>
                            </>}
                            <div className="TitleNames">
                                {props.title && <Heading size={'h4'}>{intl.formatMessage({id:props.title})}</Heading>}
                                {props.subTitle && <Body secondary weight={'light'}>{intl.formatMessage({id:props.subTitle})}</Body>}
                            </div>
                        </div>
                        {props.closePopup && <Button size={'large'} type={'tercery'} icon={CrossWhiteIcon} onClick={props.closePopup} />}
                    </div>
                    <div className="FullPopupContent">
                        {props.children && props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FullPopupContent