import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ScheduleMeeting } from 'react-schedule-meeting'
import useDidMountEffect from '../../../../hooks/use-did-mount-effect'
import { saveWap } from '../../../../store/wap/wap.action'

export function ScheduleCmp({ cmp, onSelectCmp, onHoverCmp }) {
    const wap = useSelector(storeState => storeState.wapModule.wap)
    let [availableTimeslots, setAvailableTimeslots] = useState(wap.schedule.data)

    useDidMountEffect(() => {
        wap.schedule.data = generateEmptyTimeslots()
        setAvailableTimeslots(wap.schedule.data)
    }, [wap.schedule.eventDuration])
    useDidMountEffect(() => {
        wap.schedule.data = generateEmptyTimeslots()
        setAvailableTimeslots(wap.schedule.data)
    }, [wap.schedule.days])

    useEffect(() => {
        generateTimeslots()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getDayName(timestamp) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const date = new Date(timestamp)
        const day = date.getDay()
        return days[day]
    }

    function generateEmptyTimeslots() {
        const start = new Date()
        start.setHours(9, 0, 0, 0)
        const end = new Date()
        end.setDate(end.getDate() + wap.schedule.daysForward)
        end.setHours(17, 0, 0, 0)

        const intervals = []
        let current = new Date(start)
        let id = 0
        while (current < end) {
            // console.log('wap.schedule.days:', wap.schedule.days)
            if (!wap.schedule.days.includes(getDayName(current).toLowerCase())) {
                current.setDate(current.getDate() + 1)
                current.setHours(9, 0, 0, 0)
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
            if (current.getHours() >= 17) {
                current.setDate(current.getDate() + 1)
                current.setHours(9, 0, 0, 0)
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
                console.log('*** yesterday ***')
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
        start.setHours(9, 0, 0, 0)
        start.setDate(start.getDate() + 6)
        const end = new Date()
        end.setDate(end.getDate() + 6)
        end.setHours(17, 0, 0, 0)

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
            if (current.getHours() >= 17) {
                current.setDate(current.getDate() + 1)
                current.setHours(9, 0, 0, 0)
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

    const handleTimeslotClicked = selectedMeeting => {
        const selectedMeetingIdx = selectedMeeting.availableTimeslot.id
        availableTimeslots.splice(selectedMeetingIdx, 1)
        setAvailableTimeslots([...availableTimeslots])
        wap.schedule.data = availableTimeslots
        saveWap(wap)
    }
    console.log('availableTimeslots:', availableTimeslots)
    if (!availableTimeslots) return
    return (
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
            />
        </div>
    )
}
