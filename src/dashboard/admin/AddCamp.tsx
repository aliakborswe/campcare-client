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
import { Textarea } from "@/components/ui/textarea";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { campSchema } from "@/utils/campSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { z } from "zod";

const AddCamp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Define form.
  const form = useForm<z.infer<typeof campSchema>>({
    resolver: zodResolver(campSchema),
    defaultValues: {
      campName: "",
      image: undefined,
      campFees: 0,
      date: "",
      time: "",
      location: "",
      healthcareProfessional: "",
      participantCount: 0,
      description: "",
    },
  });

  // Define a submit handler.
  function onSubmit(data: z.infer<typeof campSchema>) {
    setIsSubmitting(true);
    try {
      const campData = {
        ...data,
      };
      console.log(campData)
    
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Helmet>
        <title>Add Camp</title>
      </Helmet>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 max-w-2xl mx-auto p-4'
        >
          {/* CampName field */}
          <FormField
            control={form.control}
            name='campName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Camp Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter Camp Name'
                    {...field}
                    className='border-foreground'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Description field */}
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Camp Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Write your description here (minimum 10 characters)'
                    {...field}
                    className='border-foreground'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {/* Healthcare Professional field */}
            <FormField
              control={form.control}
              name='healthcareProfessional'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Healthcare Professional</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter Healthcare Professional Name'
                      {...field}
                      className='border-foreground'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Location field */}
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter location'
                      {...field}
                      className='border-foreground'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Date and Time field */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input
                      type='date'
                      placeholder='Enter Date'
                      {...field}
                      className='border-foreground w-full flex justify-between'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='time'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input
                      type='time'
                      placeholder='Enter Time'
                      {...field}
                      className='border-foreground'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {/* Camp fees field */}
            <FormField
              control={form.control}
              name='campFees'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Camp Fees'</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min={0}
                      placeholder='Enter Camp Fees'
                      {...field}
                      className='border-foreground'
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Image field */}
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      accept='image/*'
                      className='border-foreground'
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        field.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Form Submit Button is here */}
          <Button type='submit' disabled={isSubmitting} className='w-full'>
            {isSubmitting ? "Submitting..." : "Add Camp"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddCamp;
