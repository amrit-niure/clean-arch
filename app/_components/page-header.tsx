// "use client";import { FC, useState } from "react";import {  CardDescription,//   CardHeader,//   CardTitle,
// } from "@/app/_components/ui/card";
// import { Button } from "@/app/_components/ui/button";
// import { CirclePlus, Plus } from "lucide-react";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/app/_components/ui/sheet";
// import { Input } from "@/app/_components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/app/_components/ui/select";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/app/_components/ui/form";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ISignUp, userSchema } from "@/src/entities/models/users";

// interface PageHeaderProps {
//   header: string;
//   description: string;
//   pagePath: string;
// }

// const PageHeader: FC<PageHeaderProps> = ({ description, header }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const form = useForm<ISignUp>({
//     resolver: zodResolver(userSchema),
//     defaultValues: {
//       firstName: "",
//       middleName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       role: "USER",
//       title: "",
//       phoneNumber: "",
//       branch: "AUSTRALIA",
//       address: "",
//       status: "ACTIVE",
//     },
//   });

//   function onSubmit(values: ISignUp) {
//     console.log(values);
//     form.reset()
//     // Here you would typically send the data to your backend
//     setIsOpen(false);
//   }

//   return (
//     <CardHeader className="space-y-4 bg-gradient-to-r from-primary/5 to-muted-foreground/10 rounded-lg p-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div className="space-y-1">
//           <CardTitle className="text-2xl font-bold tracking-tight">
//             {header}
//           </CardTitle>
//           <CardDescription className="text-sm max-w-2xl">
//             {description}
//           </CardDescription>
//         </div>
//         <Sheet open={isOpen} onOpenChange={setIsOpen}>
//           <SheetTrigger asChild>
//             <Button
//               className="self-start sm:self-auto transition-colors hover:bg-primary/90"
//               onClick={() => setIsOpen(true)}
//             >
//               <Plus className="mr-2 h-4 w-4" />
//               New Member
//             </Button>
//           </SheetTrigger>
//           <SheetContent className="min-w-[600px] sm:w-[600px] lg:w-[900px] overflow-y-auto">
//             <SheetHeader>
//               <SheetTitle className="flex gap-2 items-center">
//                 {" "}
//                 <CirclePlus />
//                 Add New Member
//               </SheetTitle>
//               <SheetDescription>
//                 Only Admins can create new members.
//               </SheetDescription>
//             </SheetHeader>
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-4 mt-4"
//               >
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="firstName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>First Name</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="middleName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Middle Name</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <FormField
//                   control={form.control}
//                   name="lastName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Last Name</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input type="email" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Password</FormLabel>
//                       <FormControl>
//                         <Input type="password" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="role"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Role</FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a role" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="USER">User</SelectItem>
//                           <SelectItem value="ADMIN">Admin</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="title"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Title</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="branch"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Branch</FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a branch" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="AUSTRALIA">Australia</SelectItem>
//                           <SelectItem value="NEPAL">Nepal</SelectItem>
//                           <SelectItem value="DUBAI">Dubai</SelectItem>
//                           <SelectItem value="PHILIPPHINES">Philippines</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="phoneNumber"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Phone Number</FormLabel>
//                       <FormControl>
//                         <Input type="tel" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="address"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Address</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="status"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Status</FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a status" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="ACTIVE">Active</SelectItem>
//                           <SelectItem value="INACTIVE">Inactive</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button type="submit" className="w-full">
//                   Add Member
//                 </Button>
//               </form>
//             </Form>
//           </SheetContent>
//         </Sheet>
//       </div>
//     </CardHeader>
//   );
// };

// export default PageHeader;

"use client";

import { FC, useState, useEffect } from "react";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { CirclePlus, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISignUp, userSchema } from "@/src/entities/models/users";

interface PageHeaderProps {
  header: string;
  description: string;
  pagePath: string;
}

const countryCodeMap = {
  AUSTRALIA: "+61",
  NEPAL: "+977",
  DUBAI: "+971",
  PHILIPPINES: "+63",
};

const PageHeader: FC<PageHeaderProps> = ({ description, header }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("+61");

  const form = useForm<ISignUp>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      role: "USER",
      title: "",
      phoneNumber: "",
      branch: "AUSTRALIA",
      address: "",
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "branch" && value.branch) {
        // Check if branch is defined
        setCountryCode(countryCodeMap[value.branch] || "+61");
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  function onSubmit(values: ISignUp) {
    console.log(values);
    form.reset();
    setIsOpen(false);
  }

  return (
    <CardHeader className="space-y-4 bg-gradient-to-r from-primary/5 to-muted-foreground/10 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {header}
          </CardTitle>
          <CardDescription className="text-sm max-w-2xl">
            {description}
          </CardDescription>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              className="self-start sm:self-auto transition-colors hover:bg-primary/90"
              onClick={() => setIsOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Member
            </Button>
          </SheetTrigger>
          <SheetContent className="min-w-[600px] sm:w-[600px] lg:w-[900px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex gap-2 items-center">
                <CirclePlus />
                Add New Member
              </SheetTitle>
              <SheetDescription>
                Only Admins can create new members.
              </SheetDescription>
            </SheetHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                  control={form.control}
                  name="password"
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
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USER">User</SelectItem>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Branch</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a branch" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AUSTRALIA">Australia</SelectItem>
                          <SelectItem value="NEPAL">Nepal</SelectItem>
                          <SelectItem value="DUBAI">Dubai</SelectItem>
                          <SelectItem value="PHILIPPINES">
                            Philippines
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                            {countryCode}
                          </span>
                          <Input
                            type="tel"
                            className="rounded-l-none"
                            {...field}
                          />
                        </div>
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
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Active</SelectItem>
                          <SelectItem value="INACTIVE">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Add Member
                </Button>
              </form>
            </Form>
          </SheetContent>
        </Sheet>
      </div>
    </CardHeader>
  );
};

export default PageHeader;
