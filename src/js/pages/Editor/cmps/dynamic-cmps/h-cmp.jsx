export function HCmp({ cmp, handleClick, hType, onHover }) {
    let classes = cmp.name + ' '
    if (cmp.class) {
        classes += cmp.class?.join(' ')
    }

    switch (hType) {
        case 'h1':
            return (
                <h1
                    className={classes}
                    style={cmp.style}
                    onClick={e => handleClick(e, cmp)}
                    onMouseOver={onHover}
                    onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
                >
                    {cmp.content.txt}
                </h1>
            )
        case 'h2':
            return (
                <h2
                    className={classes}
                    style={cmp.style}
                    onClick={e => handleClick(e, cmp)}
                    onMouseOver={onHover}
                    onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
                >
                    {cmp.content.txt}
                </h2>
            )
        case 'h3':
            return (
                <h3
                    className={classes}
                    style={cmp.style}
                    onClick={e => handleClick(e, cmp)}
                    onMouseOver={onHover}
                    onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
                >
                    {cmp.content.txt}
                </h3>
            )
        case 'h4':
            return (
                <h4
                    className={classes}
                    style={cmp.style}
                    onClick={e => handleClick(e, cmp)}
                    onMouseOver={onHover}
                    onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
                >
                    {cmp.content.txt}
                </h4>
            )
        case 'h5':
            return (
                <h5
                    className={classes}
                    style={cmp.style}
                    onClick={e => handleClick(e, cmp)}
                    onMouseOver={onHover}
                    onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
                >
                    {cmp.content.txt}
                </h5>
            )
        case 'h6':
            return (
                <h6
                    className={classes}
                    style={cmp.style}
                    onClick={e => handleClick(e, cmp)}
                    onMouseOver={onHover}
                    onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
                >
                    {cmp.content.txt}
                </h6>
            )

        default:
            console.log('PROBLEM WITH HTYPE')
            break
    }
}
