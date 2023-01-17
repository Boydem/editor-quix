export  function H2Cmp({ cmp,handleClick }) {
    return (
        <h2 className={cmp.name} style={cmp.style} onClick={e => handleClick(e, cmp)}>
            {cmp.content.txt}
        </h2>
    )
}
