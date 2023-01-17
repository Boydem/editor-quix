export default function SpanCmp({ cmp, handleClick }) {
    return (
        <span className={cmp.name} style={cmp.style} onClick={e => handleClick(e, cmp)}>
            {cmp.content.txt}
        </span>
    )
}
