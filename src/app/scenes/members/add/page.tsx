'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { MainContainerWithTitle } from '../../../globals/components/global-components'

export default function MembersScene (): JSX.Element {
  const router = useRouter()
  // const { query: { id } } = router

  return (
    <MainContainerWithTitle title='Participants' handleBackButtonClick={() => { router.push('/') }}>
      <p>No page for id</p>
    </MainContainerWithTitle>
  )
}
