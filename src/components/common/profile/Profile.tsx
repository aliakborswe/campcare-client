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
import useAuth from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import bannerImg from "@/assets/images/user-image.jpg";
import { BriefcaseBusiness, House, Mail, Phone, SquarePen, User } from "lucide-react";

const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(1, "Contact is required"),
  profession: z.string(),
  about: z.string(),
  address: z.string(),
  image: z.instanceof(File).optional(),
});

type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

//   imgbb information
const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = ({ data, refetch }: { data: UserType; refetch: any }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(data.image);
  const { updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [toggle, setToggle] = useState(true);

  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      contact: data.contact,
      profession: data.profession,
      about: data.about,
      address:data.address
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
      refetch();
      toast.success("Profile updated successfully");
      updateUserProfile({ photoURL: imageUrl });
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
    <div className='mx-4 my-6 flex flex-col lg:flex-row gap-6'>
      <Card className='w-full lg:w-1/3 border-none shadow-md shadow-primary/40'>
        <CardContent className='p-0'>
          <div className='relative'>
            <img
              src={bannerImg}
              alt='banner image'
              className='w-full h-40 rounded-t'
            />
            <img
              src={data.image}
              alt={data.name}
              className='w-36 h-36 rounded-full absolute -bottom-10 border-2 border-primary left-2 right-0 '
            />
          </div>
          <div className='mt-12 px-4 pb-4 space-y-1'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-accent'>
              {data.name}
            </h2>
            <div className='text-lg font-semibold flex gap-2 items-center'>
              <Mail />
              {data.email}
            </div>
            <div className='text-lg font-semibold flex gap-2 items-center'>
              <Phone />
              {data.contact}
            </div>
            <div className='text-lg font-semibold flex gap-2 items-center'>
              <House />
              {data.address}
            </div>
            <div className='text-lg font-semibold flex gap-2 items-center'>
              <BriefcaseBusiness />
              <p className='break-words w-full '>{data.profession}</p>
            </div>
            <hr />
            <div className='text-base'>{data.about}</div>
          </div>
        </CardContent>
      </Card>
      <div className='border-none shadow-md shadow-primary/40 w-full lg:w-2/3 rounded-md bg-primary/10'>
        <div className='flex gap-6 justify-between items-center p-4 border-b-2 border-dashed border-gray-400'>
          <h1 className='text-xl font-semibold'>My Profile</h1>
          <div onClick={() => setToggle(!toggle)}>
            <SquarePen />
          </div>
        </div>
        {toggle ? (
          <div className='grid grid-cols-2 gap-4 p-4 text-base sm:text-lg'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <User />
                Full Name
              </div>
              <div className='bg-background rounded-md py-1 px-3 break-words'>
                {data.name}
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Mail />
                Email
              </div>
              <div className='bg-background rounded-md py-1 px-3 break-words'>
                {data.email}
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Phone />
                Contact
              </div>
              <div className='bg-background rounded-md py-1 px-3 break-words'>
                {data.contact}
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <House />
                Address
              </div>
              <div className='bg-background rounded-md py-1 px-3 break-words'>
                {data.address}
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <BriefcaseBusiness />
                Profession
              </div>
              <div className='bg-background rounded-md py-1 px-3 break-words'>
                {data.profession}
              </div>
            </div>
          </div>
        ) : (
          <div className='p-4 text-base sm:text-lg'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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
                            className='block w-full border border-gray-300 text-black rounded-md py-1 pl-3 shadow-sm'
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
                            className='block w-full border border-gray-300 text-black rounded-md py-1 pl-3 shadow-sm'
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
                            className='block w-full border border-gray-300 text-black rounded-md py-1 pl-3 shadow-sm'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <input
                            type='text'
                            {...field}
                            className='block w-full border border-gray-300 text-black rounded-md py-1 pl-3 shadow-sm'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='profession'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profession</FormLabel>
                        <FormControl>
                          <input
                            type='profession'
                            {...field}
                            className='block w-full border border-gray-300 text-black rounded-md py-1 pl-3 shadow-sm'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='about'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          className='block w-full border border-gray-300 text-black rounded-md py-1 pl-3 shadow-sm'
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
                      className='w-24 h-24 rounded-full'
                    />
                  </div>
                )}
                <div className='w-full'>
                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full mt-4'
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
