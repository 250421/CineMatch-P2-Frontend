"use client"

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
import { useUpdatePost } from '@/features/posts/hooks/use-update-post'
import { Post } from "@/features/posts/models/post"
import { UpdatePostSchema, UpdatePostSchemaType } from "@/features/posts/schemas/update-post-schema"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"


interface UpdatePostDialogProps {
  open: boolean;
  setOpen: (open: boolean, post: Post) => void;
  initialForm: Post;
}

export const UpdatePostDialog = ({ open, setOpen, initialForm }: UpdatePostDialogProps) => {
    const { mutate: updatePost } = useUpdatePost();
  const form = useForm<UpdatePostSchemaType>({
    resolver: zodResolver(UpdatePostSchema),
    values: {
      id: initialForm.id,
      title: initialForm.title,
      text: initialForm.text,
      image: undefined, //image: initialForm !== null ? initialForm.image : undefined,
      has_spoiler: initialForm.has_spoiler,
      hasSpoiler: initialForm.has_spoiler
    }
  })

  function onSubmit(values: any) {
    updatePost(values, {
      onSuccess: (response) => {
        setOpen(false, response.data);
      }
    });
  }

  return (
    <Dialog open={ open } onOpenChange={ (open) => setOpen(open, initialForm) }>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update your Post</DialogTitle>
          <DialogDescription>Update your post details below:</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[30em]">
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
              name="has_spoiler"
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
                      checked={ value > 0 }
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
      </DialogContent>
    </Dialog>
  )
}
