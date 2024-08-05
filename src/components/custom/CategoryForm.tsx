'use client'
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { SingleImageDropzone } from "@/components/custom/single-image-dropdown";
import { categorySchema } from "@/Schemas/CategorySchema";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";
import { toast, Toaster } from "sonner"

interface CategoryFormProps {
  type: "Add" | "Edit";
  data?: any;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ type, data }) => {
  const { edgestore } = useEdgeStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: data, // Set default values to pre-fill the form when editing
  });

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    if (data && type === "Edit") {
      // Pre-fill form fields if editing
      setValue("name", data.name);
      setValue("description", data.description);
      setValue("slug", data.slug);
    }
  }, [data, type, setValue]);

  const onSubmit = async (formData: any) => {
    try {
      setLoading(true);
      setShowError(false);
      setShowSuccess(false);

      let imageUrl = data?.imageUrl;

      if (!imageUrl && file) {
        const imageUpload = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress: any) => {
            setProgress(progress);
          },
        });
        imageUrl = imageUpload?.url;
      }

      const payload = {
        ...formData,
        imageUrl,
      };

      if (type === "Add") {
        await axios.post("http://localhost:3000/api/category", payload);
      } else {
        await axios.put(`http://localhost:3000/api/category/${data.$id}`, payload);
      }

      reset();
      setFile(null);
      setProgress(0);
      toast.message('Sucess', {
        description: 'Sucesfully created Category',
      })
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.replace("/category");
        router.refresh();
      }, 2000);
    } catch (error) {
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto px-20 py-10 max-w-4xl shadow-md rounded-lg bg-white"
    >
       <Toaster position="top-center" className="mt-10" />
      <div className="sm:flex justify-around font-bold text-sm">
        <div>
          <span className="text-3xl">{type === "Add" ? "Add" : "Edit"} Category</span>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">
            {data?.imageUrl?"":" Upload Image"}
            </label>
            {type === "Add" ? (
              <SingleImageDropzone
                width={200}
                height={200}
                value={file!}
                onChange={(file) => {
                  setFile(file!);
                }}
              />
            ) : (
              data?.imageUrl && (
                <img src={data.imageUrl} alt="Category Image" className="mt-2  w-52 h-auto" />
              )
            )}
            {progress > 0 && (
              <div className="mt-2">
                <progress
                  value={progress}
                  max={100}
                  className="w-full h-2 bg-blue-200 rounded"
                />
                <p>{progress}% Uploaded</p>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-5">
            <div className="mb-4">
              <label className="block text-gray-700">Category Name</label>
              <input
                {...register("name")}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.name && (
                <p className="text-red-500 font-thin">Name is required*</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Slug</label>
              <input
                {...register("slug")}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.slug && (
                <p className="text-red-500 font-thin">Slug is required*</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              {...register("description")}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.description && (
              <p className="text-red-500 font-thin">Description is required*</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-5 mt-5">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : type==="Edit"?"Update Category":"Save Category"}
        </Button>
        <Button variant={"destructive"} onClick={(e) => {e.preventDefault();router.back()}}>
          Cancel
        </Button>
      </div>

    </form>
  );
};

export default CategoryForm;
