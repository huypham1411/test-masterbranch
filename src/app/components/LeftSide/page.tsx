import { Calendar, CalendarProps, ConfigProvider, Divider } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import React from 'react'
import CardEvent from '../CardEvent/page'
import { CalendarEvent, Data } from '@/app/page'
import clsx from 'clsx'

type Props = {
    onChange: (value: Dayjs) => void
    selectedDate: Dayjs
    data?: Data[]
    selectedEvent?: CalendarEvent
    onEventCardClick: any
}

const LeftSide = ({
    onChange,
    selectedDate,
    data,
    selectedEvent,
    onEventCardClick,
}: Props) => {
    const getListData = (value: Dayjs) => {
        let listData = data?.find((event) =>
            dayjs(event.eventDate).isSame(value, 'day')
        )?.eventList
        return listData || []
    }
    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value)
        const hasEvent = listData.length > 0

        return (
            <div
                className={clsx(
                    hasEvent
                        ? 'bg-[#FFE4C8] ant-picker-cell-inner'
                        : 'ant-picker-cell-inner'
                )}
            >
                {value.format('D')}
            </div>
        )
    }
    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current)
        return info.originNode
    }
    return (
        <div className="flex flex-col bg-[#E4F6ED] p-[10px]">
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
                    fullscreen={false}
                    onChange={onChange}
                    fullCellRender={cellRender}
                />
            </ConfigProvider>
            <Divider />
            {/* this is the event from the date */}
            <div className="flex flex-col gap-[10px]">
                <div className="text-xl font-bold text-[#0F4C81] ">
                    Upcomming Events
                </div>
                <div>{selectedDate.format('DD/MM/YYYY')}</div>
                {selectedDate && data && (
                    <div className="flex flex-col gap-[10px]">
                        {data
                            .find((item) =>
                                dayjs(item.eventDate).isSame(
                                    selectedDate.startOf('day'),
                                    'day'
                                )
                            )
                            ?.eventList.map((event) => (
                                <div key={event.eventTitle}>
                                    <CardEvent
                                        data={event}
                                        selectedEvent={selectedEvent}
                                        onClick={onEventCardClick}
                                    />
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default LeftSide
