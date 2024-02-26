'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { MainContainerWithTitle } from '../../../globals/components/global-components'
import { Input, Form, Select, Button, DatePicker } from 'antd'
const { Option } = Select

export default function MembersScene (): JSX.Element {
  const router = useRouter()
  // const { query: { id } } = router

  const firstName = (
    <Form.Item
      label='First name'
      name='firstname'
      rules={[
        {
          required: true,
          message: 'Please input your first name'
        }
      ]}
    >
      <Input />
    </Form.Item>
  )

  const middleName = (
    <Form.Item
      label='Middle name'
      name='middlename'
      rules={[
        {
          required: false,
          message: 'Please input your middle name'
        }
      ]}
    >
      <Input />
    </Form.Item>
  )

  const lastName = (
    <Form.Item
      label='Last name'
      name='lastname'
      rules={[
        {
          required: true,
          message: 'Please input your last name'
        }
      ]}
    >
      <Input />
    </Form.Item>
  )

  const birthday = (
    <Form.Item
      label='Birthday'
      name='birthday'
      rules={[
        {
          required: true,
          message: 'Please input your birthday name'
        }
      ]}
    >
      <DatePicker onChange={onChangeBirthday} />
    </Form.Item>
  )

  const gender = (
    <Form.Item
      name='gender'
      label='Gender'
      rules={[
        {
          required: true,
          message: 'Please select gender!'
        }
      ]}
    >
      <Select placeholder='Select your gender'>
        <Option value='male'>Male</Option>
        <Option value='female'>Female</Option>
        <Option value='other'>Other</Option>
      </Select>
    </Form.Item>
  )

  const email = (
    <Form.Item
      name='email'
      label='E-mail'
      rules={[
        {
          type: 'email',
          message: 'The input is not valid E-mail!'
        },
        {
          required: false,
          message: 'Please input your E-mail!'
        }
      ]}
    >
      <Input />
    </Form.Item>
  )

  const phone = (
    <Form.Item
      name='phone'
      label='Phone Number'
      rules={[
        {
          required: true,
          message: 'Please input your phone number!'
        }
      ]}
    >
      <Input
      placeholder='(000) 0000-0000'
      />
    </Form.Item>
  )

  const address = (
    <Form.Item
      label='Address'
      name='address'
      rules={[
        {
          required: true,
          message: 'Please input your address'
        }
      ]}
    >
      <Input placeholder='1234 Royal Way, Sacramento, CA' />
    </Form.Item>
  )

  const emmergencyContact = (
    <Form.Item
      label='Emmergency Contact'
      name='emmergencycontact'
      rules={[
        {
          required: true,
          message: 'Please input your emmergency contact'
        }
      ]}
    >
      <Input placeholder='John Smith, (000) 0000-0000, Husband' />
    </Form.Item>
  )

  return (
    <MainContainerWithTitle title='New Membership' handleBackButtonClick={() => { router.push('/') }}>
      <Form
        style={{ padding: 16 }}
        name='basic'
        labelWrap
        colon={false}
        labelCol={{
          span: 4
        }}
        wrapperCol={{
          span: 18
        }}
      >
        {firstName}
        {middleName}
        {lastName}
        {birthday}
        {gender}
        {address}
        {phone}
        {email}
        {emmergencyContact}

        <Form.Item label=' '>
          <Button type='primary' htmlType='submit'>Register</Button>
        </Form.Item>
      </Form>
    </MainContainerWithTitle>
  )

  function onChangeBirthday (): void {
    console.log('birthday')
  }
}
