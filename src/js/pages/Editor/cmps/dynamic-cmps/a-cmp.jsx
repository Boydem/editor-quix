export  function ACmp({ cmp }) {
    return (
        <a className={cmp.name} style={cmp.style} href={cmp.content.href}>
            {cmp.content.txt}
        </a>
    )
}
