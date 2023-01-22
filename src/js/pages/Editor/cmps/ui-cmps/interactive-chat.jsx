import { FiMessageSquare } from 'react-icons/fi'
import * as Popover from '@radix-ui/react-popover'
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons'
export function InteractiveChat() {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button className='tool'>
                    <FiMessageSquare />
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className='interactive-chat' sideOffset={5}>
                    <div className='chat-body'>
                        <div className='msg-container'>
                            <p className='msg msg-me'>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className='msg-container'>
                            <p className='msg msg-other'>sur adipisicing elit.</p>
                        </div>
                    </div>
                    <div className='chat-input'>
                        <input type='text' name='message' placeholder='Type your message here' />
                    </div>

                    <Popover.Close className='PopoverClose' aria-label='Close'>
                        <Cross2Icon />
                    </Popover.Close>
                    <Popover.Arrow className='PopoverArrow' />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
