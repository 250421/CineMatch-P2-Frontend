import { MultiSelect } from '@/components/shared/multi-select'
import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from 'react'
import { Button } from '@/components/ui/button'

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

const movieOptions = [
  "The Matrix",
  "The Dark Knight",
  "Fight Club",
  "Jurassic Park",
  "Back to the Future",
  "The Shawshank Redemption",
  "The Social Network",
  "Star Wars: Episode IV - A New Hope",
  "The Lord of the Rings: The Return of the King",
  "The Lord of the Rings: The Two Towers",
  "The Avengers",
  "Guardians of the Galaxy",
  "Iron Man"
]

function SelectGenresPage() {
  const [genres, setGenres] = useState<string[]>([]);
  const [movies, setMovies] = useState<string[]>([]);

  function handleSelect(value: string[]) {
      setGenres(value);
  }

  function handleSelectMovies(value: string[]) {
    setMovies(value);
}

function onSubmit() {
  console.log(genres);
  console.log(movies);
}

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[40em]">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to CineMatch!</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-6'>
          <div className="flex flex-col gap-4">
            <CardDescription>To get started, select your three favorite movie genres.</CardDescription>
            <MultiSelect values={ genres } onSelect={ handleSelect } options={ options } maxLimit={ 3 } label="genres" />
          </div>
          
          { genres.length === 3 ?
              <div className="flex flex-col gap-4">
                <CardDescription>And select your top five favorite movies!</CardDescription>
                <MultiSelect values={ movies } onSelect={ handleSelectMovies } options={ movieOptions } maxLimit={ 5 } label="movies" />
              </div>
            : "" }
        </CardContent>
        <CardFooter>
          <Button onClick={ onSubmit } className='w-[100%]' disabled={ (genres.length !== 3 || movies.length !== 5) }>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  )
}