import React, { useState } from 'react'
import { useEffect } from 'react'
import { ScheduleMeeting } from 'react-schedule-meeting'

export function ReactSchedule() {
    // this generates basic available timeslots for the next 6 days
    let [availableTimeslots, setAvailableTimeslots] = useState(() => {
        const start = new Date()
        start.setHours(9, 0, 0, 0)
        const end = new Date()
        end.setDate(end.getDate() + 5)
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
    })

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

    function isSameDay(ts) {
        var today = new Date().setHours(0, 0, 0, 0)
        var thatDay = new Date(ts).setHours(0, 0, 0, 0)

        return today === thatDay
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

    useEffect(() => {
        setTimeout(() => {
            if (isSameDay(availableTimeslots[0].startTime)) {
                console.log('*** Same day ***')
                availableTimeslots = removeYesterdayMeetings(availableTimeslots)
                const newIntervals = generateLastDay()
                setAvailableTimeslots([...availableTimeslots, ...newIntervals])
            }
        }, 5000)
    }, [])

    console.log(availableTimeslots)

    const handleTimeslotClicked = selectedMeeting => {
        const selectedMeetingIdx = selectedMeeting.availableTimeslot.id
        availableTimeslots.splice(selectedMeetingIdx, 1)
        setAvailableTimeslots([...availableTimeslots])
    }

    return (
        <ScheduleMeeting
            borderRadius={10}
            primaryColor='#3f5b85'
            eventDurationInMinutes={30}
            availableTimeslots={availableTimeslots}
            onStartTimeSelect={handleTimeslotClicked}
            startTimeListStyle={'scroll-list'}
        />
    )
}
