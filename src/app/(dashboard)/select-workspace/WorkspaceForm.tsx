"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createWorkspace } from "./action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const WorkspaceFormSchema = z.object({
  name: z.string(),
});

const WorkspaceForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof WorkspaceFormSchema>>({
    resolver: zodResolver(WorkspaceFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onFormSubmit = async (values: z.infer<typeof WorkspaceFormSchema>) => {
    try {
      await createWorkspace(values);
      toast({
        title: "Success",
        description: "New workpsace created",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            Create now
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default WorkspaceForm;
