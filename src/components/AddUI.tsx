"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function AddUI({ user_id }: { user_id: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [uiState, setUIState] = useState({
    title: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [errors, setErrors] = useState<UIValidationType>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file!);
  };

  //   * Add UI
  const submit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", uiState.title);
    formData.append("description", uiState.description);
    formData.append("image", file!);
    formData.append("user_id", user_id);

    axios
      .post("/api/user/ui", formData)
      .then((res) => {
        setLoading(false);
        setErrors({});
        const response = res.data;
        if (response.status == 400) {
          setErrors(response.errors);
        } else if (response.status == 200) {
          toast({
            title: "Success",
            description:
              "Congratulations you have added the work in front of the world.",
            className: "bg-green-400",
          });
          setSheetOpen(false);
          router.refresh();
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("the erros is", err);
      });
  };

  return (
    <Sheet open={sheetOpen}>
      <SheetTrigger asChild>
        <Button
          className="mt-2 bg-green-400 mr-2 hover:bg-green-700"
          onClick={() => setSheetOpen(true)}
        >
          Add Design
        </Button>
      </SheetTrigger>

      <SheetContent showClose={false}>
        <SheetHeader>
          <SheetTitle>Add your Amazing work</SheetTitle>
          <SheetDescription>
            Display your amazing UI/UX work to the world.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Type your title"
            onChange={(e) => setUIState({ ...uiState, title: e.target.value })}
          />
          <span className="text-red-700 font-bold">{errors?.title}</span>
        </div>
        <div className="mt-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Type description"
            onChange={(e) =>
              setUIState({ ...uiState, description: e.target.value })
            }
          />
          <span className="text-red-700 font-bold">{errors?.description}</span>
        </div>
        <div className="mt-4">
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            id="image"
            placeholder="choose your image"
            accept="images/*"
            onChange={handleFileChange}
          />
          <span className="text-red-700 font-bold">{errors?.image}</span>
        </div>

        <SheetFooter className="mt-4">
          <Button onClick={submit} disabled={loading}>
            {loading ? "processing.." : "Submit"}
          </Button>
          <Button variant="secondary" onClick={() => setSheetOpen(false)}>
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
