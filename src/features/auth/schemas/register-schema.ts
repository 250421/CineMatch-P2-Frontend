"use client"

import { z } from "zod"

export const registerSchema = z.object({
  username: z.string().min(4, {
    message: "Usename must be at least 4 characters."
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  }),
  re_password: z.string()
}).refine(value => value.password === value.re_password, {
  message: "Passwords must match.",
  path: ['re_password'],
})

export type RegisterSchemaType = z.infer<typeof registerSchema>
