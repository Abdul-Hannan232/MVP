"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { EmailTemplate } from "../../utils/emailTemplate";
import { motion } from "framer-motion";

const contactFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const defaultValues = {
  email: "",
};

function Footer() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    const loadingToastId = toast.loading("Sending message...");
    setIsLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      toast.success("Welcome! You've successfully joined MVP.ai", {
        id: loadingToastId,
      });
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to send message. Please try again later.", {
        id: loadingToastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="lg:w-[80%] w-[75%] mx-auto mt-20 lg:mb-20 mb-0 xl:flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="lg:text-start text-center"
        >
          <h1 className="lg:text-[47px] text-[26px] text-[#9801FF] leading-none font-bold">
            Unlock Early Access{" "}
          </h1>
          <p className="text-black mt-5 text-[15px] ">
            Be the first to experience the future of AI and human companionship.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="gap-5 my-7 flex flex-col lg:flex-row items-center"
          >
            <div className="flex flex-col">
              <input
                {...register("email")}
                type="email"
                placeholder="Your Email"
                required
                className="bg-white  border-black border text-[16px] w-[250px] lg:w-[364px] h-[45px] lg:h-[58px] rounded-full pl-5 text-black"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              type="submit"
              disabled={isLoading}
              className="lg:w-[150px] cursor-pointer text-white w-[160px] h-[60px] lg:h-[60px] border-b-8 border-t-4 border-x-6 bg-[#F3ABC7] rounded-full text-center text-lg lg:text-[20px] border-black"
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </motion.button>
          </form>
          <div className="gap-12 flex lg:justify-start justify-center items-center">
            <Image
              src="/assets/apple.svg"
              alt="logo"
              width={219}
              height={70}
              className="lg:w-[204px] lg:h-[88px] w-[108px] h-[31px]"
            />
            <Image
              src="/assets/google.svg"
              alt="logo"
              width={219}
              height={72}
              className="lg:w-[204px] lg:h-[88px] w-[108px] h-[31px]"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="cursor-pointer flex lg:mt-0 mt-5 lg:justify-end justify-center"
        >
          <Image
            src="/assets/cartoon.svg"
            alt="logo"
            width={326}
            height={106}
          />
        </motion.div>
      </div>
      <div className="lg:hidden block w-[70%] mx-auto my-10 flex justify-between items-center">
        <Image src="/assets/icon.svg" alt="logo" width={25} height={28} />
        <Image src="/assets/insta.svg" alt="logo" width={25} height={28} />
        <Image src="/assets/linkedin.svg" alt="logo" width={25} height={28} />
        <Image src="/assets/discord.svg" alt="logo" width={25} height={28} />
      </div>
    </>
  );
}

export default Footer;
