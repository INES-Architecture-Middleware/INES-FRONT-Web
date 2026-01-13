import './Body.scss'

const Body = (props) => {
    let classNames = (props.size ? ' ' + props.size : '') 
                    + (' ' + (props.weight || 'medium'))
                    + (props.justify ? ' justify' : '')
                    + (props.center ? ' center' : '')
                    + (props.white ? ' white' : '')
                    + (props.secondary ? ' secondary' : '')
                    + (props.overflow ? ' overflow' : '')
                    + (props.black ? ' black' : '')
                    + (props.hover ? ' hover' : '')
                    + (props.error ? ' error' : '')
                    + (props.primary ? ' primary' : '')
                    + (props.success ? ' success' : '')
                    + (props.disabled ? ' disabled' : '')
                    + (props.boxSizing ? ' boxSizing' : '')
                    + (props.line ? ' line' : '')
                    + (props.right ? ' right' : '')
                    + (props.uppercase ? ' uppercase' : '')
                    + (props.disabled ? ' disabled' : '')
                    + (props.underline ? ' underline' : '')
                    + (props.hover ? ' hover' : '')

    return (
        <p className={"Body" + (classNames)} style={{maxWidth: (props.maxWidth ? props.maxWidth : "auto"),lineClamp: (props.maxLines ? props.maxLines : "none"), WebkitLineClamp: (props.maxLines ? props.maxLines : "none")}}>
            {props.children}
            {props.error && <em className='error'>{props.error}</em>}
        </p>
    )
}

export default Body