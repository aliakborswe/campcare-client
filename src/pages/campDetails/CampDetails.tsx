import Spinner from "@/components/common/Spinner";
import Wrapper from "@/components/common/Wrapper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { CampInterface } from "@/utils/campInterface";
import { registeredCampSchema } from "@/utils/registeredCampSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { z } from "zod";

const CampDetails = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams<{ id: string }>();

  const { data: camp, isLoading, refetch } = useQuery<CampInterface>({
    queryKey: ["camp", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps/${id}`);
      return res.data;
    }
  });

  // Define form.
  const form = useForm<z.infer<typeof registeredCampSchema>>({
    resolver: zodResolver(registeredCampSchema),
    defaultValues: {
      campName: "",
      campFees: 0,
      location: "",
      healthcareProfessional: "",
      participantName: "",
      participantEmail: "",
      age: "",
      phoneNumber: "",
      gender: "Male",
      emergencyContact: "",
    },
  });

  useEffect(() => {
    // initially set default value in form
    if (camp) {
        form.setValue("campName", camp.campName);
        form.setValue("campFees", camp.campFees);
        form.setValue("location", camp.location);
        form.setValue("healthcareProfessional", camp.healthcareProfessional);
        form.setValue("participantName", user?.displayName || "");
        form.setValue("participantEmail", user?.email || "");
    }
  }, [camp, form, user?.displayName, user?.email]);

  // Define a submit handler.
  async function onSubmit(data: z.infer<typeof registeredCampSchema>) {
    setIsSubmitting(true);
    try {
      const dataToSend = {
        campId: camp?._id,
        participantName: data.participantName,
        participantEmail: data.participantEmail,
        age: data.age,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        emergencyContact: data.emergencyContact,
      };
      const res = await axiosSecure.post("/participants", dataToSend);
      refetch();
      toast.success(res.data.message);
      setIsDialogOpen(false); // Close the dialog
    } catch (err: any) {
      toast.error("Participant already registered for this camp.", err.message);
      setIsDialogOpen(false); // Close the dialog
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <Spinner />;
  }
  if (!camp) {
    return <div>Camp not found</div>;
  }
  return (
    <Wrapper>
      <div className='border flex flex-col sm:flex-row items-center gap-6 p-4 rounded shadow-lg'>
        <div className='w-full sm:w-1/3'>
          <img
            src={camp.image}
            alt={camp.campName}
            className='aspect-video rounded'
          />
        </div>
        <div className='w-full sm:w-2/3 space-y-1'>
          <h2 className='text-xl font-bold pb-2'>{camp.campName}</h2>
          <div className='flex gap-4'>
            <p>{camp.time}</p>
            <p>{camp.date}</p>
          </div>
          <p>{camp.location}</p>
          <p>Healthcare Professional: {camp.healthcareProfessional}</p>
          <p>Participants: {camp.participantCount}</p>
          <p>{camp.description}</p>
          {/* Join Camp Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant='default'>Join Camp</Button>
            </DialogTrigger>
            <DialogContent className='w-full p-0 m-0'>
              <DialogHeader className='px-2'>
                <DialogTitle className='pt-2 pb-0 mb-0'>
                  Register this Camp
                </DialogTitle>
                <DialogDescription className='hidden'></DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='w-full mx-auto p-2'
                >
                  <div className='grid grid-cols-2 gap-4 text-sm'>
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
                              onKeyDown={(e) => e.preventDefault()}
                              className='border-foreground cursor-not-allowed h-7'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                              onKeyDown={(e) => e.preventDefault()}
                              className='border-foreground cursor-not-allowed h-7'
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
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
                              onKeyDown={(e) => e.preventDefault()}
                              className='border-foreground cursor-not-allowed h-7'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                              onKeyDown={(e) => e.preventDefault()}
                              className='border-foreground cursor-not-allowed h-7'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Participant Name field */}
                    <FormField
                      control={form.control}
                      name='participantName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Participant Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter Participant Name'
                              {...field}
                              onKeyDown={(e) => e.preventDefault()}
                              className='border-foreground cursor-not-allowed h-7'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Participant Email field */}
                    <FormField
                      control={form.control}
                      name='participantEmail'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Participant Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter Participant Email'
                              {...field}
                              onKeyDown={(e) => e.preventDefault()}
                              className='border-foreground cursor-not-allowed h-7'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Age field */}
                    <FormField
                      control={form.control}
                      name='age'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Participant Age</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter Participant Age'
                              {...field}
                              className='border-foreground h-7'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Phone Number field */}
                    <FormField
                      control={form.control}
                      name='phoneNumber'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter Phone Number'
                              {...field}
                              className='border-foreground h-7'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Gender field */}
                    <FormField
                      control={form.control}
                      name='gender'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              value={field.value || ""}
                              onChange={(e) => field.onChange(e.target.value)}
                              className='border rounded border-foreground w-full '
                            >
                              <option value=''>Select Gender</option>
                              <option value='Male'>Male</option>
                              <option value='Female'>Female</option>
                              <option value='Other'>Other</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Emergency Contact field */}
                    <FormField
                      control={form.control}
                      name='emergencyContact'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Contact</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter Emergency Contact'
                              {...field}
                              className='border-foreground h-7'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Form Submit Button is here */}
                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full mt-2'
                  >
                    {isSubmitting ? "Registering..." : "Join Camp"}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Wrapper>
  );
};

export default CampDetails;
