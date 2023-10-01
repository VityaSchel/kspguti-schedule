import { ThemeSwitcher } from '@/features/theme-switch'
import { Button } from '@/shadcn/ui/button'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cx from 'classnames'

export function NavBar() {
  const { theme } = useTheme()

  return (
    <header className="w-full p-2">
      <nav className={cx('rounded-lg p-2 w-full flex justify-between', { 'bg-slate-200': theme === 'light', 'bg-slate-900': theme === 'dark' })}>
        <ul className="flex gap-2">
          <NavBarItem url="/ps7">ПС-7</NavBarItem>
          <NavBarItem url="/pks35k">ПКС-35к</NavBarItem>
        </ul>
        <ThemeSwitcher />
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
        <Button tabIndex={-1} variant={isActive ? 'default' : 'outline'}>{children}</Button>
      </Link>
    </li>
  )
}