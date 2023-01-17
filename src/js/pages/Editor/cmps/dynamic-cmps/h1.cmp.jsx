export  function H1Cmp({ cmp }) {
    return (
        <h1 className={cmp.name} style={cmp.style}>
            {cmp.content.txt}
        </h1>
    )
}
