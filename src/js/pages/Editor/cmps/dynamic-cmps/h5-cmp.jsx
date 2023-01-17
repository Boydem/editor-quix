export  function H5Cmp({ cmp }) {
    return (
        <h5 className={cmp.name} style={cmp.style}>
            {cmp.content.txt}
        </h5>
    )
}
