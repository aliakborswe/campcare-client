import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useParams } from "react-router";
import useAuth from "@/hooks/useAuth";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const axiosSecure = useAxiosSecure();
  const { participantId } = useParams();
  const { user } = useAuth();

  const [amount, setAmount] = useState(0);

  // Load participant data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(`/participants/${participantId}`);
        setAmount(res.data?.campFees * 100);
      } catch (err: any) {
        toast.error(err.message || "Failed to load participant data.");
      }
    };
    fetchData();
  }, [axiosSecure, participantId]);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card information is missing.");
      setLoading(false);
      return;
    }

    try {
      // Create payment intent
      const { data: clientSecret } = await axiosSecure.post("/payment-intent", {
        amount: amount,
        currency: "usd",
      });

      // Confirm payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        setError(error.message || "Payment failed.");
      } else if (paymentIntent?.status === "succeeded") {
        setSuccess("Payment successful!");
        toast.success("Payment successful!");

        // Notify the backend
        await axiosSecure.patch("/payment-confirmation", {
          userEmail: user?.email,
          participantId,
          paymentIntentId: paymentIntent.id,
        });
      }
    } catch (err: any) {
      toast.error(err.message || "Payment failed.");
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='p-4 border rounded-md'>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {error && <p className='text-red-500 mt-2'>{error}</p>}
      {success && <p className='text-green-500 mt-2'>{success}</p>}
      <button
        type='submit'
        className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded-md ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className='max-w-xl mx-auto mt-10 px-4'>
        <h2 className='text-2xl font-bold mb-4'>Make a Payment</h2>
        <CheckoutForm />
      </div>
    </Elements>
  );
};

export default Payment;
