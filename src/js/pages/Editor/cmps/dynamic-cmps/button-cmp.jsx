export  function ButtonCmp({ cmp }) {
    return (
        <button className={cmp.name} style={cmp.style}>
            {cmp.content.txt}
        </button>
    )
}
