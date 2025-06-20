import './Loader.scss'
import LoaderIcon from "./../assets/loading.svg"
import LoaderWhiteIcon from "./../assets/loading-white.svg"
import Body from './Body'
import ThemeContext from './ThemeContext';
import { useContext } from 'react';
import { useIntl } from 'react-intl';

const Loader = (props) => {
    const intl = useIntl()
    const { theme, toggleTheme, fetching } = useContext(ThemeContext);

    return (
        <div className="Loader">
            <div className="LoaderContent">
                <div className="LoaderIcon">
                    <img src={theme === 'dark'?LoaderWhiteIcon:LoaderIcon} alt="Chargement en cours..." />
                </div>
                {!props.withoutText && <div className="LoaderText"><Body>{intl.formatMessage({id:'loading-data'})}</Body></div>}
            </div>
        </div>
    )
}

export default Loader