import './Loader.scss'
import LoaderWhiteIcon from "./../assets/loading-white.svg"
import Body from './Body'
import { useIntl } from 'react-intl';

const Loader = (props) => {
    const intl = useIntl()

    return (
        <div className="Loader">
            <div className="LoaderContent">
                <div className="LoaderIcon">
                    <img src={LoaderWhiteIcon} alt="Chargement en cours..." />
                </div>
                {!props.withoutText && <div className="LoaderText"><Body>{intl.formatMessage({id:'loading-data'})}</Body></div>}
            </div>
        </div>
    )
}

export default Loader