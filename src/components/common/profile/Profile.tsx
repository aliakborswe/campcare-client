import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserType } from "@/utils/userType";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Button } from "@/components/ui/button";

const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(1, "Contact is required"),
  image: z.instanceof(File).optional(),
});

type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

//   imgbb information
const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = ({ data }: { data: UserType }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(data.image);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();


  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      contact: data.contact,
    },
  });

  const onSubmit = async (formData: UpdateProfileFormValues) => {
    setIsSubmitting(true);

    try {
      let imageUrl = data.image;

      if (formData.image) {
        const formDataImage = new FormData();
        formDataImage.append("image", formData.image);

        const res = await axiosPublic.post(image_hosting_api, formDataImage, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.status === 200) {
          imageUrl = res.data.data.url;
        } else {
          toast.error("Image upload failed");
          return;
        }
      }

      const updatedData = {
        ...formData,
        image: imageUrl,
      };

      await axiosSecure.put(`/users/${data._id}`, updatedData);
      console.log(updatedData);
      toast.success("Profile updated successfully");
      setIsPopoverOpen(false); // Close the popup
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      form.setValue("image", file);
    }
  };

  return (
    <div className='p-4 sm:mr-10 lg:mr-20 mt-10'>
      <div className='card bg-base-100 shadow-xl flex flex-col sm:flex-row gap-8 justify-start items-center p-4'>
        <img
          src={data.image}
          className='aspect-square w-48 rounded-full'
          alt='photo'
        />

        <div className='space-y-2'>
          <h2 className='text-2xl sm:text-3xl font-semibold text-accent'>
            {data.name}
          </h2>
          <p className='text-md sm:text-xl font-semibold'>{data.email}</p>
          <p className='text-md sm:text-xl font-semibold pb-3'>
            {data.contact}
          </p>
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger>
              <div className="bg-primary text-white dark:text-black py-2 px-4 rounded-md font-semibold">Update</div>
            </PopoverTrigger>
            <PopoverContent className='fixed inset-0 bg-background flex items-center justify-center w-[320px] p-0 '>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-4 bg-white p-6 rounded-lg shadow-lg'
                >
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <input
                            type='text'
                            {...field}
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
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
                          <input
                            disabled
                            type='email'
                            {...field}
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm cursor-not-allowed'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='contact'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact</FormLabel>
                        <FormControl>
                          <input
                            type='text'
                            {...field}
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='image'
                    render={() => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <input
                            type='file'
                            accept='image/*'
                            onChange={handleImageChange}
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {imagePreview && (
                    <div className='mt-4'>
                      <img
                        src={imagePreview}
                        alt='Preview'
                        className='w-full h-24 rounded-sm'
                      />
                    </div>
                  )}
                  <div className="w-full">
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      className='w-full'
                    >
                      {isSubmitting ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </form>
              </Form>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Profile;
