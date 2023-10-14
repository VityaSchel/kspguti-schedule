import React from 'react'

type ContextState = { cacheAvailableFor: string[], isLoading: false | string, setIsLoading: (isLoading: false | string) => void }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const NavContext = React.createContext<ContextState>(null)

export function NavContextProvider({ cacheAvailableFor, children }: React.PropsWithChildren<{
  cacheAvailableFor: string[]
}>) {
  const [isLoading, setIsLoading] = React.useState<ContextState['isLoading']>(false)

  return (
    <NavContext.Provider value={{ cacheAvailableFor, isLoading, setIsLoading }}>
      {children}
    </NavContext.Provider>
  )
}