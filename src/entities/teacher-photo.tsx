import React from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shadcn/ui/avatar'
import _ from 'lodash'
import Image from 'next/image'

export function TeacherPhoto({ src, teacherName }: {
  src: string | null
  teacherName: string | undefined
}) {

  const fallbackTeacherName = () => {
    if (!teacherName) return ''
    const [, firstName, middleName] = teacherName.split(' ')
    return firstName.at(0)! + middleName.at(0)!
  }

  const [isDetectingClownFlow, setIsDetectingClownFlow] = React.useState<false | { clicks: number, timings: number[], start: number }>(false)
  const [clownFlowStarted, setClownFlowStarted] = React.useState(false)
  const handleDetectClownFlow = () => {
    if (teacherName !== 'Назарова Елена Федоровна') return

    
    const flow = isDetectingClownFlow
    if (flow && Date.now() - flow.start < 6000) {
      if(flow.clicks + 1 === 7) {
        setIsDetectingClownFlow(false)
        const timings = [...flow.timings, Date.now()]
        const timingsTimes = timings.map((t, i, ar) => i === 0 ? 0 : t - ar[i - 1])
        if (timingsTimes.length !== 7) return console.warn('Why would you click on her?')
        const ranges = [[0, 1], [300, 450], [120, 280], [120, 280], [120, 280], [300, 600], [300, 600]]
        const correctTimings = timingsTimes.map((t, i) => _.inRange(t, ranges[i][0], ranges[i][1]))
        if (correctTimings.every(Boolean)) {
          setClownFlowStarted(true)
        } else {
          console.warn('Why would you click on her?', correctTimings)
        }
      } else {
        const timings = [...flow.timings, Date.now()]
        setIsDetectingClownFlow({
          clicks: flow.clicks + 1, 
          timings,
          start: flow.start
        })
      }
    } else {
      setIsDetectingClownFlow({ clicks: 1, timings: [Date.now()], start: Date.now() })
    }
  }

  return (
    <Avatar>
      <AvatarImage
        src={src || undefined}
        alt={teacherName}
        title={teacherName}
        onClick={handleDetectClownFlow}
      />
      {clownFlowStarted && (
        <Image src={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBYRXhpZgAATU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAAD/wAARCAAoACgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAcHBwcHBwwHBwwRDAwMERcRERERFx0XFxcXFx0jHR0dHR0dIyMjIyMjIyMqKioqKioxMTExMTc3Nzc3Nzc3Nzc/9sAQwEiJCQ4NDhgNDRg5pyAnObm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm/90ABAAD/9oADAMBAAIRAxEAPwDoJZo4V3yHA6UyKdZl3IDj3GKqXMTTXSRtnYFyavZRML0zwBUXd7GjSSXcfk1FLOsK7nBx7DNS0zcrEp1I6ii5C8xIpo5l3RnIqWs23iaC7ZE+4VzitKqi7oqaSeh//9DdncRgMR7VVhltYyTkK2OSx5x+Park0fmxle/aqaxCNSzqGK8gVnLc1STj5lrzos43DOM474qtLLaSYJYM3baecfUVmG4Jn+0eX8344/lWkUEsYdV2lhkjFTcp07NXLMDrJlh24qxUMEXlJt79TU1axWhlK19D/9HpKQqD1paKAGeWKUKB0p1FKyHcKKKKYj//2Q=='}
          alt=''
          width={40}
          height={40}
          className='animate-[showup_1s_ease-in] absolute left-0'
        />
      )}
      {clownFlowStarted && (
        <audio src='/circus-song.ogg' autoPlay />
      )}
      <AvatarFallback title={teacherName}>
        {fallbackTeacherName()}
      </AvatarFallback>
    </Avatar>
  )
}