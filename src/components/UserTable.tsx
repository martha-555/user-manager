/** @format */

import { Button, Checkbox, Modal, Table, type TableColumnsType } from 'antd'
import type { User } from '../types/types'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserProvider'

import UserDataForm from './UserDataForm'

const UserTable = () => {
  const { userList, removeUser, isAdminMode } = useContext(UserContext)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [checkedUser, setCheckedUser] = useState<User>()
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)

  const handleEditData = () => {
    setIsEditOpen(true)
    setIsModalOpen(false)
  }

  const handleRemoveUser = () => {
    if (checkedUser) removeUser(checkedUser?.key)
    setIsModalOpen(false)
  }

  const columns: TableColumnsType<User> = [
    { title: "Ім'я", dataIndex: 'name', key: 'name', className: 'text-xl' },
    { title: 'Email', dataIndex: 'email', key: 'email', className: 'text-xl' },
    { title: 'Роль', dataIndex: 'role', key: 'role', className: 'text-xl' },
    {
      title: 'Активний',
      dataIndex: 'active',
      key: 'active',
      className: 'text-xl',
      render: (_, value) => <Checkbox checked={value.active} />,
    },
    {
      title: 'Дії',
      dataIndex: '',
      key: 'x',
      className: 'text-xl',

      render: (_, data) => (
        <Button
          type="primary"
          onClick={() => {
            setCheckedUser(data)
            setIsModalOpen(true)
          }}
        >
          Дії
        </Button>
      ),
    },
  ]

  return (
    <>
      <Table<User>
        className="m-8 mt-[95px] p-8 text-3xl"
        columns={columns}
        dataSource={userList}
        rowKey="key"
        rowClassName={(record) =>
          record.key === checkedUser?.key ? '!bg-[#ededed] text-[#0707ff]' : ''
        }
        onRow={(user) => ({
          onClick: () => {
            setCheckedUser(user)
          },
        })}
      />
      <Modal
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div className="flex flex-col gap-3 p-3">
          <Button onClick={handleEditData} block disabled={!isAdminMode}>
            Редагувати дані
          </Button>
          <Button onClick={handleRemoveUser} block disabled={!isAdminMode}>
            Видалити користувача
          </Button>
        </div>
      </Modal>
      {checkedUser && (
        <UserDataForm user={checkedUser} isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
      )}
    </>
  )
}

export default UserTable
