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
import { signIn } from "../actions";
import { toast } from "@/components/ui/use-toast";
import { useTransition } from "react";
import LoadingButton from "@/components/LoadingButton";

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password should be minimum 06 charcters",
  }),
});

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    try {
      startTransition(() => {
        signIn(values);
      });
      toast({
        title: "Success",
        description: "Logged-in successfully!",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error?.message,
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            className="w-full"
            type="submit"
            loading={isPending}
            disabled={isPending}
            loadingText="Please wait"
          >
            Login now
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
