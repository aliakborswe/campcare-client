import Wrapper from "@/components/common/Wrapper";
import img1 from "@/assets/images/1-1.png";
import img2 from "@/assets/images/2-1-1.png";
import img3 from "@/assets/images/3-1-1.png";
import img4 from "@/assets/images/4-1-1.png";


const WorkingProcess = () => {
    return (
      <section>
        <Wrapper>
          <p className='text-center bg-accent w-44 rounded-bl-full rounded-tr-full text-white dark:text-black mb-2 py-1 mx-auto'>
            Services
          </p>
          <h1 className='text-center text-xl md:text-2xl lg:text-3xl font-bold pb-8'>
            Our Workig Best Processs
          </h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='sm:mt-28 text-center mx-auto [&_h2]:text-xl [&_h2]:font-semibold space-y-2 p-4'>
              <div className='relative'>
                <p className='bg-[#800080] text-white w-10 h-10 flex justify-center items-center rounded-full absolute top-0 left-12'>
                  01
                </p>
                <img
                  src={img1}
                  alt='image'
                  className='w-40 h-40 object-contain border-2 border-primary rounded-full mx-auto'
                />
              </div>
              <h2>Emergency Care</h2>
              <p>There are many variations of passages Lorem Ipsum available</p>
            </div>
            <div className='sm:mb-28 mx-auto text-center [&_h2]:text-xl [&_h2]:font-semibold space-y-2 p-4'>
              <div className='relative'>
                <p className='bg-[#800080] text-white w-10 h-10 flex justify-center items-center rounded-full absolute top-0 left-12'>
                  02
                </p>
                <img
                  src={img2}
                  alt='image'
                  className='w-40 h-40 object-contain border-2 border-primary rounded-full mx-auto'
                />
              </div>
              <h2>Operation Theatre</h2>
              <p>There are many variations of passages Lorem Ipsum available</p>
            </div>
            <div className='sm:mt-28 mx-auto text-center [&_h2]:text-xl [&_h2]:font-semibold space-y-2 p-4'>
              <div className='relative'>
                <p className='bg-[#800080] text-white w-10 h-10 flex justify-center items-center rounded-full absolute top-0 left-12'>
                  03
                </p>
                <img
                  src={img3}
                  alt='image'
                  className='w-40 h-40 object-contain border-2 border-primary rounded-full mx-auto'
                />
              </div>
              <h2>Blood Test</h2>
              <p>There are many variations of passages Lorem Ipsum available</p>
            </div>
            <div className='sm:mb-28 mx-auto text-center [&_h2]:text-xl [&_h2]:font-semibold space-y-2 p-4'>
              <div className='relative'>
                <p className='bg-[#800080] text-white w-10 h-10 flex justify-center items-center rounded-full absolute top-0 left-12'>
                  04
                </p>
                <img
                  src={img4}
                  alt='image'
                  className='w-40 h-40 object-contain border-2 border-primary rounded-full mx-auto'
                />
              </div>
              <h2>Outdoor Checkup</h2>
              <p>There are many variations of passages Lorem Ipsum available</p>
            </div>
          </div>
        </Wrapper>
      </section>
    );
};

export default WorkingProcess;