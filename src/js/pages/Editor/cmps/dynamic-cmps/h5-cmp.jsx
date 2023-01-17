export  function H5Cmp({ cmp,handleClick }) {
    return (
        <h5 className={cmp.name} style={cmp.style} onClick={e => handleClick(e, cmp)}>
            {cmp.content.txt}
        </h5>
    )
}
