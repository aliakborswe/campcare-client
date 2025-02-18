
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link,  useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import Wrapper from "@/components/common/Wrapper";
import useAuth from "@/hooks/useAuth";
import SocialLogin from "./SocialLogin";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .refine(
      (value) => /[A-Z]/.test(value), // Must have at least one uppercase letter
      { message: "Password must contain at least one uppercase letter." }
    )
    .refine(
      (value) => /[a-z]/.test(value), // Must have at least one lowercase letter
      { message: "Password must contain at least one lowercase letter." }
    ),
});

const Login = () => {
  const { login } = useAuth();

  const navigate = useNavigate();

  // Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values.email, values.password)
      .then(() => {
        toast.success("Login Success!");
        navigate("/");
        form.reset();
      })
      .catch(() => {
        toast.error("Email or Password not Matched");
      });
  }

  return (
    <Wrapper className='flex flex-col md:flex-row items-center justify-center gap-4 '>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className='w-full md:w-1/2'>
        <SocialLogin />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 border-t-2 border-primary pt-6'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter Your email'
                      {...field}
                      className='border-foreground'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter password'
                      type='password'
                      {...field}
                      className='border-foreground'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full'>
              Login
            </Button>
          </form>
        </Form>
        <p className='mt-8 text-start text-muted-foreground'>
          Not a member?{" "}
          <Link
            to='/register'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            Please register first
          </Link>
        </p>
      </div>
      <DotLottieReact
        src='https://lottie.host/b05cbd0b-a072-4614-88e6-ba08663ae6f8/WLR1nXaiBs.lottie'
        loop
        autoplay
        className='w-full md:w-1/2 aspect-square'
      />
    </Wrapper>
  );
};

export default Login;
