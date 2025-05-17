import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useLogin } from "@/features/auth/hooks/use-login";
import {
  loginSchema,
  type LoginSchemaType,
} from "@/features/auth/schemas/login-schema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";


export const Route = createFileRoute("/(public)/_public/login")({
  component: LoginPage,
});

export function LoginPage() {
  const { mutate: login } = useLogin();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: LoginSchemaType) {
    login(values);
  }

  return (
    <Card data-testid="login" className="w-[400px]">
      <CardHeader>
        <CardTitle className="font-bold text-2xl"> Login</CardTitle>
        <CardDescription>
          Please enter your username and password to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
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
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-[100%]">Submit</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <p>Don&apos;t have an account?</p>
        <Link to={"/register"} className="text-blue-500 underline">
          Register
        </Link>
      </CardFooter>
    </Card>
  );
}
