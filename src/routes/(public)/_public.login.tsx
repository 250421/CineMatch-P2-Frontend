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
    <Card data-testid="login" className="w-[400px] bg-card-blue/60 border-border-blue text-text-bright gap-0">
      <CardHeader className="gap-0 mb-8">
        <CardTitle className="font-bold text-2xl"> Welcome back</CardTitle>
        <CardDescription className="text-muted-text-blue2">
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
                    <Input
                    className="border-border-blue focus-visible:ring-0 focus-visible:border-focus bg-bg-blue2 placeholder:text-muted-text-blue2 selection:bg-focus caret-focus"
                    placeholder="Username" {...field} />
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
                    <Input
                    className="border-border-blue focus-visible:ring-0 focus-visible:border-focus bg-bg-blue2 placeholder:text-muted-text-blue2 selection:bg-focus caret-focus"
                    placeholder="Password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-[100%] bg-button text-card-blue hover:bg-button-hover cursor-pointer">Login</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex items-center gap-1 text-sm mx-auto mt-1 text-muted-text-blue2">
        <p>Don&apos;t have an account?</p>
        <Link to={"/register"} className="text-link-green underline">
          Register
        </Link>
      </CardFooter>
    </Card>
  );
}
