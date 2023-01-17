export function H3Cmp({ cmp }) {
    return (
        <h3 className={cmp.name} style={cmp.style}>
            {cmp.content.txt}
        </h3>
    )
}
