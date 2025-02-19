import Wrapper from "@/components/common/Wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Quote } from "lucide-react";
import { useState, useEffect } from "react";

interface Review {
  _id: string;
  userName: string;
  userEmail: string;
  feedback: string;
  rating: number;
  userImage: string;
}

const Review = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const axiosSecure = useAxiosSecure()


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

  return (
    <section className='bg-primary/5'>
      <Wrapper>
        <p className='text-center bg-accent w-28 rounded-bl-full rounded-tr-full text-white dark:text-black mb-2 py-1 mx-auto'>
          Our Clients
        </p>
        <h1 className='text-center text-xl md:text-2xl lg:text-3xl font-bold pb-8'>
          Our Client Happy Say About Us
        </h1>
        <div>
          <Carousel className='px-12'>
            <CarouselContent>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <CarouselItem
                    key={review._id}
                    className='md:basis-1/2 lg:basis-1/2 shadow shadow-primary'
                  >
                    <Card className='w-full h-full flex items-center '>
                      <CardContent className='py-6'>
                        <p className='text-gray-500 pb-1'>{review.feedback}</p>
                        <div className='pt-2 flex items-center justify-between'>
                          <div className='flex items-center space-x-4'>
                            <img
                              src={review.userImage}
                              alt={review.userName}
                              className='w-20 h-20 rounded-full border-2 border-primary'
                            />
                            <div>
                              <h3 className='text-xl font-semibold mt-4'>
                                {review.userName}
                              </h3>
                              <span className='text-yellow-500'>
                                {"⭐".repeat(review.rating)}
                              </span>{" "}
                            </div>
                          </div>
                          <Quote size={40} className='text-gray-500' />
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))
              ) : (
                <div className='flex items-center space-x-4 mx-12'>
                  <Skeleton className='h-12 w-12 rounded-full' />
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-[250px]' />
                    <Skeleton className='h-4 w-[200px]' />
                  </div>
                </div>
              )}
            </CarouselContent>
            <CarouselPrevious className='-left-0' />
            <CarouselNext className='-right-0' />
          </Carousel>
        </div>
      </Wrapper>
    </section>
  );
};


export default Review;
