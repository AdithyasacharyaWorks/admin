'use client'
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import QRCode from 'qrcode';
import { Button } from "@/components/ui/button";
import { roomTableSchema } from "@/Schemas/TableSchema";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface RoomTableFormProps {
  type: "Add" | "Edit";
  data?: any;
}

const RoomTableForm: React.FC<RoomTableFormProps> = ({ type = "Add", data }) => {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(roomTableSchema),
    defaultValues: data,
  });

  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    if (type === "Edit" && data?.roomNumber) {
      QRCode.toDataURL(`http://localhost:3000/table/${data?.id}`)
        .then(url => {
          setQrCodeUrl(url);
        })
        .catch(error => {
          console.error("Error generating QR code:", error);
        });
    }
  }, [type, data]);

  const onSubmit = async (formData: any) => {
    try {
      setLoading(true);
      setShowError(false);
      setShowSuccess(false);

      if (type === "Add") {
        const qrCode = await QRCode.toDataURL(`http://localhost:3000/table/${formData.tableNumberOrRoomNumber}`);
        formData.qrCode = "Qrcode"; 
      }

      const payload = type === "Add"?{...formData,occupied:formData?.occupied?formData.occupied:false}:{...formData}

      if (type === "Add") {
        await axios.post("http://localhost:3000/api/table", payload);
      } else {
        await axios.put(`http://localhost:3000/api/table/${data.id}`, payload);
      }

      reset();
      setQrCodeUrl(null);
      toast.message('Success', {
        description: 'Successfully saved Room/Table',
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.replace("/table/list");
        router.refresh();
      }, 2000);
    } catch (error) {
      setShowError(true);
      toast.message('Error', {
        description: 'Error saving Room/Table',
      });
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
      <div className="font-bold text-2xl mb-4">
        {type === "Add" ? "Add Room/Table" : "Edit Room/Table"}
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-gray-700">Room/Table Number</label>
          <input
            {...register("tableNumberOrRoomNumber")}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.tableNumberOrRoomNumber && (
            <p className="text-red-500 font-thin">Room/Table Number is required*</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Room/Table Name</label>
          <input
            {...register("tableOrRoomName")}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Room Number (Optional)</label>
          <input
            {...register("roomNumber")}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Capacity</label>
          <input
            type="number"
            {...register("capacity", { valueAsNumber: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.capacity && (
            <p className="text-red-500 font-thin">Capacity is required*</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Floor</label>
          <input
            type="number"
            {...register("floor", { valueAsNumber: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.floor && (
            <p className="text-red-500 font-thin">Floor is required*</p>
          )}
        </div>
         <div className="mb-4 flex items-center space-x-4  mt-5">
            <div className="flex items-center">
              <Label htmlFor="occupied" className="mr-2">
                Occupied?
              </Label>
              <Controller
                name="occupied"
                control={control}
                render={({ field }) => {
                    console.log(field)
                    return(
                  <Switch
                    checked={field.value}
                    onChange={field.onChange}
                    onCheckedChange={field.onChange}
                  >
                  </Switch>
                )}}
              />
            </div>
            </div>
        <div>
          <label className="block text-gray-700">Notes</label>
          <input
            {...register("notes")}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
      </div>

      {type === "Edit" && qrCodeUrl && (
        <div className="mb-5">
          <label className="block text-gray-700">QR Code</label>
          <img src={qrCodeUrl} alt="QR Code" className="mt-2 w-32 h-32" />
        </div>
      )}

      <div className="flex justify-end items-center gap-5 mt-5">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : type === "Edit" ? "Update Room/Table" : "Save Room/Table"}
        </Button>
        <Button variant={"destructive"} onClick={(e) =>{e.preventDefault(); router.push('/table/list')}}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default RoomTableForm;
