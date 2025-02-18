import Wrapper from "@/components/common/Wrapper";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import  { useState } from "react";

const faqData: FAQItemType[] = [
  {
    question: "What is CampCare?",
    answer:
      "CampCare is a platform dedicated to providing high-quality camping experiences for people of all ages, offering a variety of programs focused on adventure, education, and personal growth.",
  },
  {
    question: "How can I register for a camp?",
    answer:
      "Registering for a camp is easy. Visit our 'Programs' section, choose the camp you're interested in, and click the 'Register Now' button to complete the signup process.",
  },
  {
    question: "What types of camps does CampCare offer?",
    answer:
      "We offer a wide range of camps, including adventure camps, educational camps, family retreats, wellness programs, and outdoor survival training sessions.",
  },
  {
    question: "Is CampCare suitable for children and families?",
    answer:
      "Yes, CampCare provides programs specifically designed for children, teenagers, and families, ensuring a safe and enjoyable experience for all age groups.",
  },
  {
    question: "What should I bring to the camp?",
    answer:
      "We provide a detailed packing list for each program after registration, which typically includes essentials like clothing, toiletries, sleeping gear, and any specific items for the activities.",
  },
  {
    question: "Can I cancel or reschedule my registration?",
    answer:
      "Yes, cancellations and rescheduling are possible, but they are subject to our policy. Please refer to our 'Terms & Conditions' page or contact our support team for assistance.",
  },
  {
    question: "Are there safety measures in place at CampCare?",
    answer:
      "Absolutely. Safety is our top priority. All our programs are supervised by trained staff, and we follow strict safety protocols to ensure a secure environment for all participants.",
  },
];




type FAQItemType = {
  question: string;
  answer: string;
};



const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section className='bg-secondary/10 '>
      <Wrapper>
        <h2 className='text-3xl font-extrabold text-center mb-8'>
          Frequently Asked Questions
        </h2>
        <div className='space-y-6'>
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default FAQ;




type FAQItemProps = {
  item: FAQItemType;
  isOpen: boolean;
  toggleOpen: () => void;
};

const FAQItem = ({ item, isOpen, toggleOpen }: FAQItemProps) => {
  return (
    <div className='border-b border-gray-200 py-4'>
      <button
        className='flex justify-between items-center w-full text-left'
        onClick={toggleOpen}
      >
        <span className='text-lg font-medium '>
          {item.question}
        </span>
        {isOpen ? (
          <ChevronUpIcon className='h-6 w-6 ' />
        ) : (
          <ChevronDownIcon className='h-6 w-6 ' />
        )}
      </button>
      {isOpen && <p className='mt-2 '>{item.answer}</p>}
    </div>
  );
};
