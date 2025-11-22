import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpValues } from "../validation/authSchemas";

function SignUpForm({ onSubmit }: { onSubmit: (data: SignUpValues) => void }) {
    
    const { register, handleSubmit, formState: { errors }, formState: { isSubmitting } } = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }});

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
          <div>
             <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                First Name
            </label>
            <input
              id="firstName"
              type="text"
              autoFocus
              autoComplete="given-name"
              {...register("firstName")}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />

        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
        )}
          </div>

          <div>
             <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                Last Name
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              {...register("lastName")}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />

        {errors.lastName && (
          <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
        )}
          </div>

          <div>
             <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />

        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register("password")}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />

        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
          Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              {...register("confirmPassword")}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />      
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
          </div>

         <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-3 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60">
        Sign Up
      </button>
      <p>Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login here</a></p>
        </form>
        </>
     );
}
export default SignUpForm;
