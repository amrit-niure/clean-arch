"use client";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CustomerInputSchema } from "@/types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCustomer,
  updateCustomer,
} from "@/app/dashboard/customers/actions";
import Link from "next/link";
import { Customer } from "@prisma/client";
interface CustomerFormProps {
  initialData?: Customer;
}

export default function CustomerForm({ initialData }: CustomerFormProps) {
  const [isEditing] = useState(!!initialData);
  const queryClient = useQueryClient();

  const form = useForm<Customer>({
    resolver: zodResolver(CustomerInputSchema),
    defaultValues: initialData || {
      firstName: "",
      middleName: undefined,
      lastName: "",
      email: "",
      address: "",
      passportNumber: undefined,
      currentVisa: undefined,
      visaExpiry: undefined,
      phone: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      form.reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (params: { id: string; data: Partial<Customer> }) =>
      updateCustomer(params.id, params.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      form.reset();
    },
  });

  const handleFormSubmit = useCallback(
    (data: Customer) => {
      if (isEditing && initialData?.id) {
        updateMutation.mutate({ id: initialData.id, data: data });
      } else {
        createMutation.mutate(data);
      }
    },
    [isEditing, initialData, updateMutation, createMutation],
  );
  return (
    <div className="w-full">
      <CardHeader className="pt-0">
        <Link href={"/dashboard/customers"}>
          <Button variant={"link"} className="self-start px-0 flex gap-2 py-8">
            <ArrowLeft size={"15"} /> Back
          </Button>
        </Link>
        <CardTitle>{isEditing ? "Edit Customer" : "Create Customer"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the details of the customer."
            : "Fill in the details to create a new customer."}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name{" "}
                      <span className="text-red-500" title="Required">
                        *
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? undefined} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name{" "}
                      <span className="text-red-500" title="Required">
                        *
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email{" "}
                    <span className="text-red-500" title="Required">
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Address{" "}
                    <span className="text-red-500" title="Required">
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passportNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passport Number</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? undefined} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="currentVisa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Visa</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select current Visa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="SUB_500">500</SelectItem>
                        <SelectItem value="SUB_482">482</SelectItem>
                        <SelectItem value="SUB_407">407</SelectItem>
                        <SelectItem value="SUB_186">186</SelectItem>
                        <SelectItem value="SUB_189">189</SelectItem>
                        <SelectItem value="SUB_190">190</SelectItem>
                        <SelectItem value="SUB_600">600</SelectItem>
                        <SelectItem value="SUB_820">820</SelectItem>
                        <SelectItem value="SUB_801">801</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="visaExpiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visa Expiry Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={(date) => field.onChange(date ?? null)}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full py-2">
              {isEditing ? "Update Customer" : "Register Customer"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}
