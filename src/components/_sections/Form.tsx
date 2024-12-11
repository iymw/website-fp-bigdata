"use client";

import { Button, Input, Image } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { api_1, api_2 } from "@/variable";
import { Inputs } from "@/productType";

const Form = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading_1, setLoading_1] = useState(false);
  const [loading_2, setLoading_2] = useState(false);
  const [category, setCategory] = useState<string>("");
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading_1(true);
    try {
      await axios.post(`${api_1}/products`, { ...data });
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading_1(false);
    }
  };

  const handleAI = async () => {
    setLoading_2(true);
    try {
      const response = await axios.post(`${api_2}/predict`, {
        product_name: getValues("product_name"),
      });
      const data = response.data.predicted_category;
      setCategory(data);
      setValue("category", data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading_2(false);
    }
  };

  return (
    <>
      <section className="flex">
        <div className="flex h-screen w-full items-center">
          <form
            className="mx-auto w-full space-y-8 rounded-xl px-20"
            onSubmit={handleSubmit(onSubmit)}
          >
            <article className="space-y-3">
              <p className="text-5xl font-semibold">Create Product</p>
              <p>
                Leverage our latest AI model to revolutionize product
                categorization and elevate the user search experience!
              </p>
            </article>
            <div className="space-y-2">
              <div className="flex gap-4">
                <Input
                  isInvalid={errors?.product_name ? true : false}
                  errorMessage="Product name field is required"
                  label="Product name"
                  size="md"
                  {...register("product_name", { required: true })}
                />
                <Input
                  className="w-full"
                  errorMessage="Category field is required"
                  isInvalid={errors?.category ? true : false}
                  label="Category"
                  size="md"
                  value={category}
                  {...register("category", { required: true })}
                />
              </div>
              <Button
                className="mt-6 w-full"
                isLoading={loading_2}
                onClick={handleAI}
                type="button"
              >
                Generate Category
              </Button>
            </div>
            <div className="flex gap-4">
              <Input
                errorMessage="Image link field is required"
                isInvalid={errors?.img_link ? true : false}
                label="Image Link"
                size="md"
                {...register("img_link", { required: true })}
              />
              <Input
                errorMessage="Price field is required"
                isInvalid={errors?.actual_price ? true : false}
                label="Price"
                size="md"
                {...register("actual_price", { required: true })}
              />
            </div>
            <Button
              className="mt-6 w-full bg-orange-400"
              isLoading={loading_1}
              type="submit"
            >
              Create Product
            </Button>
          </form>
        </div>
        <div className="flex h-screen w-full items-center justify-center bg-[#F8F8F8]">
          <Link href="/">
            <Image src="/online.png" alt="Online" width={500}></Image>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Form;
