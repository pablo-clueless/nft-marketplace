import React from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import { FiTrash } from 'react-icons/fi'

import { useAppDispatch, useAppSelector } from '../hooks'
import { useAppContext } from '../contexts'
import { Button } from './'
import { deleteNotification, markAsRead } from '../store/features/notifications'

const NotificationsTab = () => {
    const { notifications } = useAppSelector(store => store.notification)
    const { handleUnclicked } = useAppContext()
    const dispatch = useAppDispatch()

  return (
    <div className='nav-item flex flex-col items-center fixed right-5 md:right-10 top-16 bg-white rounded-lg w-96 p-2 border-[1px] border-slate-400 shadow-2xl'>
      <div className='w-full flex justify-between items-center'>
        <div className='flex gap-3'>
          <p className='font-semibold text-lg'>Notifications</p>
          <button type='button' className='text-slate-600 text-xs rounded p-1 px-2'>{notifications.length} New</button>
        </div>
        <button type='button' onClick={() => handleUnclicked('notification')} className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray rounded-full'>
          <MdOutlineCancel />
        </button>
      </div>
      <div className='w-80 h-200 flex flex-col items-center gap-2 py-2 px-4 mt-5 overflow-y-scroll border border-slate-400'>
        {notifications.map((notification, index) => (
            <div key={index} className={`border border-slate-400 p-2 relative ${notification.isRead ? 'bg-transparent' : 'bg-slate-400'}`}>
              <p className='text-sm'>{notification.data}</p>
              <p className='text-xs'>{notification.time}</p>
              <button className='absolute bottom-1 right-1' onClick={() => dispatch(deleteNotification(notification.id))}>
                <FiTrash />
              </button>
            </div>
        ))}
      </div>
      <div className="mt-5">
        <Button type='button' label='See all notifications' />
      </div>
    </div>
  )
}

export default NotificationsTab