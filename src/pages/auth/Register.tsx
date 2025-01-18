import useAuth from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/utils/authFromSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Helmet } from "react-helmet-async";
import Wrapper from "@/components/common/Wrapper";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  // Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      photoURL: "",
      password: "",
    },
  });

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const email = values.email;
    const password = values.password;
    const updatedUser = { displayName: values.name, photoURL: values.photoURL }; // for firebase user profile update

    if (createUser) {
      createUser(email, password)
        .then((res) => {
          // backend api call for user registration
          const user = {
            name: res?.user?.displayName || values.name,
            email: res?.user?.email || email,
            photoURL: res?.user?.photoURL || values.photoURL,
            password: password,
          };
          axiosSecure
            .post("/users", user)
            .then(() => {
              toast.success("Register Success!");
            })
            .catch((err: any) => {
              toast.error(err.message);
            });
          updateUserProfile(updatedUser);
          form.reset();
          navigate("/");
        })
        .catch((err: any) => {
          toast.error(err.message);
        });
    }
  }

  return (
    <Wrapper className='flex flex-col md:flex-row items-center justify-between gap-4 '>
      <Helmet>
        <title>Giving-Hands | Register</title>
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
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter Your Name'
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
              name='photoURL'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter Your Photo url'
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

            <Button type='submit' className='w-full text-white'>
              Submit
            </Button>
          </form>
        </Form>
        <p className='mt-8 text-start text-muted-foreground'>
          Have an account?{" "}
          <Link
            to='/login'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            Please Login
          </Link>
        </p>
      </div>
      <DotLottieReact
        src='https://lottie.host/297c1a07-a0bb-4c42-a1a3-16a67e20a863/jY4y2I5TLz.lottie'
        loop
        autoplay
        className='w-full md:w-1/2 aspect-square'
      />
    </Wrapper>
  );
};

export default Register;
