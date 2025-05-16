/** @format */

import { createContext, useEffect, useState } from 'react'
import { users as initialUsers } from '../data/users'
import type { User } from '../types/types'
type Props = {
  children: React.ReactNode
}

type UserContext = {
  userList: User[]
  editUserData: (user: User) => void
  createUser: (user: User) => void
  setUserMode: (role: 'user' | 'admin') => void
  removeUser: (id: number) => void
  isAdminMode: boolean
}

const initialValues = {
  userList: [],
  editUserData: () => {},
  removeUser: () => {},
  createUser: () => {},
  isAdminMode: false,
  setUserMode: () => {},
}

export const UserContext = createContext<UserContext>(initialValues)

const UserProvider = ({ children }: Props) => {
  const userStorage = localStorage.getItem('users')
  const [userList, setUserList] = useState<User[]>(JSON.parse(userStorage || '[]'))
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false)

  useEffect(() => {
    if (!userStorage) {
      setUserList(initialUsers)
      localStorage.setItem('users', JSON.stringify(initialUsers))
    }
  }, [userStorage])

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(userList))
  }, [userList])

  const setUserMode = (role: 'user' | 'admin') => {
    role == 'admin' ? setIsAdminMode(true) : setIsAdminMode(false)
  }

  const editUserData = (user: User) => {
    setUserList(userList.map((item) => (item.key === user.key ? user : item)))
  }

  const removeUser = (key: number) => {
    setUserList(userList.filter((user) => user.key !== key))
  }

  const createUser = (user: User) => {
    setUserList((prev) => [user, ...prev])
  }

  return (
    <UserContext.Provider
      value={{
        userList,
        editUserData,
        removeUser,
        createUser,
        isAdminMode,
        setUserMode,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
