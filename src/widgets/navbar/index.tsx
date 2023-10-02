import React from 'react'
import { AddGroupButton } from '@/features/add-group'
import { ThemeSwitcher } from '@/features/theme-switch'
import { Button } from '@/shadcn/ui/button'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaGithub } from 'react-icons/fa'
import cx from 'classnames'

export function NavBar() {
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
    console.log(resolvedTheme, getSchemeTheme())
    setSchemeTheme(getSchemeTheme())
  }, [])

  const theme = resolvedTheme || schemeTheme
  console.log('theme', theme, cx('rounded-lg p-2 w-full flex justify-between', { 'bg-slate-200': theme === 'light', 'bg-slate-900': theme === 'dark' }))

  React.useEffect(() => {
    if(theme === 'light') {
      navRef.current?.classList.add('bg-slate-200')
      navRef.current?.classList.remove('bg-slate-900')
    } else {
      navRef.current?.classList.add('bg-slate-900')
      navRef.current?.classList.remove('bg-slate-200')
    }
  }, [theme])

  return (
    <header className="w-full p-2">
      <nav className={cx('rounded-lg p-2 w-full flex justify-between', { 'bg-slate-200': theme === 'light', 'bg-slate-900': theme === 'dark' })} ref={navRef}>
        <ul className="flex gap-2">
          <NavBarItem url="/ps7">ПС-7</NavBarItem>
          <NavBarItem url="/pks35k">ПКС-35к</NavBarItem>
          <AddGroupButton />
        </ul>
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
  )
}

function NavBarItem({ url, children }: React.PropsWithChildren<{
  url: string
}>) {
  const router = useRouter()
  const isActive = router.asPath === url

  return (
    <li>
      <Link href={url}>
        <Button tabIndex={-1} variant={isActive ? 'default' : 'secondary'}>{children}</Button>
      </Link>
    </li>
  )
}