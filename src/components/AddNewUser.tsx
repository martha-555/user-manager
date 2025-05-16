/** @format */

import { Button } from 'antd'
import { useState } from 'react'
import UserDataForm from './UserDataForm'

const AddNewUser = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleCreateUser = () => {
    setIsOpen(true)
  }

  return (
    <>
      <Button onClick={handleCreateUser} type="primary" size="large">
        Створити нового користувача
      </Button>
      {isOpen && <UserDataForm isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  )
}

export default AddNewUser
