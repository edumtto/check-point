import React, { useState } from 'react'
import type { Member } from './models/member'

export interface AppContextType {
  members: Member[]
  updateMembers: (members: Member[]) => void
}

export const AppContext = React.createContext<AppContextType>({
  members: [],
  updateMembers: (members: Member[]) => {}
})

export const ContextProvider = (props: any): React.JSX.Element => {
  const [members, setMembers] = useState<Member[]>([])

  const updateMembers = (members: Member[]): void => {
    setMembers(members)
  }

  return (
    <AppContext.Provider value={{ members, updateMembers }}>
    {props.children}
    </AppContext.Provider>
  )
}
