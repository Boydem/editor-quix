export  function H4Cmp({ cmp,handleClick }) {
    return (
        <h4 className={cmp.name} style={cmp.style} onClick={e => handleClick(e, cmp)}>
            {cmp.content.txt}
        </h4>
    )
}
