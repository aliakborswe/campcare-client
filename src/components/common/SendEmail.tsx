
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";



const SendEmail = () => {
  const [text, setText] = useState("");
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e:any) => {
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
            toast("Email sent successfully!", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          },
          (error:any) => {
            
            error.toast("Failed to send email. Please try again later.");
          }
        );
    }
  };

  return (
      <form ref={form} onSubmit={sendEmail}>
        <div className='grid grid-cols-1 gap-4 '>
          <div className='sm:col-span-2'>
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
                className="w-full rounded-sm p-1"
              />
          </div>
          <div className='sm:col-span-2'>
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
                className="w-full rounded-sm p-1"
              />
          </div>
          <div className='sm:col-span-2'>
            <label
              htmlFor='message'
              className='block text-sm font-semibold '
            >
              Message
            </label>
              <textarea
                id='message'
                name='message'
                rows={2}
                required
                className="w-full rounded-sm p-1"
              />
          </div>
        </div>
        <p>{text}</p>
          <Button
            type='submit'
           className="w-full hover:bg-primary mt-4"
          >
            Send Email
          </Button>
      </form>
  );
};

export default SendEmail;
