export default function H2Cmp({ cmp }) {
    return (
        <h2 className={cmp.name} style={cmp.style}>
            {cmp.content.txt}
        </h2>
    )
}
