import React from 'react'
import { Button } from '@/shadcn/ui/button'
import { MdAdd } from 'react-icons/md'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/ui/dialog'
import Link from 'next/link'
import Image from 'next/image'
import { BsTelegram } from 'react-icons/bs'
import { SlSocialVkontakte } from 'react-icons/sl'

export function AddGroupButton() {
  const [popupVisible, setPopupVisible] = React.useState(false)

  const handleOpenPopup = () => {
    setPopupVisible(true)
  }

  return (
    <>
      <Button variant='secondary' size='icon' onClick={handleOpenPopup}><MdAdd /></Button>
      <Popup open={popupVisible} onClose={() => setPopupVisible(false)} />
    </>
  )
}

function Popup({ open, onClose }: {
  open: boolean
  onClose: () => any
}) {
  return (
    <Dialog open={open} onOpenChange={isOpen => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Добавить группу</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Если вы хотите добавить свою группу на сайт, скиньтесь всей группой и задонатьте мне 500 ₽
        </DialogDescription>
        <DialogDescription>
          На сайте не только появится ваше расписание, но оно будет обновляться каждую неделю. А если во время парсинга произойдет ошибка — я сразу получу об этом уведомление в телеграм, потому что у меня настроен бот.
        </DialogDescription>
        <DialogDescription>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          Для меня добавить вашу группу это даже не одна строка кода, а одно нажатие клавиши, но я хочу чтобы этот сайт был доступен только самым лучшим и избранным, достойных престижа <img src={'/1925.png'} width={14} height={14} alt='' className='inline align-text-bottom' />
        </DialogDescription>
        <DialogFooter className='!justify-start !flex-row mt-3 gap-3'>
          <Link href='https://t.me/hlothdev'>
            <Button tabIndex={-1} className='gap-3'><BsTelegram /> Мой телеграм</Button>
          </Link>
          <Link href='https://vk.com/hloth'>
            <Button tabIndex={-1} className='gap-3'><SlSocialVkontakte /> Мой ВКонтакте</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}