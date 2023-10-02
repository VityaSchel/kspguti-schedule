import { Button } from '@/shadcn/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shadcn/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shadcn/ui/avatar'
import { Badge } from '@/shadcn/ui/badge'
import { teachers } from '@/shared/data/teachers'
import { Lesson as LessonType } from '@/shared/model/lesson'
import React from 'react'
import { MdSchool } from 'react-icons/md'
import { AiOutlineFolderView } from 'react-icons/ai'
import { BsFillGeoAltFill } from 'react-icons/bs'
import { RiGroup2Fill } from 'react-icons/ri'
import { ResourcesDialog } from '@/widgets/schedule/resources-dialog'

export function Lesson({ lesson, width = 350 }: {
  lesson: LessonType
  width: number
}) {
  const [resourcesDialogOpened, setResourcesDialogOpened] = React.useState(false)

  const hasTeacher = 'teacher' in lesson && lesson.teacher
  const teacherObj = hasTeacher ? teachers.find(t => t.name === lesson.teacher) : null
  
  const hasPlace = 'place' in lesson && lesson.place

  const isFallbackDiscipline = 'fallbackDiscipline' in lesson && lesson.fallbackDiscipline

  const getTeacherPhoto = (url?: string) => {
    if(url) {
      try {
        const filename = decodeURIComponent(new URL(url).pathname.split('/').pop()!)
        return `/teachers/${filename}`
      } catch(e) {
        console.error(e)
        return null
      }
    } else {
      return null
    }
  }

  const fallbackTeacherName = () => {
    if (!hasTeacher || !lesson.teacher) return ''
    const [, firstName, middleName] = lesson.teacher.split(' ')
    return firstName.at(0)! + middleName.at(0)!
  }

  const handleOpenResources = () => {
    setResourcesDialogOpened(true)
  }

  return (
    <Card className={`w-full ${width === 450 ? 'md:w-[450px] md:min-w-[450px] md:max-w-[450px]' : 'md:w-[350px] md:min-w-[350px] md:max-w-[350px]'} flex flex-col relative overflow-hidden snap-start scroll-ml-16 shrink-0`}> 
      {lesson.isChange && <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#ffc60026] to-[#95620026] pointer-events-none'></div>}
      <CardHeader>
        <div className='flex gap-4'>
          {hasTeacher ? (
            <Avatar>
              <AvatarImage 
                src={getTeacherPhoto(teacherObj?.picture)!} 
                alt={lesson.teacher} 
                title={lesson.teacher} 
              />
              <AvatarFallback title={lesson.teacher}>
                {fallbackTeacherName()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar>
              <AvatarFallback><MdSchool /></AvatarFallback>
            </Avatar>
          )}
          <div className='flex flex-col gap-1'>
            {'subject' in lesson && <CardTitle className='hyphens-auto'>{lesson.subject}</CardTitle>}
            <CardDescription>
              {lesson.time.start} - {lesson.time.end}{
              }{lesson.time.hint && <span className='font-bold'>&nbsp;({lesson.time.hint})</span>}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {lesson.type && <><Badge>{lesson.type}</Badge>{' '}&nbsp;</>}
        {isFallbackDiscipline && (
          <span className='leading-relaxed hyphens-auto block'>{lesson.fallbackDiscipline}</span>
        )}
        {lesson.topic ? (
          <span className='leading-relaxed hyphens-auto'>{lesson.topic}</span>
        ) : (
          !isFallbackDiscipline  && <span className='text-border font-semibold'>Нет описания пары</span>
        )}
      </CardContent>
      {(Boolean(lesson.resources.length) || hasPlace) && (
        <CardFooter className="flex justify-between mt-auto">
          {('place' in lesson && lesson.place) ? (
            <div className='flex flex-col text-muted-foreground text-xs'>
              <span className='flex items-center gap-2'><BsFillGeoAltFill /> {lesson.place.address}</span>
              <span className='font-bold flex items-center gap-2'><RiGroup2Fill /> {lesson.place.classroom}</span>
            </div>
          ) : <span />}
          {Boolean(lesson.resources.length) && (
            <Button onClick={handleOpenResources}><AiOutlineFolderView />&nbsp;Материалы</Button>
          )}
        </CardFooter>
      )}
      <ResourcesDialog 
        open={resourcesDialogOpened} 
        onClose={() => setResourcesDialogOpened(false)}
        teacherName={('teacher' in lesson && lesson.teacher) ? lesson.teacher : undefined}
        resources={lesson.resources} 
      />
    </Card>
  )
}