import { MultiGenreSelect } from '@/components/shared/multi-genre-select'
import { createFileRoute, useLocation, useNavigate } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { MultiMovieSelect } from '@/components/shared/multi-movie-select'
import { useGetMovies } from '@/features/genres/hooks/use-get-movies'
import { useFavoriteGenres } from '@/features/genres/hooks/use-favorite-genres'
import { useFavoriteMovies } from '@/features/genres/hooks/use-favorite-movies'
import { useGetFavoriteGenres } from '@/features/genres/hooks/use-get-favorite-genres'
import { useGetGenres } from '@/features/genres/hooks/use-get-genres'
import { useGetBoard } from '@/features/boards/hooks/use-get-board'

export const Route = createFileRoute('/(auth)/_auth/select-genres')({
  component: SelectGenresPage,
})

function SelectGenresPage() {
  const { data: genreOptions, isLoading: isLoadingGenres } = useGetGenres();
  const { data: movieOptions, isLoading: isLoadingMovies } = useGetMovies();
  const [genres, setGenres] = useState<number[]>([]);
  const [movies, setMovies] = useState<number[]>([]);
  const { mutate: setFavoriteGenres } = useFavoriteGenres();
  const { mutate: setFavoriteMovies } = useFavoriteMovies();
  const { data: favoriteGenres, isLoading: isFavoriteGenresLoading } = useGetFavoriteGenres();
  const { data: boards, isLoading: isLoadingBoards } = useGetBoard();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(!isFavoriteGenresLoading && favoriteGenres?.filter(value => value !== null).length === 0) {
      navigate({ to: "/select-genres" });
    }
  }, [location])

  function handleSelect(value: number[]) {
      setGenres(value);
  }

  function handleSelectMovies(value: number[]) {
    setMovies(value);
  }

  function onSubmit() {
    setFavoriteGenres(genres, {
      onSuccess: (response) => {
        setFavoriteMovies(movies, {
          onSuccess: () => {
            const firstGenre: string = response.data[0];
            navigate({ to: genreOptions ? `/message-board/${boards?.find((board) => board.name === firstGenre)?.id || 0}` : "/" });
          }
        });
      }
    });
  }

  if(isLoadingGenres || isLoadingMovies || isLoadingBoards) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[40em] bg-card-green/90 border-border-green text-text-light">
        <CardHeader>
          <CardTitle className="text-2xl text-text-bright">Welcome to CineMatch!</CardTitle>
          <CardDescription className='pl-1 text-button-hover'>To get started, select your three favorite movie genres.</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-6'>
          <div className="flex flex-col gap-4">
            
            {
              genreOptions ? 
                <MultiGenreSelect values={ genres } onSelect={ handleSelect } options={ genreOptions } maxLimit={ 3 } label="genres" />
              : "No Genres Found"
            }
          </div>
          
          { genres.length === 3 || genreOptions?.length === genres.length ?
              <div className="flex flex-col gap-4 hidden">
                <CardDescription className='text-button-hover'>And select your top five favorite movies!</CardDescription>
                {
                  movieOptions ? 
                    <MultiMovieSelect values={ movies } onSelect={ handleSelectMovies } options={ movieOptions } maxLimit={ 5 } label="movies" />
                  : "No Movies Found"
                }
              </div>
            : "" 
          }
        </CardContent>
        <CardFooter>
          <Button 
            onClick={ onSubmit } 
            disabled={ genres.length !== 3 }
            className='cursor-pointer w-[100%] bg-button text-card-green2 hover:bg-text-light disabled:bg-bg-green'
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}