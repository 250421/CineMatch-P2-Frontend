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
    <Card className='w-[30rem] bg-card-blue/60 border-border-blue text-text-bright'>
      <CardHeader>
        <CardTitle className='text-2xl'>Register</CardTitle>
        <CardDescription className='text-muted-text-blue2'>Create an account to continue</CardDescription>
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
                    <Input className="border-border-blue focus-visible:ring-0 focus-visible:border-focus bg-bg-blue2 placeholder:text-muted-text-blue2 selection:bg-focus caret-focus" data-testid="username-input" placeholder="Username*" {...field} />
                  </FormControl>
                  <FormDescription className='text-muted-text-blue2'>
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
                    <Input className="border-border-blue focus-visible:ring-0 focus-visible:border-focus bg-bg-blue2 placeholder:text-muted-text-blue2 selection:bg-focus caret-focus" data-testid="password-input" placeholder="Password*" {...field} type='password' />
                  </FormControl>
                  <FormDescription className='text-muted-text-blue2'>
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
                    <Input className="border-border-blue focus-visible:ring-0 focus-visible:border-focus bg-bg-blue2 placeholder:text-muted-text-blue2 selection:bg-focus caret-focus" data-testid="re-password-input" placeholder="Confirm Password*" {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button data-testid="register-submit" type="submit" className="w-[100%] bg-button hover:bg-button-hover text-card-blue cursor-pointer">Register</Button>
          </form>
        </Form>
        <CardFooter className='flex items-center justify-center gap-1 text-sm mt-1 text-muted-text-blue2 p-0'>
          <p>Already have an account?</p>
          <Link to='/login' className='text-link-green underline'>Login</Link>
        </CardFooter>
      </CardContent>
    </Card>
  )
}