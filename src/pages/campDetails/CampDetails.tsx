import Spinner from "@/components/common/Spinner";
import Wrapper from "@/components/common/Wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { CalendarDays, CircleDollarSign, Clock, MapPin, Stethoscope, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { z } from "zod";

const CampDetails = () => {
  const { user } = useAuth();
  const [camp, setCamp] = useState<CampInterface | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch camp data from the API
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/camps/${id}`);
        setCamp(res.data);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [axiosSecure, id]);

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
      navigate("/");
      toast.success(res.data.message);
      setIsDialogOpen(false); // Close the dialog
    } catch (err: any) {
      toast.error("Participant already registered for this camp.", err.message);
      setIsDialogOpen(false); // Close the dialog
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return <Spinner />;
  }
  if (!camp) {
    return <div>Camp not found</div>;
  }
  return (
    <Wrapper>
      <Helmet>
        <title>Camp Details | CampCare+</title>
      </Helmet>
      <Card className='flex w-full lg:w-2/3 mx-auto flex-col md:flex-row border-none shadow-xl shadow-primary/20'>
        <CardHeader className='p-0 md:w-1/2'>
          <CardTitle className='h-full'>
            <img
              src={camp.image}
              alt={camp.campName}
              className='w-full h-full object-cover rounded-l'
            />
          </CardTitle>
        </CardHeader>
        <div className='flex flex-col md:w-1/2 gap-2 border-none justify-between px-4 pb-4 pt-2'>
          <CardDescription>
            <h2 className='text-xl font-bold'>{camp.campName}</h2>
          </CardDescription>
          <CardContent className='space-y-1 [&_div]:flex [&_div]:items-center [&_div]:gap-1 p-0 [&_div]:text-sm sm:[&_div]:text-base'>
            <div>
              <CalendarDays size={20} />
              {camp.date}
            </div>
            <div>
              <Clock size={20} />
              {camp.time}
            </div>
            <div>
              <MapPin size={20} />
              {camp.location}
            </div>
            <div>
              <Stethoscope size={20} />
              {camp.healthcareProfessional}
            </div>
            <div>
              <CircleDollarSign size={20} />
              {camp.campFees}$
            </div>
            <div>
              <Users size={20} />
              {camp.participantCount}
            </div>
            <div>{camp.description}</div>
          </CardContent>
          <CardFooter className='p-0'>
            {/* Join Camp Button */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button disabled={!user} variant='default'>
                  Join Camp
                </Button>
              </DialogTrigger>
              <DialogContent className='w-full p-0 mx-2.5'>
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
                        disabled
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
                        disabled
                        control={form.control}
                        name='campFees'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Camp Fees</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                min={0}
                                placeholder='Enter Camp Fees'
                                {...field}
                                onKeyDown={(e) => e.preventDefault()}
                                className='border-foreground cursor-not-allowed h-7'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Location field */}
                      <FormField
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
          </CardFooter>
        </div>
      </Card>
    </Wrapper>
  );
};

export default CampDetails;
