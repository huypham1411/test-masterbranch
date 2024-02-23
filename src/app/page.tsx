'use client'
import { Calendar, CalendarProps, ConfigProvider } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useCallback, useEffect, useMemo, useState } from 'react'
import LeftSide from './components/LeftSide/page'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import clsx from 'clsx'

export type CalendarEvent = {
    eventTitle: string
    duration: string
    isAppointment?: boolean
    clientInfo?: {
        avatarImg: string | StaticImport
        clientProfileUrl: string
    }
    meetingUrl?: string
    eventId: string
}
export type Data = {
    eventDate: string
    eventList: Array<CalendarEvent>
}

export default function Home() {
    const [selectedDate, setSelectedDate] = useState(dayjs())
    const [selectedEvent, setSelectedEvent]: any = useState()
    //data by month with userId
    const datas: Data[] = useMemo(
        () => [
            {
                eventDate: '2/10/2024',
                eventList: [
                    {
                        eventId: '1',
                        duration: '9h - 10h',
                        eventTitle: 'Meeting with client',
                        isAppointment: true,
                        clientInfo: {
                            avatarImg: 'https://i.pravatar.cc/150?img=3',
                            clientProfileUrl: 'https://i.pravatar.cc/150?img=3',
                        },
                    },
                    {
                        eventId: '2',
                        duration: '9h - 10h',
                        eventTitle: 'Web seminar',
                    },
                ],
            },
            {
                eventDate: '2/20/2024',
                eventList: [
                    {
                        eventId: '3',
                        duration: '9h - 10h',
                        eventTitle: 'Meeting with client',
                        isAppointment: true,
                        clientInfo: {
                            avatarImg: 'https://i.pravatar.cc/150?img=3',
                            clientProfileUrl: 'https://i.pravatar.cc/150?img=3',
                        },
                    },
                ],
            },
            {
                eventDate: '2/23/2024',
                eventList: [
                    {
                        eventId: '4',
                        duration: '9h - 10h',
                        eventTitle: 'Meeting with client',
                        isAppointment: true,
                        clientInfo: {
                            avatarImg: 'https://i.pravatar.cc/150?img=3',
                            clientProfileUrl: 'https://i.pravatar.cc/150?img=3',
                        },
                    },
                ],
            },
            {
                eventDate: '2/24/2024',
                eventList: [
                    {
                        eventId: '5',
                        duration: '9h - 10h',
                        eventTitle: 'Meeting with client',
                        isAppointment: true,
                        clientInfo: {
                            avatarImg: 'https://i.pravatar.cc/150?img=3',
                            clientProfileUrl: 'https://i.pravatar.cc/150?img=3',
                        },
                    },
                    {
                        eventId: '6',
                        duration: '13h - 14h',
                        eventTitle: 'Team party',
                    },
                    {
                        eventId: '7',
                        duration: '15h - 18h',
                        eventTitle: 'Company discussion',
                    },
                ],
            },
        ],
        []
    )
    const onChange = (value: Dayjs) => {
        setSelectedDate(value)
    }

    const getListData = useCallback(
        (value: Dayjs) => {
            let listData = datas.find((event) =>
                dayjs(event.eventDate).isSame(value, 'day')
            )?.eventList
            return listData || []
        },
        [datas]
    )

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value)
        return (
            listData.length > 0 && (
                <ul className="bg-[#FFE4C8] rounded-[5px] flex flex-col gap-[5px] p-[10px]">
                    {listData.map((item) => (
                        <li
                            key={item.eventId}
                            className={clsx(
                                'whitespace-nowrap overflow-hidden rounded-[5px]',
                                selectedEvent?.eventId === item.eventId
                                    ? 'bg-[#5684AE]'
                                    : 'bg-[#F9BE81]'
                            )}
                            onClick={() => setSelectedEvent(item)}
                        >
                            <p>{item.eventTitle}</p>
                        </li>
                    ))}
                </ul>
            )
        )
    }

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current)
        return info.originNode
    }

    useEffect(() => {
        const listEvent = getListData(selectedDate)
        if (listEvent.length > 0) {
            return setSelectedEvent(listEvent[0])
        }
        setSelectedEvent(undefined)
    }, [getListData, selectedDate])

    return (
        <main className="flex flex-col md:flex-row items-center justify-between gap-[10vh] md:gap-[10%] p-[24px]">
            <div className="flex">
                <LeftSide
                    onChange={onChange}
                    selectedDate={selectedDate}
                    data={datas}
                    selectedEvent={selectedEvent}
                    onEventCardClick={setSelectedEvent}
                />
            </div>
            <div className="flex">
                <ConfigProvider
                    theme={{
                        components: {
                            Calendar: {
                                fullBg: '#E4F6ED',
                                itemActiveBg: '#0F4C81',
                            },
                        },
                    }}
                >
                    <Calendar
                        value={selectedDate}
                        onChange={onChange}
                        cellRender={cellRender}
                        className="p-[10px]"
                    />
                </ConfigProvider>
            </div>
        </main>
    )
}
