// "use client";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button"; 
// import { menuItemSchema } from "@/Schemas/MenuSchema"; 
// import { color } from "framer-motion";
// import { useEdgeStore } from "@/lib/edgestore";
// import { SingleImageDropzone } from "@/components/custom/single-image-dropdown";
// import Categories from "./Categories";
// const MenuItemForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(menuItemSchema),
//   });
//   const [file, setFile] = useState<File>();
//   const [progress, setProgress] = useState<number>(0);

//   const onSubmit = (data: any) => {
//     console.log(data);
//     // Add your form submission logic here
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className=" mx-auto px-20 py-10 max-w-4xl shadow-md rounded-lg bg-white"
//     >
//       <div className="sm:flex  justify-around font-bold text-sm">
//         <div>
//           <span className="text-3xl">Add Menu</span>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">
//               Upload Image
//             </label>
//             <SingleImageDropzone
//               width={200}
//               height={200}
//               value={file}
//               onChange={(file) => {
//                 setFile(file);
//               }}
//             />
//             {progress > 0 && (
//               <div className="mt-2">
//                 <progress
//                   value={progress}
//                   max={100}
//                   className="w-full h-2 bg-blue-200 rounded"
//                 />
//                 <p>{progress}% Uploaded</p>
//               </div>
//             )}
            
//           </div>
//         </div>
//         <div>
//           {/* 1st div */}
//           <div className="grid grid-cols-2 gap-5 ">
//             <div className="mb-4">
//               <label className="block text-gray-700">Menu Item Name</label>
//               <input
//                 {...register("menuItemName")}
//                 className="mt-1 p-2 w-full border rounded-md"
//               />
//               {errors.menuItemName && (
//                 <p className="text-red-500 font-thin">Name is required*</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Price</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 {...register("price")}
//                 className="mt-1 p-2 w-full border rounded-md"
//               />
//               {errors.price && (
//                 <p className="text-red-500 font-thin">Price is required*</p>
//               )}
//             </div>
//           </div>
//           {/* 2nd div */}

//           <div className="mb-4">
//             <label className="block text-gray-700">Menu Description</label>
//             <input
//               {...register("menuDescription")}
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//             {errors.menuDescription && (
//               <p className="text-red-500 font-thin">
//                 Menu description required*
//               </p>
//             )}
//           </div>

//           {/* 3rd div */}
//           <div className="mb-4">
//             <label className="block text-gray-700">{"Tags (optional)"}</label>
//             <input
//               {...register("tags")}
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//             {/* {errors.tags && <p className="text-red-500"></p>} */}
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">{"Labels (optional)"}</label>
//             <input
//               {...register("labels")}
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div className="mb-4 pt-1">
//             <label className="block text-gray-700">Category</label>
//             <Categories />
//             {errors.category && (
//               <p className="text-red-500 font-thin">Select any category*</p>
//             )}
//           </div>
//         </div>
        
//       </div>
//       <div className="flex justify-end items-center gap-5 mt-5">
//         <Button>Submit</Button>
//         <Button variant={"destructive"}>Cancel</Button>
//       </div>
      

      
//     </form>
//   );
// };

// export default MenuItemForm;


import MenuItemForm from '@/components/custom/MenuForm'
import React from 'react'

const page = () => {
  return (
    <div>
      <MenuItemForm type="Add"/>
    </div>
  )
}

export default page