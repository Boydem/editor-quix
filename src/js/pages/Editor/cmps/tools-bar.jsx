import { AiOutlineTeam } from 'react-icons/ai'
import { AiOutlineLink } from 'react-icons/ai'
import { AiOutlineMore } from 'react-icons/ai'
import { AiOutlineBars } from 'react-icons/ai'
import { AiOutlineBold } from 'react-icons/ai'

export function ToolsBar() {
    return (
        <section className='tools-bar full'>
            <ul className='tools flex'>
                <li className='tool'>
                    <AiOutlineTeam />
                </li>
                <li className='tool'>
                    <AiOutlineLink />
                </li>

                <li className='tool'>
                    <AiOutlineBold />
                </li>

                <li className='tool'>
                    <AiOutlineBars />
                </li>
                <li className='tool'>
                    <AiOutlineMore />
                </li>
            </ul>
        </section>
    )
}
