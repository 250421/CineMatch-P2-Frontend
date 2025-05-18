import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type JSX, useState } from "react";

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
}

export const useConfirm = (): [
  () => Promise<boolean>,
  (props: ConfirmDialogProps) => JSX.Element,
] => {
  const [state, setState] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise<boolean>((resolve) => setState({ resolve }));
  const handleConfirm = () => {
    state?.resolve(true);
    setState(null);
  };
  const handleCancel = () => {
    state?.resolve(false);
    setState(null);
  };

  const ConfirmDialog = ({
    title,
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    destructive = false,
  }: ConfirmDialogProps): JSX.Element => (
    <Dialog open={!!state} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="bg-card-green2/95 border-border-green text-text-light min-w-fit [&>button]:cursor-pointer [&>button]:focus:ring-0 [&>button]:focus:ring-offset-0 [&>button]:hover:bg-focus [&>button]:p-1">
        <DialogHeader>
          <DialogTitle className="text-bright">{title}</DialogTitle>
          <DialogDescription className="pb-4 text-button-hover">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row mx-auto w-[100%]">
          <Button onClick={handleCancel} className="w-[50%] bg-focus hover:bg-text-light text-card-green cursor-pointer">
            {cancelLabel}
          </Button>
          <Button
            variant={destructive ? "destructive" : "default"}
            onClick={handleConfirm}
            className="w-[50%] text-bright cursor-pointer"
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [confirm, ConfirmDialog];
};
