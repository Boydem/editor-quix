export  function H4Cmp({ cmp }) {
    return (
        <h4 className={cmp.name} style={cmp.style}>
            {cmp.content.txt}
        </h4>
    )
}
