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
import { teachers } from '@/shared/data/teachers'
import { Lesson as LessonType } from '@/shared/model/lesson'

export function Lesson({ lesson }: {
  lesson: LessonType
}) {
  const teacherObj = lesson.teacher ? teachers.find(t => t.name === lesson.teacher) : null

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

  return (
    <Card className="w-[350px]"> 
      <div>
        <Avatar>
          <AvatarImage src={getTeacherPhoto(teacherObj?.picture)} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar></Avatar>
        <CardHeader>
          <CardTitle>{lesson.subject}</CardTitle>
          <CardDescription>{lesson.teacher}</CardDescription>
          <CardDescription>{lesson.place?.classroom}</CardDescription>
        </CardHeader>
      </div>
      <CardContent>
        
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}