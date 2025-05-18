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
import { Checkbox } from "@/components/ui/checkbox"


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
      <DialogContent className="bg-card-green2/95 border-border-green text-text-light min-w-fit [&>button]:cursor-pointer [&>button]:focus:ring-0 [&>button]:focus:ring-offset-0 [&>button]:hover:bg-focus [&>button]:p-1">
        <DialogHeader>
          <DialogTitle className="text-3xl text-bright">Update your Post</DialogTitle>
          <DialogDescription className="ml-1 text-button-hover">Update your post details below:</DialogDescription>
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
                    <Input className="text-text-bright border-border-green focus-visible:ring-0 focus-visible:border-text-light bg-bg-green2 placeholder:text-focus selection:bg-focus caret-focus"
                    placeholder="title*" {...field} />
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
                    <AutosizeTextarea {...field} placeholder="Write content here..." maxHeight={ 200 }
                    className="field-sizing-fixed resize-none text-text-bright border-border-green focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-text-light bg-bg-green2 placeholder:text-focus selection:bg-focus caret-focus"  />
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
                      className="pl-0 border-0 file:bg-button file:rounded-full file:px-2 file:cursor-pointer file:mr-2 file:align-middle"
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
                    <Checkbox
                      checked={ value > 0}
                      onCheckedChange={onChange}
                      className="size-4 bg-bg-green2 border-border-green data-[state=checked]:bg-button data-[state=checked]:text-card-green text-red-500 cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-button hover:bg-text-light text-card-green cursor-pointer">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
