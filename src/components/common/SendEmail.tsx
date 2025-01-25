import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import Wrapper from "./Wrapper";
import xrayImg from "../../assets/images/xray.avif"

const SendEmail = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: any) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_th30rs9", // Replace with your EmailJS service ID
          "template_2v15o2p", // Replace with your EmailJS template ID
          form.current,
          "IYW68_7AilkEs8Xg1" // Replace with your public key
        )
        .then(
          () => {
            toast("Email sent successfully!");
          },
          (error: any) => {
            error.toast("Failed to send email. Please try again later.");
          }
        );
    }
  };

  return (
    <section className='bg-contact-image bg-no-repeat bg-cover bg-black/50 bg-blend-overlay '>
      <Wrapper>
        <div className='bg-black/30 rounded-md px-4 pb-8 text-white '>
          <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-center py-8'>
            Contact Us
          </h1>
          <form ref={form} onSubmit={sendEmail}>
            <div className='space-y-6'>
              <div className='flex flex-col gap-6 sm:flex-row justify-between'>
                <div className='space-y-2 w-full'>
                  <label
                    htmlFor='user_name'
                    className='block text-sm font-semibold '
                  >
                    Name
                  </label>
                  <input
                    id='user_name'
                    name='user_name'
                    type='text'
                    autoComplete='given-name'
                    required
                    className='w-full bg-transparent border rounded-lg p-2 shadow-lg'
                  />
                </div>
                <div className='space-y-2 w-full'>
                  <label
                    htmlFor='user_email'
                    className='block text-sm font-semibold '
                  >
                    Email
                  </label>
                  <input
                    id='user_email'
                    name='user_email'
                    type='email'
                    autoComplete='email'
                    required
                    className='w-full bg-transparent border rounded-lg p-2 shadow-lg'
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='message'
                  className='block text-sm font-semibold '
                >
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows={6}
                  required
                  className='w-full bg-transparent border rounded-lg p-2 shadow-lg'
                />
              </div>
              <Button type='submit' className='w-full hover:bg-primary'>
                Send Email
              </Button>
            </div>
          </form>
        </div>
      </Wrapper>
    </section>
  );
};

export default SendEmail;
