export default function PCmp({ cmp }) {
    return (
        <p className={cmp.name} style={cmp.style}>
            {cmp.content.txt}
        </p>
    )
}
