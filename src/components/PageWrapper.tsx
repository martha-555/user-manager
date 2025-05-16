/** @format */

import type React from 'react'
import AddNewUser from './AddNewUser'
import { Radio, Space } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { userContext } from '../context/UserProvider'
type Props = {
  children: React.ReactNode
}

const PageWrapper = ({ children }: Props) => {
  const { isAdminMode, editUserRole } = useContext(userContext)
  const [position, setPosition] = useState<string>('')

  useEffect(() => {
    isAdminMode ? setPosition('admin') : setPosition('user')
  }, [isAdminMode])

  return (
    <>
      <header className="fixed top-0 z-[1] flex w-full justify-end bg-gray-200 p-8 text-2xl">
        <Space>
          <Radio.Group
            value={position}
            onChange={(e) => {
              editUserRole(e.target.value)
              setPosition(e.target.value)
            }}
          >
            <div className="mr-[40px]">
              <Radio.Button value="user">User</Radio.Button>
              <Radio.Button value="admin">Admin</Radio.Button>
            </div>
          </Radio.Group>
          <AddNewUser />
        </Space>
      </header>
      <div>{children}</div>
    </>
  )
}

export default PageWrapper
