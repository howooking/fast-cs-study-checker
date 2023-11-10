import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";

type ConnectLinkDialogProps = {
  disabled: boolean;
  link: string;
  title: string;
  edit?: boolean;
};

export default function ConnectLinkDialog({
  title,
  link,
  disabled,
  edit,
}: ConnectLinkDialogProps) {
  const [linkInput, setLinkInput] = useState(link);
  return (
    <Dialog>
      <Button
        size="sm"
        asChild
        disabled={disabled}
        variant={edit ? "outline" : "default"}
      >
        <DialogTrigger>{edit ? "수정" : "연결"}</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {edit
              ? "발표자료 링크를 수정해주세요"
              : "발표자료 링크를 연결해주세요"}
          </DialogTitle>
          <p className="text-sm">{title}</p>
        </DialogHeader>
        <DialogDescription>
          <Input
            placeholder="깃허브 링크 || 블로그 링크 || 노션링크"
            value={link}
            onChange={(e) => setLinkInput(e.target.value)}
          />
        </DialogDescription>
        <DialogFooter>
          <DialogClose>
            <Button>연결</Button>
          </DialogClose>
          <DialogClose>
            <Button variant="destructive">취소</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
