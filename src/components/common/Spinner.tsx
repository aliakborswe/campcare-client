import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Wrapper from "./Wrapper";

const Spinner = () => {
  return (
    <Wrapper className='flex justify-center w-52 h-52'>
      <DotLottieReact
        src='https://lottie.host/9f9444ce-1187-4951-b002-887aa783ee36/LKpMA79FXs.lottie'
        loop
        autoplay
        style={{
          filter: "hue-rotate(-240deg)",
        }}
      />
    </Wrapper>
  );
};

export default Spinner;
