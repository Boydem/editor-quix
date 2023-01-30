import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ScheduleMeeting } from 'react-schedule-meeting'
import useDidMountEffect from '../../../../hooks/use-did-mount-effect'
import { saveWap } from '../../../../store/wap/wap.action'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { socketService, SOCKET_EMIT_SEND_SCHEDULE } from '../../../../services/socket.service'

export function ScheduleCmp({ cmp, onSelectCmp, onHoverCmp }) {
    const wap = useSelector(storeState => storeState.wapModule.wap)
    let [availableTimeslots, setAvailableTimeslots] = useState(wap.schedule.data)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const services = [
        {
            label: 'Family dinner table(2 hours)',
            value: 'family',
        },
        {
            label: 'Birthday party(4 hours)',
            value: 'birthday',
        },
        {
            label: 'Romantic evening',
            value: 'romantic',
        },
        {
            label: 'Dine&Wine with your friends',
            value: 'dineWine',
        },
    ]
    const [selectedService, setSelectedService] = useState('family')
    useDidMountEffect(() => {
        wap.schedule.data = generateEmptyTimeslots()
        setAvailableTimeslots(wap.schedule.data)
    }, [
        wap.schedule.eventDuration,
        wap.schedule.startHour,
        wap.schedule.days,
        wap.schedule.daysForward,
        wap.schedule.endHour,
    ])
    // useDidMountEffect(() => {
    //     wap.schedule.data = generateEmptyTimeslots()
    //     setAvailableTimeslots(wap.schedule.data)
    // }, [wap.schedule.days])
    // useDidMountEffect(() => {
    //     wap.schedule.data = generateEmptyTimeslots()
    //     setAvailableTimeslots(wap.schedule.data)
    // }, [wap.schedule.daysForward])
    useEffect(() => {
        generateTimeslots()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleServiceChange(ev) {
        const { value } = ev.target
        setSelectedService(value)
    }

    function getDayName(timestamp) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const date = new Date(timestamp)
        const day = date.getDay()
        return days[day]
    }

    function generateEmptyTimeslots() {
        const start = new Date()
        start.setHours(wap.schedule.startHour, 0, 0, 0)
        const end = new Date()
        end.setDate(end.getDate() + wap.schedule.daysForward)
        end.setHours(wap.schedule.endHour, 0, 0, 0)

        const intervals = []
        let current = new Date(start)
        let id = 0
        while (current < end) {
            if (!wap.schedule.days.includes(getDayName(current).toLowerCase())) {
                current.setDate(current.getDate() + 1)
                current.setHours(wap.schedule.startHour, 0, 0, 0)
                continue
            }
            let endTime = new Date(current)
            endTime.setMinutes(endTime.getMinutes() + wap.schedule.eventDuration)
            intervals.push({
                id: id,
                startTime: current,
                endTime: endTime,
            })
            current = new Date(endTime)
            if (current.getHours() >= wap.schedule.endHour) {
                current.setDate(current.getDate() + 1)
                current.setHours(wap.schedule.startHour, 0, 0, 0)
            }
            id++
        }
        return intervals
    }

    function generateTimeslots() {
        let savedTimeslots = wap.schedule.data
        if (!savedTimeslots || !savedTimeslots.length) {
            savedTimeslots = generateEmptyTimeslots()
            setAvailableTimeslots(savedTimeslots)
            wap.schedule = { ...wap.schedule, data: savedTimeslots }
            saveWap(wap)
            return
        } else {
            if (isYesterday(savedTimeslots[0].startTime)) {
                savedTimeslots = removeYesterdayMeetings(savedTimeslots)
                const newIntervals = generateLastDay()
                setAvailableTimeslots([...savedTimeslots, ...newIntervals])
            }
        }
        setAvailableTimeslots(savedTimeslots)
    }

    // this generates basic available timeslots for the next 6 days

    function generateLastDay() {
        const start = new Date()
        start.setHours(wap.schedule.startHour, 0, 0, 0)
        start.setDate(start.getDate() + 6)
        const end = new Date()
        end.setDate(end.getDate() + 6)
        end.setHours(wap.schedule.endHour, 0, 0, 0)

        const intervals = []
        let current = new Date(start)
        let id = 0
        while (current < end) {
            let endTime = new Date(current)
            endTime.setMinutes(endTime.getMinutes() + 30)
            intervals.push({
                id: id,
                startTime: current,
                endTime: endTime,
            })
            current = new Date(endTime)
            if (current.getHours() >= wap.schedule.endHour) {
                current.setDate(current.getDate() + 1)
                current.setHours(wap.schedule.startHour, 0, 0, 0)
            }
            id++
        }
        return intervals
    }

    function isYesterday(timestamp) {
        const date = new Date(timestamp)
        const today = new Date()
        if (
            date.getDate() === today.getDate() - 1 &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        ) {
            return true
        } else {
            return false
        }
    }

    function removeYesterdayMeetings(intervals) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        // const today = new Date()
        // today.setHours(9, 0, 0, 0)
        // today.setDate(today.getDate())
        // const yesterday = new Date()
        // yesterday.setDate(yesterday.getDate() - 1)
        // yesterday.setHours(17, 0, 0, 0)

        return intervals.filter(interval => {
            const start = new Date(interval.startTime)
            start.setHours(0, 0, 0, 0)
            return start >= today || start < yesterday
        })
    }

    async function handleTimeslotClicked(selectedMeeting) {
        const selectedMeetingIdx = selectedMeeting.availableTimeslot.id
        setMeetingInputs(prev => ({ ...prev, datetime: availableTimeslots[selectedMeetingIdx] }))

        availableTimeslots.splice(selectedMeetingIdx, 1)
        // setAvailableTimeslots([...availableTimeslots])
        wap.schedule.data = availableTimeslots
        setIsModalOpen(true)
        saveWap(wap)
    }

    const [meetingInputs, setMeetingInputs] = useState({ fullname: '', phoneNumber: '', datetime: '' })

    function handleChange(ev) {
        const value = ev.target.value
        const field = ev.target.name
        setMeetingInputs(prev => ({ ...prev, [field]: value }))
    }

    function onFinalizeBooking(ev) {
        ev.preventDefault()
        wap.schedule.meetings.push(meetingInputs)
        socketService.emit(SOCKET_EMIT_SEND_SCHEDULE, { data: meetingInputs, to: wap.owner })
        saveWap(wap)
        setIsModalOpen(false)
    }
    if (!availableTimeslots) return
    return (
        <>
            <div
                className={`schedule-meeting ${cmp.name}`}
                onClick={e => onSelectCmp(e, cmp)}
                onMouseOver={onHoverCmp}
                onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
            >
                <ScheduleMeeting
                    borderRadius={10}
                    primaryColor='#3f5b85'
                    eventDurationInMinutes={wap.schedule.eventDuration}
                    availableTimeslots={availableTimeslots}
                    onStartTimeSelect={handleTimeslotClicked}
                    startTimeListStyle={'scroll-list'}
                    startTimeFormatString='HH:mm'
                />
            </div>
            {isModalOpen && (
                <>
                    <div className='black-overlay'></div>
                    <div className='schedule-modal'>
                        <form className='send-meeting-form' onSubmit={onFinalizeBooking}>
                            <h3>Finalize your booking</h3>
                            <p>Fill up these fields so we let you know in any case of changes !</p>
                            <label htmlFor='fullName'>Full name</label>
                            <input
                                type='text'
                                id='fullName'
                                name='fullname'
                                placeholder='Fullname'
                                onChange={handleChange}
                                value={meetingInputs.fullname}
                            />
                            <label htmlFor='phoneNumber'>Phone number</label>
                            <input
                                type='tel'
                                name='phoneNumber'
                                id='phoneNumber'
                                placeholder='Phone Number'
                                onChange={handleChange}
                                value={meetingInputs.phoneNumber}
                            />
                            {/* <select
                        type='select'
                        id='serviceSelect'
                        name='serviceSelect'
                        onChange={handleServiceChange}
                        value={selectedService}
                    >
                        {services.map((service, idx) => (
                            <option key={idx} value={service.value}>
                                {service.label}
                            </option>
                        ))}
                    </select> */}
                            <button type='submit'>Send</button>
                        </form>
                    </div>
                </>
            )}
        </>
    )
}
