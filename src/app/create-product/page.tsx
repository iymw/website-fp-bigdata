"use client";

import Form from "@/components/Form";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { api_1, api_2 } from "@/variable";
import { Inputs } from "@/productType";

const Page = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading_1, setLoading_1] = useState(false);
  const [loading_2, setLoading_2] = useState(false);
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
      setValue("category", data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading_2(false);
    }
  };

  return (
    <Form>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <article className="mb-10 space-y-3 text-center">
          <p className="text-4xl font-semibold sm:text-5xl">
            Create New Product
          </p>
          <p className="text-lg">
            Leverage our latest AI model to revolutionize product categorization
            and elevate the user search experience!
          </p>
        </article>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input
            className="w-full"
            isInvalid={errors?.product_name ? true : false}
            errorMessage="Product name field is required"
            label="Product name"
            size="md"
            {...register("product_name", { required: true })}
          />
          <div className="flex w-full items-start gap-4">
            <Input
              className="w-full"
              errorMessage="Category field is required"
              isInvalid={errors?.category ? true : false}
              label="Category"
              size="md"
              value={getValues("category")}
              {...register("category", { required: true })}
            />
            <Button
              className=""
              isLoading={loading_2}
              onClick={handleAI}
              type="button"
              size="lg"
            >
              Generate
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
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
          className="!mt-8 w-full bg-orange-400"
          isLoading={loading_1}
          type="submit"
        >
          Create Product
        </Button>
      </form>
    </Form>
  );
};

export default Page;
