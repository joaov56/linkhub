"use server"

import axios from "axios"
import { z } from "zod"

const RegisterSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type RegisterState = {
  errors?: {
    name?: string[]
    email?: string[]
    username?: string[]
    password?: string[]
    confirmPassword?: string[]
    _form?: string[]
  }
  message?: string
}

export async function register(prevState: RegisterState | null, formData: FormData): Promise<RegisterState> {

    console.log('oi');
    
  const validatedFields = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  } 

  console.log({
    firstName: validatedFields.data.name?.toString().split(" ")[0],
    lastName: validatedFields.data.name?.toString().split(" ")[1],
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  });
  
  try {
    await axios.post('http://localhost:4000/users', {
        username: validatedFields.data.username,
        firstName: validatedFields.data.name?.toString().split(" ")[0],
        lastName: validatedFields.data.name?.toString().split(" ")[1],
        email: validatedFields.data.email,
        password: validatedFields.data.password,
      })
  } catch (error) {
    console.log(error);
    
  }


  try {
    return {
      message: "Registration successful! You can now login.",
    }
  } catch (error) {
    console.log(error);
    
    return {
      errors: {
        _form: ["An error occurred during registration. Please try again."],
      },
    }
  }
}

