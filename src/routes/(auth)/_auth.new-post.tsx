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

export const Route = createFileRoute('/(auth)/_auth/new-post')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate: createPost } = useCreatePost();
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

  if (isLoading) {
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
    <div className="flex justify-center h-screen mt-[56px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[30em]">
          <h1 className="text-xl mb-4">Create Post</h1>
          <FormField
            control={form.control}
            name="boardId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select a Message Board</FormLabel>
                <FormControl>
                  <Select onValueChange={ (field.onChange) } value={ field.value ? String(field.value) : "" }>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="message board*" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        messageBoards.map((value) => (
                          <SelectItem value={ String(value.id) } key={ value.name }>{ value.name }</SelectItem>
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
                  <Input placeholder="title*" {...field} />
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
                  <AutosizeTextarea {...field} placeholder="content" maxHeight={ 200 } className="resize-none"  />
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
                    disabled
                    placeholder="image" 
                    accept="image/*" 
                    type="file"
                    ref={ ref }
                    { ...fieldProps }
                    onChange={(e) => {
                      onChange(e.target.files?.[0]);
                    }}
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
                  <Input 
                    type="checkbox"
                    ref={ ref }
                    { ...fieldProps }
                    onChange={() => {
                      onChange(!value);
                    }}
                    className="size-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
