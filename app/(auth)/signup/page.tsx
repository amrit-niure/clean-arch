"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/_components/ui/card";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/app/_global-components/form-error";
import { useToast } from "@/app/_hooks/use-toast";
import LoadingSpinner from "@/app/_global-components/loading-spinner";
import { signUp } from "../actions";
import { userSchema } from "@/src/entities/models/users";


export type SignUpInput = z.infer<typeof userSchema>;

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role:"USER"
    },
    resolver: zodResolver(userSchema),
  });

  async function onSubmit(data: SignUpInput) {
    const res = await signUp(data);
    console.log(res);
    if (res?.error) {
      toast({
        variant: "destructive",
        description: res.error,
      });
    }else{
      toast({
        title: "Sign Up Successful",
        variant: "default",
        description:
          "We have sent an verification email, please verify your email before signing in.",
      });
    }
    reset();
  }
  // }
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create a <b>Hamro Khata</b> account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John Doe"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <FormError error={errors.firstName.message} />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="John Doe"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <FormError error={errors.lastName.message} />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && <FormError error={errors.email.message} />}
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                    />
                    <Button
                      variant={"ghost"}
                      size="icon"
                      type="button"
                      className="absolute bottom-1 right-1 h-7 w-7"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeIcon className="h-4 w-4" />
                      ) : (
                        <EyeOffIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <FormError error={errors.password.message} />
                  )}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full flex gap-4"
                disabled={isSubmitting}
              >
                {isSubmitting && <LoadingSpinner />} Sign Up
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href={"signin"} className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
