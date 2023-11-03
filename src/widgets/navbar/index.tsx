import React from 'react'
import { AddGroupButton } from '@/features/add-group'
import { ThemeSwitcher } from '@/features/theme-switch'
import { Button } from '@/shadcn/ui/button'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaGithub } from 'react-icons/fa'
import cx from 'classnames'
import { NavContext, NavContextProvider } from '@/shared/context/nav-context'
import { groups } from '@/shared/data/groups'
import { useComponentSize } from 'react-use-size'

export function NavBar({ cacheAvailableFor }: {
  cacheAvailableFor: string[]
}) {
  const { group } = useRouter().query
  const { resolvedTheme } = useTheme()
  const [schemeTheme, setSchemeTheme] = React.useState<string>()
  const navRef = React.useRef<HTMLDivElement>(null)

  const getSchemeTheme = () => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('theme') || document.querySelector('html')!.style.colorScheme
    } else 
      return 'light'
  }

  React.useEffect(() => {
    setSchemeTheme(getSchemeTheme())
  }, [])

  const theme = resolvedTheme || schemeTheme

  React.useEffect(() => {
    if(theme === 'light') {
      navRef.current?.classList.add('bg-slate-200')
      navRef.current?.classList.remove('bg-slate-900')
    } else {
      navRef.current?.classList.add('bg-slate-900')
      navRef.current?.classList.remove('bg-slate-200')
    }
  }, [theme])

  const [gradientsOffsets, setGradientsOffsets] = React.useState<{ left: number, right: number }>({ left: 0, right: 0 })
  const { ref: navLinksRef, width: navWidth } = useComponentSize()
  const MAX_WIDTH = 24
  const navLinksMenuRef = React.useRef<HTMLUListElement>(null)
  const linksItemsRefs = React.useRef<HTMLLIElement[]>([])

  const handleScroll: React.UIEventHandler<HTMLUListElement> = (e) => {
    setGradientsOffsets({
      left: Math.max(Math.min(e.currentTarget.scrollLeft, MAX_WIDTH), 0),
      right: Math.max(Math.min(e.currentTarget.scrollWidth - navWidth - e.currentTarget.scrollLeft, MAX_WIDTH), 0),
    })
  }

  React.useEffect(() => {
    if (!navLinksMenuRef.current) return
    setGradientsOffsets({
      left: gradientsOffsets.left,
      right: Math.min(navLinksMenuRef.current.scrollWidth - navWidth, MAX_WIDTH),
    })
  }, [navWidth, navLinksMenuRef])

  React.useEffect(() => {
    if (!navLinksMenuRef.current) return
    const index = Object.keys(groups).findIndex(groupLink => String(group) === groupLink)
    navLinksMenuRef.current.scrollTo({ left: linksItemsRefs.current[index].offsetLeft })
  }, [group, linksItemsRefs, navLinksMenuRef])

  return (
    <NavContextProvider cacheAvailableFor={cacheAvailableFor}>
      <header className="sticky top-0 w-full p-2 bg-background z-[1] pb-0 mb-2 shadow-header">
        <nav className={cx('rounded-xl p-2 w-full flex justify-between gap-4', { 'bg-slate-200': theme === 'light', 'bg-slate-900': theme === 'dark' })} ref={navRef}>
          <div className='overflow-hidden relative flex-1' ref={navLinksRef}>
            <span 
              className='block h-full w-6 bg-gradient-to-r from-slate-900 to-transparent absolute left-0 pointer-events-none' 
              style={{ width: gradientsOffsets.left }}
            />
            <ul 
              className="overflow-auto rounded-lg flex gap-2 [&>*]:shrink-0" 
              onScroll={handleScroll} 
              ref={navLinksMenuRef}
            >
              {Object.entries(groups).map(([groupID, [groupNumber, groupName]], i) => (
                <NavBarItem url={'/' + groupID} key={groupNumber} ref={ref => linksItemsRefs.current[i] = ref}>{groupName}</NavBarItem>
              ))}
              <AddGroupButton />
            </ul>
            <span 
              className='block h-full w-6 bg-gradient-to-l from-slate-900 to-transparent absolute right-0 top-0 pointer-events-none' 
              style={{ width: gradientsOffsets.right }}
            />
          </div>
          <div className='flex gap-1 min-[500px]:gap-2'>
            <Link href='https://github.com/VityaSchel/kspguti-schedule' target='_blank' rel='nofollower noreferrer'>
              <Button variant='outline' size='icon' tabIndex={-1}>
                <FaGithub />
              </Button>
            </Link>
            <ThemeSwitcher />
          </div>
        </nav>
      </header>
    </NavContextProvider>
  )
}

const NavBarItem = React.forwardRef<any, React.PropsWithChildren<{ url: string }>>(({ url, children }, ref) => {
  const router = useRouter()
  const isActive = router.asPath === url
  const { cacheAvailableFor, isLoading, setIsLoading } = React.useContext(NavContext)

  const handleStartLoading = async () => {
    let isLoaded = false

    const loadEnd = () => {
      isLoaded = true
      setIsLoading(false)
    }

    router.events.on('routeChangeComplete', loadEnd)
    router.events.on('routeChangeError', loadEnd)

    if (cacheAvailableFor.includes(url.slice(1))) {
      await new Promise(resolve => setTimeout(resolve, 500))
      if(isLoaded) return
    }
    setIsLoading(url)

    return () => {
      router.events.off('routeChangeComplete', loadEnd)
      router.events.off('routeChangeError', loadEnd)
    }
  }

  const button = (
    <Button 
      tabIndex={-1} variant={isActive ? 'default' : 'secondary'} 
      disabled={Boolean(isLoading)}
      loading={isLoading === url}
      ref={ref}
    >
      {children}
    </Button>
  )

  return (
    <li>
      {isLoading ? (
        button
      ) : (
        <Link href={url} onClick={handleStartLoading}>
          {button}
        </Link>
      )}
    </li>
  )
})

NavBarItem.displayName = 'NavBarItem'