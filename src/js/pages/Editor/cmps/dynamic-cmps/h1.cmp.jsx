export  function H1Cmp({ cmp,handleClick }) {
    return (
        <h1 className={cmp.name} style={cmp.style} onClick={e => handleClick(e, cmp)}>
            {cmp.content.txt}
        </h1>
    )
}
