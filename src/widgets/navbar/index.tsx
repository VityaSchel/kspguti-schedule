import { AddGroupButton } from '@/features/add-group'
import { ThemeSwitcher } from '@/features/theme-switch'
import { Button } from '@/shadcn/ui/button'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaGithub } from 'react-icons/fa'

export function NavBar() {
  const { resolvedTheme, theme } = useTheme()

  return (
    <header className="w-full p-2">
      <nav className={`rounded-lg p-2 w-full flex justify-between ${(resolvedTheme || theme) === 'light' ? 'bg-slate-200' : ''} ${(resolvedTheme || theme) === 'dark' ? 'bg-slate-900' : ''}`}>
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