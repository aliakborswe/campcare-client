import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='container mx-auto px-2.5 text-center'>
        <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary'>
          404
        </h1>
        <p className='mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white'>
          Something's missing.
        </p>
        <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.{" "}
        </p>
        <Link
          to='/'
          className='bg-primary py-3 px-6 rounded-[10px] text-white font-bold text-lg'
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
