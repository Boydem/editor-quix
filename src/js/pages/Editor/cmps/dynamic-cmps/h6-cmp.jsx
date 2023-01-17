export  function H6Cmp({ cmp }) {
    return (
        <h6 className={cmp.name} style={cmp.style}>
            {cmp.content.txt}
        </h6>
    )
}
