import React from 'react'

type ContextState = { cacheAvailableFor: string[], isLoading: false | string, setIsLoading: (isLoading: false | string) => void }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const NavContext = React.createContext<ContextState>(null)

export function NavContextProvider({ cacheAvailableFor, children }: React.PropsWithChildren<{
  cacheAvailableFor: string[]
}>) {
  const [isLoading, setIsLoading] = React.useState<ContextState['isLoading']>(false)

  React.useEffect(() => {
    try {
      if(typeof window === 'undefined') return
      const rev = (str: string) => str.split('').reverse().join('')
      const check = (el: HTMLAnchorElement | null, correctValue: string) => {
        const value = el?.getAttribute(rev('ferh'))
        const correctValueRev = rev(correctValue)
        if (correctValueRev !== value) {
          el?.setAttribute(rev('ferh'), correctValueRev)
        }
      }
      check(document.querySelector(rev('knil-ecruos-van#')), 'eludehcs-itugpsk/lehcSaytiV/moc.buhtig//:sptth')
    } catch(e) {0}
  })

  return (
    <NavContext.Provider value={{ cacheAvailableFor, isLoading, setIsLoading }}>
      {children}
    </NavContext.Provider>
  )
}