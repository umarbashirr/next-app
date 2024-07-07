"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState, useTransition } from "react";
import { createNewClient } from "../actions";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const clientFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    zip: z.string().optional(),
  }),
  shippingAddress: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    zip: z.string().optional(),
  }),
  sameAddress: z.coerce.boolean(),
});

const ClientForm = ({ workspaceId }: { workspaceId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        zip: "",
      },
      shippingAddress: {
        street: "",
        city: "",
        state: "",
        country: "",
        zip: "",
      },
      sameAddress: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof clientFormSchema>) => {
    try {
      startTransition(() => {
        createNewClient(values, workspaceId);
      });
      toast({
        title: "Success",
        description: "New client added",
      });
      router.refresh();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const sameAddress = form.watch("sameAddress");
    if (sameAddress) {
      const billingAddress = form.getValues("address");
      form.setValue("shippingAddress", billingAddress);
    } else {
      form.setValue("shippingAddress", {
        street: "",
        city: "",
        state: "",
        country: "",
        zip: "",
      });
    }
  }, [form.watch("sameAddress")]);

  const sameAddress = form.watch("sameAddress");

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-solid border-gray-300 p-3">
            <legend>Personal Details</legend>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
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
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-solid border-gray-300 p-3">
            <legend>Billing Address</legend>
            <FormField
              name="address.street"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address.city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address.state"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address.country"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address.zip"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zipcode</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <div>
            <FormField
              control={form.control}
              name="sameAddress"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="leading-none">
                    <FormLabel>Same as billing address</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-solid border-gray-300 p-3">
            <legend>Shipping Address</legend>
            <FormField
              name="shippingAddress.street"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} disabled={sameAddress} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="shippingAddress.city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} disabled={sameAddress} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="shippingAddress.state"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} disabled={sameAddress} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="shippingAddress.country"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} disabled={sameAddress} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="shippingAddress.zip"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zipcode</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} disabled={sameAddress} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <div className="flex items-center justify-end gap-4">
            <Button>Create now</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ClientForm;
