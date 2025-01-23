"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signUpformSchema } from "@/lib/forms-schema";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof signUpformSchema>>({
    resolver: zodResolver(signUpformSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        toast.success("Registration successful");
        router.push("/auth/login");
      } else if (response.status === 202) {
        setError("Email is already registered");
      } else {
        toast.error("Registration Failed");
      }
    } catch (e: any) {
      console.error(e);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // console.log("error", error);

  return (
    <div className="max-w-[35rem] w-full px-[5rem]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-primary"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter username"
                    {...field}
                    className="text-primary"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
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
                  <Input
                    placeholder="Enter email"
                    {...field}
                    className="text-primary"
                  />
                </FormControl>
                {error !== null && (
                  <FormDescription className="text-red-500">
                    {error}
                  </FormDescription>
                )}
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
                  <Input
                    placeholder="Password"
                    type="password"
                    {...field}
                    className="text-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3 items-end">
            <Button
              loading={loading}
              type="submit"
              className="rounded-md border border-1 rounded-sm shadow-md border-primary"
              key="submit"
              variant="outline"
            >
              Submit
            </Button>
          </div>
          <p className="text-primary !no-wrap">
            Already have an Account?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
