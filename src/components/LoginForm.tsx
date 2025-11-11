import {useForm} from "react-hook-form";

export type LoginValues = {
  email: string
  password: string
}

function LoginForm({ onSubmit }: { onSubmit: (data: LoginValues) => void }) {

    const { register, handleSubmit, formState: { errors }, formState: { isSubmitting } } = useForm<LoginValues>({defaultValues: {
      email: '',
      password: ''
    }});

    return ( 
        <>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
          <div>
             <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
            </label>
            <input
              id="email"
              type="email"
              autoFocus
              autoComplete="email"
              {...register("email", { required: "Email is required" })}
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
              autoComplete="current-password"
              {...register("password", { required: "Password is required" })}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />

        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
          </div>
         <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-3 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60">
        Login
      </button>

      <p>Not registered? <a href="/signup" className="text-blue-600 hover:underline">Sign up here</a></p>
        </form>
        </>
     );
}

export default LoginForm;