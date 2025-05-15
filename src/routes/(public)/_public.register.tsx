import { registerSchema, type RegisterSchemaType } from '@/features/auth/schemas/register-schema'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRegister } from '@/features/auth/hooks/use-register'
import { usePasswordValidation } from '@/features/auth/hooks/use-password-validation'
import { Requirement } from '@/components/shared/requirement'

export const Route = createFileRoute('/(public)/_public/register')({
  component: Register,
})

export function Register() {
  const { mutate: registerUser } = useRegister();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      re_password: "",
    }
  })

  const password = useWatch({ control: form.control, name: "password" })
  const { hasLowerCase, hasUpperCase, hasNumber, hasSpecialCharacter } = usePasswordValidation(password);

  function onSubmit(values: RegisterSchemaType) {
    registerUser(values);
  }

  return (
    <Card className='w-[30rem]'>
      <CardHeader>
        <CardTitle className='text-2xl'>Register</CardTitle>
        <CardDescription>Create an account to continue</CardDescription>
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
                    <Input data-testid="username-input" placeholder="Username*" {...field} />
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password*" {...field} type='password' />
                  </FormControl>
                  <FormDescription>
                    <span>Password must contain: </span>
                    <Requirement hasBoolean={ hasLowerCase }>at least one lowercase letter</Requirement>
                    <Requirement hasBoolean={ hasUpperCase }>at least one uppercase letter</Requirement>
                    <Requirement hasBoolean={ hasNumber }>at least one number</Requirement>
                    <Requirement hasBoolean={ hasSpecialCharacter }>at least one special character (@, #, $, %, ^, &, +, =)</Requirement>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="re_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm Password*" {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-[100%]">Submit</Button>
          </form>
        </Form>
        <CardFooter className='flex flex-row gap-2 mt-4'>
          <p>Already have an account?</p>
          <Link to='/login' className='text-blue-300'>Log in</Link>
        </CardFooter>
      </CardContent>
    </Card>
  )
}