"use client"

import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AutosizeTextarea } from "@/components/ui/autosize-textarea"
import { CreatePostSchema, type CreatePostSchemaType } from "@/features/posts/schemas/create-post-schema"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCreatePost } from '@/features/posts/hooks/use-create-post'
import { useGetBoard } from '@/features/boards/hooks/use-get-board'
import { Loader2 } from 'lucide-react'
import { useGetFavoriteGenres } from '@/features/genres/hooks/use-get-favorite-genres'
import { Checkbox } from '@/components/ui/checkbox'

export const Route = createFileRoute('/(auth)/_auth/new-post')({
  component: NewPostComponent,
})

export function NewPostComponent() {
  const { mutate: createPost } = useCreatePost();
  const { data: favoriteGenres, isLoading: isFavoriteGenresLoading } = useGetFavoriteGenres();
  const { data: messageBoards, isLoading } = useGetBoard();

  const form = useForm<CreatePostSchemaType>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      text: "",
      hasSpoiler: 0,
      image: undefined,
      boardId: undefined
    },
  })

  if (isLoading || isFavoriteGenresLoading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  if (!messageBoards) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-xl">Cannot create post because no message boards were found.</h1>
      </div>
    )
  }


  function onSubmit(values: any) {
    createPost(values);
  }

  return (
    <div data-testid="new-post-component" className="flex justify-center mt-[56px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[30em] bg-card-green/90 p-5 rounded-lg border-1 border-border-green text-text-light">
          <h1 className="text-2xl mb-4 font-medium">Create Post</h1>
          <FormField
            control={form.control}
            name="boardId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select a Message Board</FormLabel>
                <FormControl>
                  <Select onValueChange={ (field.onChange) } value={ field.value ? String(field.value) : "" }>
                    <SelectTrigger data-testid="new-post-board-select" className="w-[180px] text-text-bright border-border-green focus-visible:ring-0 focus-visible:border-text-light bg-bg-green2 selection:bg-focus">
                      <SelectValue placeholder="Message Board*" />
                    </SelectTrigger>
                    <SelectContent className='bg-card-green3 border-border-green text-text-light'>
                      {
                        messageBoards.map((value) => (
                          (favoriteGenres as string[])?.includes(value.name) ?
                            <SelectItem value={ String(value.id) } key={ value.name }
                              className='focus:bg-button'>
                                { value.name }
                            </SelectItem>
                          :
                            <div className='hidden' key={ value.name }></div>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input data-testid="title-input" placeholder="title*" {...field}
                    className='text-text-bright border-border-green focus-visible:ring-0 focus-visible:border-text-light bg-bg-green2 placeholder:text-focus selection:bg-focus caret-focus'/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <AutosizeTextarea data-testid="new-post-text" {...field} placeholder="content" maxHeight={ 200 }
                    className="field-sizing-fixed resize-none text-text-bright border-border-green focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-text-light bg-bg-green2 placeholder:text-focus selection:bg-focus caret-focus"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, ref, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="image" 
                    accept="image/*" 
                    type="file"
                    ref={ ref }
                    { ...fieldProps }
                    onChange={(e) => {
                      onChange(e.target.files?.[0]);
                    }}
                    className='pl-0 border-0 file:bg-button file:rounded-full file:px-2 file:cursor-pointer file:mr-2 file:align-middle'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasSpoiler"
            render={({ field: { value, ref, onChange, ...fieldProps } }) => (
              <FormItem className="flex flex-row items-center gap-4">
                <FormLabel>Contains Spoiler?</FormLabel>
                <FormControl>
                  <Checkbox
                      data-testid="has-spoiler-input"
                      checked={ value > 0}
                      { ...fieldProps }
                      onCheckedChange={onChange}
                      className="size-4 bg-bg-green2 border-border-green data-[state=checked]:bg-button data-[state=checked]:text-card-green text-red-500 cursor-pointer"
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button data-testid="new-post-submit-button" type="submit" className="bg-button hover:bg-text-light text-card-green cursor-pointer">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
