/** @format */

import { Button, Checkbox, Form, Input, Modal, Select } from 'antd'
import type { User } from '../types/types'
import { useContext, useEffect } from 'react'
import { userContext } from '../context/UserProvider'
type Props = {
  user?: User
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UserDataForm = ({ user, isOpen, setIsOpen }: Props) => {
  const { userList, editUserData, createUser } = useContext(userContext)
  const { Option } = Select
  const [form] = Form.useForm()

  useEffect(() => {
    if (isOpen) {
      if (user) {
        form.setFieldsValue({
          name: user.name,
          email: user.email,
          role: user.role,
          active: user.active,
          key: user.key,
        })
      } else {
        form.resetFields()
      }
    }
  }, [user, isOpen, form])

  const handleSubmit = (data: User) => {
    user ? editUserData({ ...data, key: user?.key }) : createUser({ ...data, key: Date.now() })
    setIsOpen(false)
  }

  return (
    <Modal
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
    >
      <Form
        form={form}
        key={user?.key || userList.length + 1}
        className="flex flex-col gap-3"
        layout="horizontal"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Ім'я"
          rules={[
            {
              pattern: /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ\s'-]{2,}$/,
              message: "Введіть коректне ім'я",
            },
            { required: true, message: 'Будь ласка, введіть імʼя' },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          rules={[
            { type: 'email', message: 'Некоректний email' },
            { required: true, message: 'Будь ласка, введіть email' },
          ]}
          name="email"
          label="Email"
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          name="role"
          label="Роль"
          rules={[{ required: true, message: 'Оберіть, будь ласка, роль' }]}
        >
          <Select>
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>
        <Form.Item valuePropName="checked" name="active">
          <Checkbox>Активний</Checkbox>
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserDataForm
