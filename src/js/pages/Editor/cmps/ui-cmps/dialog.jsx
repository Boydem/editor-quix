import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { saveWap } from '../../../../store/wap/wap.action'
import { showErrorMsg, showSuccessMsg } from '../../../../services/event-bus.service'

export function PublishDialog({ publishWap, user, wap, wapUrlToEdit }) {
    const [wapTitle, setWapTitle] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogData, setDialogData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        let dialogDataToEdit
        dialogDataToEdit =
            wap.owner === 'guest'
                ? {
                      title: 'First step',
                      desc: 'Choose your website name!',
                      field: 'Website name',
                      steps: [{ action: publishWap, title: 'Next step' }],
                  }
                : {
                      title: 'Saved!',
                      desc: 'Choose where you want to go',
                      steps: [
                          { action: navigate(`/preview/${wapUrlToEdit.publishUrl}`), title: 'Preview' },
                          { action: navigate(`/dashboard/${wap.owner._id}`), title: 'Dashboard' },
                      ],
                  }
        setDialogData(dialogDataToEdit)
    }, [wap.owner])

    function handleChange({ target }) {
        setWapTitle(target.value)
    }

    async function publishWap() {
        if (!user) {
            showErrorMsg('You must login first')
            return
        }
        try {
            if (wap.owner === 'guest') {
                wap.owner = user._id
                wap.url = wapUrlToEdit.publishUrl
                wap.wapTitle = wapTitle
            }
            await saveWap(wap)
            // navigate(`/${wapUrlToEdit.publishUrl}`)
            showSuccessMsg('Your site has been published!')
        } catch (err) {
            showErrorMsg(`Couldn't Publish, try again later.`)
        }
    }

    console.log('dialog', dialogData)
    if (!dialogData) return
    return (
        <>
            <Dialog.Root className='publish-dialog' open={isDialogOpen}>
                <Dialog.Trigger asChild>
                    <a className='nav-link publish' onClick={() => setIsDialogOpen(true)}>
                        <span>Publish</span>
                    </a>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className='DialogOverlay' />
                    <Dialog.Content className='DialogContent'>
                        <Dialog.Title className='DialogTitle'>{}</Dialog.Title>
                        <Dialog.Description className='DialogDescription'>{dialogData.desc}</Dialog.Description>
                        {dialogData.field && (
                            <fieldset className='Fieldset'>
                                <label className='Label' htmlFor='name'>
                                    {dialogData.field}
                                </label>
                                <input className='Input' id='name' value={wapTitle} onChange={handleChange} />
                            </fieldset>
                        )}
                        {dialogData.steps.map((step, idx) => (
                            <div key={idx} style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                                <Dialog.Close asChild>
                                    <button onClick={() => step.action(wapTitle)} className='Button green'>
                                        {step.title}
                                    </button>
                                </Dialog.Close>
                            </div>
                        ))}

                        <Dialog.Close asChild>
                            <button className='IconButton' aria-label='Close'>
                                <Cross2Icon />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}
