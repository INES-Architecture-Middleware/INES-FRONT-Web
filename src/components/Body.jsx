import './Body.scss'

const Body = (props) => {
    let classNames = (props.size ? ' ' + props.size : '') 
                    + (' ' + (props.weight || 'medium'))
                    + (props.justify ? ' justify' : '')
                    + (props.center ? ' center' : '')
                    + (props.white ? ' white' : '')
                    + (props.hover ? ' hover' : '')
                    + (props.error ? ' error' : '')
                    + (props.primary ? ' primary' : '')
                    + (props.success ? ' success' : '')
                    + (props.disabled ? ' disabled' : '')
                    + (props.boxSizing ? ' boxSizing' : '')
                    + (props.line ? ' line' : '')
                    + (props.uppercase ? ' uppercase' : '')
                    + (props.underline ? ' underline' : '')
                    + (props.hover ? ' hover' : '')

    return (
        <p className={"Body" + (classNames)} style={{lineClamp: (props.maxLines ? props.maxLines : "none"), WebkitLineClamp: (props.maxLines ? props.maxLines : "none")}}>{props.children}</p>
    )
}

export default Body