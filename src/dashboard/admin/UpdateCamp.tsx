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
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { campSchema } from "@/utils/campSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { z } from "zod";

//   imgbb information
const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateCamp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {id} = useParams();

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

    // load camp data from server by id and set the default values
    useEffect(() => {
      axiosSecure.get(`/camps/${id}`).then((res) => {
        const camp = res.data;
        form.reset(camp);
      });
    }, [id, axiosSecure, form])


  // Define a submit handler.
  async function onSubmit(data: z.infer<typeof campSchema>) {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("image", data.image as File);

      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        const imageUrl = res.data.data.url;
        const campData = {
          ...data,
          image: imageUrl,
        };

        await axiosSecure.put(`/camps/${id}`, campData);
        toast.success("Camp Update successfully");
        form.reset();
        navigate("/dashboard/manage-camp");
      } else {
        toast.error("Image upload failed");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Helmet>
        <title>Update Camp | Dashboard</title>
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
export default UpdateCamp;
