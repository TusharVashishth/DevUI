import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function PostDeleteBtn({ id }: { id: number }) {
  const { toast } = useToast();
  const router = useRouter();

  const deletePost = () => {
    axios
      .delete(`/api/user/ui/${id}`)
      .then((res) => {
        const response = res.data;
        if (response.status == 200) {
          toast({
            title: "Success!",
            description: response.message,
            className: "bg-green-400",
          });
          router.refresh();
        } else if (response.status == 500) {
          toast({
            title: "Error!",
            description: response.message,
            className: "bg-red-400",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            from database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={deletePost}>
            Yes Delete it!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
