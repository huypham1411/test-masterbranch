import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarEvent } from '@/app/page'
import { VideoCameraOutlined } from '@ant-design/icons'
import clsx from 'clsx'

type Props = {
    data: CalendarEvent
    selectedEvent?: CalendarEvent
    onClick: any
}

const CardEvent = ({ data, selectedEvent, onClick }: Props) => {
    const {
        duration,
        eventTitle,
        clientInfo,
        isMeeting,
        meetingUrl = '#',
        eventId,
    } = data
    return (
        <div
            className={clsx(
                'flex flex-row justify-between p-[20px] rounded-[10px] border-l-[10px] border-solid',
                selectedEvent?.eventId === eventId
                    ? 'bg-[#5684AE] border-[#FFE4C8]'
                    : 'bg-[#FFE4C8]  border-[#0F4C81]'
            )}
            onClick={() => onClick(data)}
        >
            <div className="flex flex-col gap-[10px] text-[#0F4C81]">
                <h2 className="text-[15px] font-bold">{eventTitle}</h2>
                <div>{duration}</div>
                {clientInfo && (
                    <div className="flex flex-row gap-[20px]">
                        <Image
                            alt="client-img"
                            src={clientInfo?.avatarImg}
                            className="rounded-[100px] w-[30px] h-[30px]"
                            width={30}
                            height={30}
                        />
                        <Link
                            href={clientInfo.clientProfileUrl}
                            className="underline text-blue-400"
                        >
                            View Client Profile
                        </Link>
                    </div>
                )}
            </div>
            {isMeeting && (
                <Link href={meetingUrl}>
                    <VideoCameraOutlined
                        className={clsx(
                            'p-[16px] rounded-[50px] ',
                            selectedEvent?.eventId === eventId
                                ? 'bg-[#FFE4C8] text-[#0F4C81]'
                                : 'bg-[#0F4C81] text-[#FFE4C8]'
                        )}
                    />
                </Link>
            )}
        </div>
    )
}

export default CardEvent
