import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { type UseMutationResult } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface DeletePromptDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
  useDeleteMutate: UseMutationResult<any, Error, number, unknown>;
}

export const DeletePromptDialog = ({ open, setOpen, id, useDeleteMutate }: DeletePromptDialog) => {
  const { mutate, isPending } = useDeleteMutate;

  function onClick() {
    mutate(id, {
      onSuccess: () => {
        setOpen(false);
      }
    });
  }

  return (
    <Dialog open={ open } onOpenChange={ setOpen }>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="pb-4">
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-row gap-2 w-[100%]'>
          <Button className='w-[50%]' variant='outline' onClick={ () => setOpen(false) } disabled={ isPending }>Cancel</Button>
          <Button 
            className='w-[50%]'
            variant='destructive' 
            disabled={ isPending }
            onClick={ onClick }
          >
            { isPending ? <Loader2 className='size-4 animate-spin' /> : 'Delete' }
          </Button>
        </div>
      </DialogContent>
      <DialogFooter>
      </DialogFooter>
    </Dialog>
  )
}