import Spinner from "@/components/common/Spinner";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { CircleDollarSign, HeartPulse } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Helmet } from "react-helmet-async";

interface History {
  id: string;
  campName: string;
  campFees: string;
  paymentStatus: string;
  confirmationStatus: string;
}

const Analytics = () => {
  const [paymentHistory, setPaymentHistory] = useState<History[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Dynamically prepare chart data
  const chartData = paymentHistory.map((item) => ({
    campName: item.campName,
    campFees: parseFloat(item.campFees),
  }));

  const chartConfig: ChartConfig = {
    campFees: {
      label: "Camp Fees",
      color: "hsl(var(--chart-1))",
    },
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(
          `/payment-history?email=${user?.email}`
        );
        // total cost
        setTotalCost(
          res.data.reduce(
            (total: number, item: History) => total + parseFloat(item.campFees),
            0
          )
        );
        setPaymentHistory(res.data);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [axiosSecure, user?.email]);

  if (loading) {
    return <Spinner />;
  }
  if (paymentHistory.length === 0) {
    return (
      <div className='flex justify-center items-center'>
        <h1 className='text-3xl font-bold text-red-500'>No data found</h1>
      </div>
    );
  }

  return (
    <div className='p-6 space-y-6'>
      <Helmet>
        <title>Analytics | Dashboard</title>
      </Helmet>
      <div className='flex flex-col sm:flex-row gap-4 justify-between'>
        {/* Card: Received Cares */}
        <div className='bg-white shadow-lg rounded-md w-full p-6'>
          <div className='flex items-center gap-4 justify-between text-xl font-bold'>
            <h1>Received Cares</h1>
            <HeartPulse className='text-red-500 mt-1' />
          </div>
          <h1 className='text-3xl font-bold text-yellow-500 pt-3'>
            {paymentHistory.length}
          </h1>
          <p className='text-gray-500 pt-2'>
            This represents the total number of care services you have received.
          </p>
        </div>

        {/* Card: Total Expense */}
        <div className='bg-white shadow-lg rounded-md w-full p-6'>
          <div className='flex items-center gap-4 justify-between text-xl font-bold'>
            <h1>Total Expense</h1>
            <CircleDollarSign className='text-red-500 mt-1' />
          </div>
          <h1 className='text-3xl font-bold text-yellow-500 pt-3'>
            {totalCost}$
          </h1>
          <p className='text-gray-500 pt-2'>
            This shows the total amount spent on care services so far.
          </p>
        </div>
      </div>

      {/* charts */}
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart - Camp Fees</CardTitle>
          <CardDescription>Payment History</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              data={chartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='campName'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey='campFees' fill='var(--color-campFees)' radius={8}>
                <LabelList
                  position='top'
                  offset={12}
                  className='fill-foreground'
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className='flex-col items-start gap-2 text-sm'>
          <div className='flex gap-2 font-medium leading-none'>
            Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
          </div>
          <div className='leading-none text-muted-foreground'>
            Showing total camp fees for the payment history
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Analytics;
