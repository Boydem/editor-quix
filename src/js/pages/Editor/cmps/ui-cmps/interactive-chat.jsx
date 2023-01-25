import { FiMessageSquare } from 'react-icons/fi'
import * as Popover from '@radix-ui/react-popover'
import { useState } from 'react'
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons'
import noamAvatar from '../../../../../assets/imgs/dashboard-assets/noam-tn.jpg'
export function InteractiveChat() {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button data-tooltip='Chat' data-tooltip-dir='bottom' className='btn-icon'>
                    <FiMessageSquare />
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className='PopoverContent interactive-chat' sideOffset={15}>
                    <div className='header'>
                        <div className='title'>Partners chat</div>
                        <Popover.Close className='PopoverClose close' aria-label='Close'>
                            <Cross2Icon />
                        </Popover.Close>
                    </div>
                    <div className='chat-body'>
                        <div className='grid'>
                            <img className='user-avatar' src={noamAvatar} alt='explorerSVG' />
                            <span className='user-name'>Noam</span>
                            <div className='msg'>
                                <p>
                                    Lorem ipsum, commodi dolor sit amet consectetur adipisicing elit. Facilis ratione.
                                </p>
                            </div>
                            <div className='time-ago flex'>2 days ago</div>
                        </div>
                        <div className='grid'>
                            <p className='msg msg-other'>sur adipisicing elit.</p>
                        </div>
                    </div>
                    <div className='chat-input'>
                        <input type='text' name='message' placeholder='Type your message here' />
                    </div>

                    <Popover.Arrow className='PopoverArrow' />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
