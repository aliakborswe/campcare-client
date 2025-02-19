import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import Wrapper from "./Wrapper";
import { Check } from "lucide-react";

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
    <section>
      <Wrapper>
        <p className='text-center bg-accent w-44 rounded-bl-full rounded-tr-full text-white dark:text-black mb-2 py-1 mx-auto'>
          Free Appointment
        </p>
        <div className='flex flex-col gap-4 justify-between lg:flex-row'>
          <div className='w-full lg:w-1/2 space-y-6 text-base'>
            <h1 className='text-2xl lg:text-3xl font-bold text-center'>
              Free Medical Consultation
            </h1>
            <p>
              We provide a free medical consultation for our patients, Once you
              submit the request, our office will contact you within one
              business day to schedule your appointment.
            </p>
            <ul className='[&_li]:flex [&_li]:gap-1 space-y-2'>
              <li>
                {" "}
                <Check className='text-primary ' /> Explain your health
                concerns.
              </li>
              <li>
                {" "}
                <Check className='text-primary ' /> A Specialist will answer
                your questions.
              </li>
              <li>
                {" "}
                <Check className='text-primary ' /> Review your case documents.
              </li>
              <li>
                {" "}
                <Check className='text-primary ' /> Follow up your medical
                condition.
              </li>
              <li>
                {" "}
                <Check className='text-primary ' /> Check your surgery result.
              </li>
            </ul>
          </div>
          <form ref={form} onSubmit={sendEmail} className='w-full lg:w-1/2'>
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
                    className='w-full border border-primary rounded-lg p-2 shadow-lg'
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
                    className='w-full border border-primary rounded-lg p-2 shadow-lg'
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
                  className='w-full border border-primary rounded-lg p-2 shadow-lg'
                />
              </div>
              <Button type='submit' className='w-full hover:bg-primary'>
                Request a Free Consultation
              </Button>
            </div>
          </form>
        </div>
      </Wrapper>
    </section>
  );
};

export default SendEmail;
