// "use client";

// import { useForm, useWatch } from "react-hook-form";

// import { useState, useEffect } from "react";

// type EmailFormProps = {
//   formtype: string;
//   setFormtype: (formtype: string) => void;
// };

// type FormData = {
//   countrycode: number;
//   otplocation: string;
// };
// export default function EmailForm() {
//   const { register, watch, handleSubmit } = useForm<FormData>();
//   const [formtype, setFormtype] = useState("email");
//   const [email, setEmail] = useState("");

//   const otplocation1 = watch("otplocation");

// ///potentional memory leak here 


//   // Use useEffect to check for numeric input
//   useEffect(() => {
//     if (otplocation1) {
//       // Check if the input contains only numbers
//       const isNumeric = /^\d+$/.test(otplocation1);
//       setFormtype(isNumeric ? "tel" : "email");
//     } else {
//       setFormtype("email");
//     }
//   }, [otplocation1]);

//   const onSubmit = async (data: any) => {
//     setEmail(data.email);
//     if (formtype === "tel") {
//       // Send OTP to phone
//       console.log("Sending OTP to phone");
//     } else {
//       // Send OTP to email
//       console.log("Sending OTP to email");
//     }
//   };

//   return (
//     <div className="text-black flex items-center justify-center ">
//       <div className=" pl-8 pr-8 pt-8  w-96">
//         <label htmlFor="email" className="text-gray-600">
//           Email or Phone
//         </label>
//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
//             <div className="flex flex-row">
//           {formtype === "tel" ? <p className="p-4 border-2 border-gray-300">+91</p> : null}
//           <input
//             type={formtype}
//             disabled
//             placeholder="this field is currently being tested"
//             {...register("otplocation")}
//             className="border border-gray-300  px-4 py-2 w-full"
//           />
//             </div>
//           <button
//             type="submit"
//             disabled={!otplocation1}
//             className="bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 transition-colors"
//           >
//             Continue
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
