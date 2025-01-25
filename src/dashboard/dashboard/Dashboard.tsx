import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { HeartPulse, Users } from "lucide-react";
import { useEffect, useState } from "react";


const chartConfig = {
  visitors: {
    label: "Total",
  },
  chrome: {
    label: "Camps",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Participants",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface Review {
  _id: string;
  userName: string;
  userEmail: string;
  feedback: string;
  rating: number;
  userImage: string;
}

const Dashboard = () => {
  const [campsLength, setCampsLength] = useState<number>(0);
  const [participantsLength, setParticipantsLength] = useState<number>(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const axiosSecure = useAxiosSecure();

  const chartData = [
    { browser: "chrome", visitors: campsLength, fill: "var(--color-chrome)" },
    {
      browser: "safari",
      visitors: participantsLength,
      fill: "var(--color-safari)",
    },
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosSecure.get("/feedback");
        setReviews(response.data);
      } catch (err: any) {
        console.error(err.message);
      }
    };

    fetchReviews();
  }, [axiosSecure]);
  useEffect(() => {
    const fetchCampsLength = async () => {
      try {
        const resOne = await axiosSecure.get("/camps-length");
        const resTwo = await axiosSecure.get("/participants-length");
        setCampsLength(resOne.data);
        setParticipantsLength(resTwo.data);
      } catch (error) {
        console.error("Error fetching camps length:", error);
      }
    };
    fetchCampsLength();
  }, [axiosSecure]);
  return (
    <div className='px-4 py-6 flex flex-col md:flex-row gap-8'>
      {/* cards and charts */}
      <div className='w-full md:w-2/3 text-black flex flex-col justify-between'>
        <div className='flex gap-4 justify-between'>
          <div className='bg-white shadow-lg rounded-md w-full p-6'>
            <div className=' flex items-center gap-4 justify-between text-xl font-bold'>
              <h1>Total Camp</h1>
              <HeartPulse className='text-red-500 mt-1' />
            </div>
            <h1 className='text-3xl font-bold text-yellow-500 pt-3'>
              {campsLength}
            </h1>
          </div>
          <div className='bg-white shadow-lg rounded-md w-full p-6'>
            <div className=' flex items-center gap-4 justify-between text-xl font-bold'>
              <h1>Total Participant</h1>
              <Users className='text-red-500 mt-1' />
            </div>
            <h1 className='text-3xl font-bold text-yellow-500 pt-3'>
              {participantsLength}
            </h1>
          </div>
        </div>
        {/* Chart */}
          <Card className='flex flex-col shadow-lg'>
            <CardHeader className='items-center pb-0'>
              <CardTitle>Pie Chart - CampCare+</CardTitle>
              <CardDescription>January - June 2025</CardDescription>
            </CardHeader>
            <CardContent className='flex-1 pb-0'>
              <ChartContainer
                config={chartConfig}
                className='mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background'
              >
                <PieChart>
                  <ChartTooltip
                    content={
                      <ChartTooltipContent nameKey='visitors' hideLabel />
                    }
                  />
                  <Pie data={chartData} dataKey='visitors'>
                    <LabelList
                      dataKey='browser'
                      className='fill-background'
                      stroke='none'
                      fontSize={12}
                      formatter={(value: keyof typeof chartConfig) =>
                        chartConfig[value]?.label
                      }
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className='flex-col gap-2 text-sm'>
              <div className='flex items-center gap-2 font-medium leading-none'>
                Trending up by 5.2% this month{" "}
                <TrendingUp className='h-4 w-4' />
              </div>
              <div className='leading-none text-muted-foreground'>
                Showing total Participants for the last 6 months
              </div>
            </CardFooter>
          </Card>
      </div>
      {/* Feedback and Rating */}
      <div className='w-full md:w-1/3 '>
        {/* <h1 className='text-xl font-bold'>Feedback</h1> */}
        <Carousel
          opts={{
            align: "start",
          }}
          orientation='vertical'
          className='w-full max-w-xs'
        >
          <CarouselContent className=' h-screen'>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <CarouselItem
                  key={review._id}
                  className='md:basis-1/2 lg:basis-1/3 shadow-lg flex items-center'
                >
                  <Card>
                    <CardContent className='flex aspect-square items-center justify-center p-6'>
                      <div className='text-center'>
                        <img
                          src={review.userImage}
                          alt={review.userName}
                          className='w-16 h-16 rounded-full mx-auto'
                        />
                        <h3 className='text-xl font-semibold mt-4'>
                          {review.userName}
                        </h3>
                        <p className='text-gray-500 pb-1'>{review.feedback}</p>
                        <span className='text-yellow-500'>
                          {"⭐".repeat(review.rating)}
                        </span>{" "}
                        {/* Show star rating */}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))
            ) : (
              <div>Loading reviews...</div>
            )}
          </CarouselContent>
          <CarouselPrevious className=' -top-0' />
          <CarouselNext className='-bottom-0' />
        </Carousel>
      </div>
    </div>
  );
};

export default Dashboard;
