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

const messageBoards = [
  { id: 1, genre: "Action" },
  { id: 2, genre: "Adventure" },
  { id: 3, genre: "Comedy" },
]

export const Route = createFileRoute('/(auth)/_auth/new-post')({
  component: RouteComponent,
})

function RouteComponent() {
    const form = useForm<CreatePostSchemaType>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      content: "",
      hasSpoiler: false,
      image: undefined
    },
  })

  function onSubmit(values: any) {
    console.log("submit");
    console.log(values);
  }

  return (
    <div className="flex justify-center h-screen">
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
                  <Select onValueChange={ field.onChange } value={ String(field.value) }>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="message board*" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        messageBoards.map((value) => (
                          <SelectItem value={ String(value.id) } key={ value.genre }>{ value.genre }</SelectItem>
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
            name="content"
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
