/** @format */

import { createContext, useEffect, useState } from 'react'
import { users as initialUsers } from '../data/users'
import type { User } from '../types/types'
type Props = {
  children: React.ReactNode
}

type TUserContext = {
  userList: User[]
  checkedUser: User | null
  editUserData: (user: User) => void
  createUser: (user: User) => void
  getCheckedUser: (user: User) => void
  editUserRole: (role: 'user' | 'admin') => void
  removeUser: (id: number) => void
  isAdminMode: boolean
}

const initialValues = {
  userList: [],
  checkedUser: null,
  editUserData: () => {},
  removeUser: () => {},
  createUser: () => {},
  getCheckedUser: () => {},
  editUserRole: () => {},
  isAdminMode: false,
}

export const userContext = createContext<TUserContext>(initialValues)

const UserProvider = ({ children }: Props) => {
  const userStorage = localStorage.getItem('users')
  const [userList, setUserList] = useState<User[]>(JSON.parse(userStorage || '[]'))
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false)
  const [checkedUser, setCheckedUser] = useState<User | null>(null)

  useEffect(() => {
    if (!userStorage) {
      setUserList(initialUsers)
      localStorage.setItem('users', JSON.stringify(initialUsers))
    }
  }, [userStorage])

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(userList))
  }, [userList])

  const isAdmin = (role: 'user' | 'admin') => {
    role == 'admin' ? setIsAdminMode(true) : setIsAdminMode(false)
  }

  const editUserData = (user: User) => {
    const updateUserList = userList.map((item) => (item.key === user.key ? user : item))
    setUserList(updateUserList)
    isAdmin(user.role)
  }

  const removeUser = (key: number) => {
    const updateUserList = userList.filter((user) => user.key !== key)
    setUserList(updateUserList)
  }

  const createUser = (user: User) => {
    setUserList((prev) => [user, ...prev])
  }

  const getCheckedUser = (user: User) => {
    setCheckedUser(user)
    isAdmin(user.role)
  }

  const editUserRole = (role: 'user' | 'admin') => {
    const editUserData = userList.map((item) => {
      return item.key == checkedUser?.key ? { ...item, role: role } : item
    })
    setUserList(editUserData)
    isAdmin(role)
  }

  return (
    <userContext.Provider
      value={{
        userList,
        editUserData,
        removeUser,
        createUser,
        isAdminMode,
        getCheckedUser,
        checkedUser,
        editUserRole,
      }}
    >
      {children}
    </userContext.Provider>
  )
}

export default UserProvider
