'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MainContainerWithTitle } from '@/app/globals/components/global-components'
import { api } from '@/app/globals/api'
import { Input, Form, Select, Button, DatePicker, Result } from 'antd'
import { Member } from '@/app/globals/models/member'
const { Option } = Select

interface FormValues {
  firstname: string
  lastname: string
  address: string
  birthday: Date
  email: string
  emmergencycontact: string | null
  genderid: number
  phone: string | null
}

export default function MembersScene (): JSX.Element {
  const router = useRouter()
  const [form] = Form.useForm()
  const [isMemberAdded, setIsMemberAdded] = useState(false)

  let formValues: FormValues = {
    firstname: '',
    lastname: '',
    birthday: new Date(),
    address: '',
    email: '',
    emmergencycontact: null,
    genderid: 0,
    phone: null
  }

  const FirstNameInput = (
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
      <Input onChange={(event) => { formValues.firstname = event.target.value } }/>
    </Form.Item>
  )

  const LastNameInput = (
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
      <Input onChange={(event) => { formValues.lastname = event.target.value } }/>
    </Form.Item>
  )

  const BirthdayInput = (
    <Form.Item
      label='Birthday'
      name='birthday'
      rules={[
        {
          required: true,
          message: 'Please input your birthday'
        }
      ]}
    >
      <DatePicker onChange={(date, _) => { onChangeBirthday(date?.toDate()) }} />
    </Form.Item>
  )

  const GenderInput = (
    <Form.Item
      name='genderid'
      label='Gender'
      rules={[
        {
          required: true,
          message: 'Please select gender'
        }
      ]}
    >
      <Select placeholder='Select your gender' onChange={(value) => { formValues.genderid = value } }>
        <Option value='1'>Male</Option>
        <Option value='2'>Female</Option>
        <Option value='3'>Other</Option>
      </Select>
    </Form.Item>
  )

  const EmailInput = (
    <Form.Item
      name='email'
      label='E-mail'
      rules={[
        {
          type: 'email',
          message: 'The input is not valid E-mail'
        },
        {
          required: false,
          message: 'Please input your E-mail'
        }
      ]}
    >
      <Input onChange={(event) => { formValues.email = event.target.value } }/>
    </Form.Item>
  )

  const PhoneInput = (
    <Form.Item
      name='phone'
      label='Phone Number'
      rules={[
        {
          required: false,
          message: 'Please input your phone number'
        }
      ]}
    >
      <Input placeholder='(000) 0000-0000' onChange={(event) => { formValues.phone = event.target.value } }/>
    </Form.Item>
  )

  const AddressInput = (
    <Form.Item
      label='Address'
      name='address'
      rules={[
        {
          required: false,
          message: 'Please input your address'
        }
      ]}
    >
      <Input placeholder='1234 Royal Way, Sacramento, CA' onChange={(event) => { formValues.address = event.target.value } }/>
    </Form.Item>
  )

  const EmmergencyContactInput = (
    <Form.Item
      label='Emmergency Contact'
      name='emmergencycontact'
      rules={[
        {
          required: false,
          message: 'Please input your emmergency contact'
        }
      ]}
    >
      <Input placeholder='John Smith, (000) 0000-0000, Husband' onChange={(event) => { formValues.emmergencycontact = event.target.value } }/>
    </Form.Item>
  )

  const MemberForm =
    <Form
        form={form}
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
        onValuesChange={onValuesChange}
        hidden={isMemberAdded}
      >
        {FirstNameInput}
        {LastNameInput}
        {BirthdayInput}
        {GenderInput}
        {AddressInput}
        {PhoneInput}
        {EmailInput}
        {EmmergencyContactInput}

        <Form.Item label=' '>
          <Button type='primary' htmlType='submit' onClick={ onSubmit }>Register</Button>
        </Form.Item>
      </Form>

  const SuccessResult =
    <Result
      status='success'
      title='Member Successfully Registered'
      extra={[
        <Button key='close' onClick={close}>Close</Button>
      ]}
    />

  return (
    <MainContainerWithTitle title='New Membership' handleBackButtonClick={() => { router.back() }}>
      { isMemberAdded ? SuccessResult : MemberForm }
    </MainContainerWithTitle>
  )

  function onChangeBirthday (date: Date | undefined): void {
    if (date !== undefined) {
      formValues.birthday = date
    }
  }

  function onValuesChange (oldValues: any, newValues: any): void {
    formValues = newValues
  }

  function close (): void {
    router.back()
  }

  function onSubmit (): void {
    form.validateFields()
      .then(() => { registerNewMember() })
      .catch((error) => { console.log('Failed:', error) })
  }

  function registerNewMember (): void {
    const newMember = new Member(
      -1,
      formValues.firstname,
      formValues.lastname,
      formValues.genderid,
      formValues.address,
      formValues.email,
      formValues.birthday,
      new Date(),
      null
    )

    console.log(newMember)

    api.createMember(newMember)
      .then(() => {
        console.log('ok')
        setIsMemberAdded(true)
      })
      .catch((error) => {
        console.log('error')
        console.log(error)
      })
  }
}
