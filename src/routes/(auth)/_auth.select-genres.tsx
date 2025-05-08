import { MultiSelect } from '@/components/shared/multi-select'
import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from 'react'


export const Route = createFileRoute('/(auth)/_auth/select-genres')({
  component: SelectGenresPage,
})

const options = [
  "Action",
  "Adventure",
  "Animation",
  "Anime",
  "Comedy",
]

function SelectGenresPage() {
  const [genres, setGenres] = useState<string[]>([]);

  function handleSelect(value: string[]) {
      setGenres(value);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[30em]">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to CineMatch!</CardTitle>
          <CardDescription>To get started, select your three favorite movie genres.</CardDescription>
        </CardHeader>
        <CardContent>
          <MultiSelect values={ genres } onSelect={ handleSelect } options={ options } maxLimit={ 3 } label="genres" />
        </CardContent>
      </Card>
    </div>
  )
}