import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/ui/dialog'
import { teachers } from '@/shared/data/teachers'
import { Lesson } from '@/shared/model/lesson'
import Link from 'next/link'
import { BiLink } from 'react-icons/bi'

export function ResourcesDialog({ open, onClose, teacherName, resources }: {
  open: boolean
  onClose: () => any
  teacherName?: string
  resources: Lesson['resources']
}) {
  const teacherPronouns = teachers.find(t => t.name === teacherName)?.pronouns

  return (
    <Dialog open={open} onOpenChange={isOpen => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Материалы к уроку</DialogTitle>
          {teacherName && (
            <DialogDescription>
              {teacherName} {
                teacherPronouns === 'she'
                  ? 'поделилась'
                  : teacherPronouns === 'he'
                    ? 'поделился'
                    : teacherPronouns === 'bitch'
                      ? '(тварь) поделилась'
                      : 'поделилась(-ся)'
              } материалами к этому уроку.
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {resources.map((resource, i) => <Resource resource={resource} key={i} />)}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Resource({ resource }: {
  resource: Lesson['resources'][number]
}) {
  if(resource.type === 'link') {
    return (
      <div className="flex items-center gap-4">
        <BiLink />
        <Link href={resource.url} className='whitespace-pre-wrap' target='_blank' rel='nofollower noreferrer'>
          {resource.title}
        </Link>
      </div>
    )
  }
}