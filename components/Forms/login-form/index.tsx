"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { loginFormSchema } from "@/lib/forms-schema";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { handleCredentialLogin } from "@/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useStore from "@/lib/store";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { setSession } = useStore();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await handleCredentialLogin(data);

      if (response && response.error) {
        // console.error(response.error);
        toast.error("Login Failed");
      } else {
        router.push("/");
        toast.success("Login successful");
        setSession(data?.email);
        return;
      }
    } catch (e) {
      toast.error("Login Failed");
      // console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-[35rem] w-full px-[5rem]" data-id="login-form">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-primary"
          data-id="login-form-element"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem data-id="email-field">
                <FormLabel data-id="email-label">Email</FormLabel>
                <FormControl data-id="email-control">
                  <Input
                    placeholder="Enter email"
                    {...field}
                    className="text-primary"
                    data-id="login-email-input"
                  />
                </FormControl>
                <FormDescription data-id="email-description">
                  This is your public display name.
                </FormDescription>
                <FormMessage data-id="email-message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem data-id="password-field">
                <FormLabel data-id="password-label">Password</FormLabel>
                <FormControl data-id="password-control">
                  <Input
                    placeholder="Password"
                    type="password"
                    {...field}
                    className="text-primary"
                    data-id="login-password-input"
                  />
                </FormControl>
                <FormMessage data-id="password-message" />
              </FormItem>
            )}
          />
          <div
            className="flex gap-3 items-end"
            data-id="submit-button-container"
          >
            <Button
              loading={loading}
              type="submit"
              className="rounded-md border border-1 rounded-sm shadow-md border-primary "
              key="submit"
              variant="outline"
              data-id="login-submit-button"
            >
              Submit
            </Button>
          </div>
          <p className="text-primary no-wrap" data-id="signup-link-container">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary font-bold hover:underline"
              data-id="signup-link"
            >
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
