import { Calendar, CalendarProps } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import React from 'react'
import CardEvent from '../CardEvent/page'
import { Data } from '@/app/page'

type Props = {
    onChange: (value: Dayjs) => void
    selectedDate: Dayjs
    data?: Data[]
}

const LeftSide = ({ onChange, selectedDate, data }: Props) => {
    const getListData = (value: Dayjs) => {
        let listData = data?.find((event) =>
            dayjs(event.eventDate).isSame(value, 'day')
        )?.eventList
        return listData || []
    }
    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value)
        return (
            listData.length > 0 && (
                <div className="w-[10px] h-[10px] bg-red-600"></div>
            )
        )
    }
    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current)
        return info.originNode
    }
    return (
        <div className="flex flex-col">
            <Calendar
                value={selectedDate}
                fullscreen={false}
                onChange={onChange}
                cellRender={cellRender}
            />
            {/* this is the event from the date */}
            {selectedDate &&
                data &&
                data
                    .find((item) =>
                        dayjs(item.eventDate).isSame(
                            selectedDate.startOf('day'),
                            'day'
                        )
                    )
                    ?.eventList.map((event) => (
                        <div key={event.eventTitle}>
                            <CardEvent data={event} />
                        </div>
                    ))}
        </div>
    )
}

export default LeftSide
