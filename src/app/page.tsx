'use client'
import { Calendar, CalendarProps } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'
import LeftSide from './components/LeftSide/page'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export type CalendarEvent = {
    eventTitle: string
    duration: string
    isMeeting?: boolean
    clientInfo?: {
        avatarImg: string | StaticImport
        clientProfileUrl: string
    }
}
export type Data = {
    eventDate: string
    eventList: Array<CalendarEvent>
}

export default function Home() {
    const [selectedDate, setSelectedDate] = useState(dayjs())
    //data by month with userId
    const datas: Data[] = [
        {
            eventDate: '2/23/2024',
            eventList: [
                {
                    duration: '9h - 10h',
                    eventTitle: 'Meeting',
                },
            ],
        },
        {
            eventDate: '2/24/2024',
            eventList: [
                {
                    duration: '9h - 10h',
                    eventTitle: 'Meeting',
                    isMeeting: true,
                },
                {
                    duration: '13h - 14h',
                    eventTitle: 'Team party',
                },
            ],
        },
    ]
    const onChange = (value: Dayjs) => {
        setSelectedDate(value)
    }

    const getListData = (value: Dayjs) => {
        let listData = datas.find((event) =>
            dayjs(event.eventDate).isSame(value, 'day')
        )?.eventList
        return listData || []
    }

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value)
        return (
            <ul>
                {listData.map((item) => (
                    <li key={item.eventTitle}>
                        <p>{item.eventTitle}</p>
                    </li>
                ))}
            </ul>
        )
    }

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current)
        return info.originNode
    }
    return (
        <main className="flex min-h-screen flex-col md:flex-row items-center justify-between gap-[20%] p-[24px]">
            <div className="flex">
                <LeftSide
                    onChange={onChange}
                    selectedDate={selectedDate}
                    data={datas}
                />
            </div>
            <div className="flex">
                <Calendar
                    value={selectedDate}
                    onChange={onChange}
                    cellRender={cellRender}
                />
            </div>
        </main>
    )
}
