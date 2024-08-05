'use client'
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { menuItemSchema } from "@/Schemas/MenuSchema";
import { SingleImageDropzone } from "@/components/custom/single-image-dropdown";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEdgeStore } from "@/lib/edgestore";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Toaster,toast } from "sonner";

interface MenuItemFormProps {
  type: "Add" | "Edit";
  data?: any;
}

const Categories = ({ onSelect }: { onSelect: (value: string) => void }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/category");
        setCategories(response?.data?.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories?.map((category: any) => (
            <SelectItem key={category?.id} value={category?.name}>
              {category?.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const MenuItemForm: React.FC<MenuItemFormProps> = ({ type, data }) => {
  const { edgestore } = useEdgeStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(menuItemSchema),
    // defaultValues: { ...data },
  });

  const [file, setFile] = useState<File | null>();
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    if (data && type === "Edit") {
      setValue("menuItemName", data.menuItemName);
      setValue("price", data.price);
      setValue("menuDescription", data.menuDescription);
      setValue("tags", data?.tags);
      setValue("labels", data?.labels);
      setValue("category", data.category);
      // setValue("createdAt", new Date(data.createdAt));
      // setValue("updatedAt", new Date(data.updatedAt));
      setValue("featured", data.featured ?? false);
      setValue("available", data.available ?? true);
      setFile(data.imageUrl);
    } else {
      setValue("featured", false);
      setValue("available", true);
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

      console.log(formData)
      const payload = {
        ...formData,
        imageUrl,
        featured: formData.featured,
        available: formData.available,
        price: parseInt(formData.price),
      };
      console.log(data)

      if (type === "Add") {
        await axios.post("http://localhost:3000/api/menu", payload);
      } else {
        await axios.put(`http://localhost:3000/api/menu/${data.$id}`, {
          ...payload,
          id: data?.$id,
        });
      }

      reset();
      setFile(null);
      setProgress(0);
      setShowSuccess(true);
      toast.message('Sucess', {
        description: 'Sucesfully created Menu Item',
      })
      setTimeout(()=>{
        router.replace("/menu");
        router.refresh();
      },1000)
      
    } catch (error) {
      toast.message('Error', {
        description: 'Error creating menu item ',
      })
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
          <span className="text-3xl">
            {type === "Add" ? "Add" : "Edit"} Menu
          </span>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">
              Upload Image
            </label>
            {type === "Add" ? (
              <SingleImageDropzone
                width={200}
                height={200}
                value={file!}
                onChange={(file) => {
                  setFile(file);
                }}
              />
            ) : (
              <img
                src={data?.imageUrl}
                alt="Menu item"
                width={200}
                height={200}
              />
            )}
            {progress > 0 && (
              <div className="mt-2">
                <progress
                  value={progress}
                  max={100}
                  className="w-full h-2 bg-blue-200 rounded-full"
                />
                <p>{progress}% Uploaded</p>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-5">
            <div className="mb-4">
              <label className="block text-gray-700">Menu Item Name</label>
              <input
                {...register("menuItemName")}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.menuItemName && (
                <p className="text-red-500 font-thin">Name is required*</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.price && (
                <p className="text-red-500 font-thin">Price is required*</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Menu Description</label>
            <input
              {...register("menuDescription")}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.menuDescription && (
              <p className="text-red-500 font-thin">
                Menu description required*
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Tags (optional)</label>
            <input
              {...register("tags")}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Labels (optional)</label>
            <input
              {...register("labels")}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4 pt-1">
            <label className="block text-gray-700">Category</label>
            {type === "Edit" && (
              <div className="p-2">
                selected category is {"("}
                {data?.category}
                {")"}
              </div>
            )}
            <Categories
              onSelect={(value) => setValue("category", value)}
            />
          </div>

          <div className="mb-4 flex items-center space-x-4  mt-5">
            <div className="flex items-center">
              <Label htmlFor="available" className="mr-2">
                Available
              </Label>
              <Controller
                name="available"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onChange={field.onChange}
                    onCheckedChange={field.onChange}
                  >
                  </Switch>
                )}
              />
            </div>
            <div className="flex items-center">
              <Label htmlFor="featured" className="mr-2">
                Featured
              </Label>
              <Controller
                control={control}
                {...register("featured")}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onChange={field.onChange}
                    onCheckedChange={field.onChange}
                  >
                  </Switch>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-5 mt-5">
      <Button type="submit"  disabled={loading}>
        {loading ? "Submitting..." : `${type === "Add" ? "Add" : "Edit"} Menu`}
      </Button>
      <Button onClick={(e)=>{e.preventDefault(),router.push('/menu')}} variant={"destructive"}>Cancel</Button>
      </div>
    </form>
  );
};

export default MenuItemForm;
