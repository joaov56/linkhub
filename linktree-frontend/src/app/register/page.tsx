'use client'

import Link from "next/link"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { register } from "@/actions/auth"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useActionState } from "react"

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button className="w-full bg-purple-600 hover:bg-purple-700" type="submit" disabled={pending}>
      {pending ? "Signing up..." : "Sign Up"}
    </Button>
  )
}

export default function Register() {
  const [state, formAction] = useActionState(register, null)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex items-center justify-center">
            <svg
              className="h-6 w-6 text-green-500"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span className="ml-2 text-xl font-bold">LinkHub</span>
          </div>
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-gray-500">Enter your details to sign up for LinkHub</p>
        </div>

        <form action={formAction} className="space-y-4">
          {state?.message && (
            <Alert className="bg-green-50 text-green-600">
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          
          {state?.errors?._form && (
            <Alert variant="destructive">
              <AlertDescription>{state.errors._form}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name"
              placeholder="John Doe" 
              required 
              type="text"
              aria-describedby="name-error"
            />
            {state?.errors?.name && (
              <p className="text-sm text-red-500" id="name-error">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Username</Label>
            <Input 
              id="username" 
              name="username"
              placeholder="johndoe123" 
              required 
              type="text"
              aria-describedby="name-error"
            />
            {state?.errors?.name && (
              <p className="text-sm text-red-500" id="name-error">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email"
              placeholder="m@example.com" 
              required 
              type="email"
              aria-describedby="email-error"
            />
            {state?.errors?.email && (
              <p className="text-sm text-red-500" id="email-error">{state.errors.email[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password"
              required 
              type="password"
              aria-describedby="password-error"
            />
            {state?.errors?.password && (
              <p className="text-sm text-red-500" id="password-error">{state.errors.password[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              name="confirmPassword"
              required 
              type="password"
              aria-describedby="confirm-password-error"
            />
            {state?.errors?.confirmPassword && (
              <p className="text-sm text-red-500" id="confirm-password-error">
                {state.errors.confirmPassword[0]}
              </p>
            )}
          </div>

          <SubmitButton />
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">or continue with</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button className="w-full" variant="outline">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>
          <Button className="w-full" variant="outline">
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Continue with Apple
          </Button>
          <Button className="w-full" variant="outline">
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 3a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect height="12" width="4" x="3" y="9" />
              <circle cx="5" cy="5" r="2" />
            </svg>
            Continue with phone number
          </Button>
        </div>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link className="text-purple-600 hover:underline" href="/login">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
