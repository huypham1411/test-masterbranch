import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarEvent, Data } from '@/app/page'
import { VideoCameraOutlined } from '@ant-design/icons'

type Props = {
    data: CalendarEvent
}

const CardEvent = ({ data }: Props) => {
    const { duration, eventTitle, clientInfo, isMeeting } = data
    return (
        <div className="flex flex-row">
            <div className="flex flex-col">
                <h2>{eventTitle}</h2>
                <div>{duration}</div>
                {clientInfo && (
                    <div className="flex flex-row">
                        <Image
                            alt="client-img"
                            src={clientInfo?.avatarImg}
                            className="rounded-[100px] w-[30px] h-[30px]"
                        />
                        <Link href={clientInfo.clientProfileUrl} />
                    </div>
                )}
            </div>
            {isMeeting && <VideoCameraOutlined />}
        </div>
    )
}

export default CardEvent
