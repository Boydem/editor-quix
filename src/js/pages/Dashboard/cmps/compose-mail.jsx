export default function ComposeMail() {
    return (
        <div className='compose-mail full'>
            <div className='to'>
                <p className='weight-700'>To:</p>
                <p>yagosik@gmail.com</p>
            </div>
            <div className='title'>
                <p className='weight-700'>Title:</p>
                <input type='text' />
            </div>
            <div className='mail-container'>
                <p>Hey Yagosik</p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo modi assumenda velit dolor impedit
                    eligendi.
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, perferendis, ut error quasi est
                    veniam officiis reiciendis incidunt fugit repellendus architecto explicabo dolorem ab sit omnis
                    amet. Quisquam, deleniti blanditiis?
                </p>
            </div>
        </div>
    )
}
