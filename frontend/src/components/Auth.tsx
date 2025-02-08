import { useEffect, useLayoutEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import viewPass from "../assets/view.png";
import hidePass from "../assets/hide.png";
import { toast, Toaster} from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Tag from "./Tag";

interface UserInput {
  email: string;
  fullname: string;
  password: string;
}

const authSchema = z.object({
  email: z.string().email("Invalid email format"),
  fullname: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthForm = z.infer<typeof authSchema>;

export const Auth = ({ type }: { type: string }) => {
  const [viewPassword, setViewPassword] = useState<Boolean>(false);
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<UserInput>({
    email: "",
    fullname: "",
    password: "",
  });

 
  async function sendRequest() {
      try {

        if(userInput.email.length == 0 || userInput.password.length == 0){
          return toast.error("Please fill in all fields");
        }
        if(type == "signup" && userInput.fullname.length == 0){
          return toast.error("Please fill in all fields");
        }
        if(userInput.password.length < 6){
          return toast.error("Password must be at least 6 characters");
        }
        if(!/\S+@\S+\.\S+/.test(userInput.email)){
          return toast.error("Invalid email format");
        }

      const response = await axiosInstance.post(
        `/auth/${type == "signup" ? "signup" : "login"}`,
        userInput
      );
      // console.log(response.data);
      
        navigate("/");
          
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ❌");
    }
  }

  return (
    <div className="lg:grid grid-cols-2 place-items-center min-h-screen relative">
      {/* <div className="text-xl ">{JSON.stringify(userInput)}</div> */}
      <Toaster position="top-center"/>
      <div className="flex min-h-full w-full flex-col justify-center px-10 py-45 lg:py-[9vw] lg:px-8 lg:scale-115">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm px-8 py-14 shadow-xl shadow-stone-600 rounded-xl font-bold border-1 border-gray-300">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm py-2 lg:text-xl text-lg">
            {type == "signup" ? (
              <h2 className="text-center lg:text-2xl/9 font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            ) : (
              <h2 className="text-center lg:text-2xl/9 font-bold tracking-tight text-gray-900 mt-[-10px]">
                Log in to your account
              </h2>
            )}
          </div>

          {type == "signup" ? (
            <div>
              <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <label
                  htmlFor="text"
                  className="block text-sm/6 font-bold text-gray-900"
                >
                  Full Name
                </label>
                <div className="">
                  <input
                    onChange={(e) => {
                      setUserInput({ ...userInput, fullname: e.target.value });
                    }}
                    type="text"
                    name="text"
                    id="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 lg:text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 text-sm font-light"
                  />
                </div>
              </div>
            </div>
          ) : null}
          <div className=" mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-bold text-gray-900"
                >
                  Email address
                </label>
                <div className="">
                  <input
                    onChange={(e) => {
                      setUserInput({ ...userInput, email: e.target.value });
                    }}
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 lg:text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6 font-light"
                  />
                </div>
              </div>

              <div>
                <div className="mt-5 relative flex items-center justify-between ">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-bold text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="">
                  <input
                    onChange={(e) => {
                      setUserInput({ ...userInput, password: e.target.value });
                    }}
                    type={viewPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className="font-light block w-full rounded-md bg-white px-3 py-1.5 lg:text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                  />
                  <button
                    type="button"
                    onClick={() => setViewPassword(!viewPassword)}
                    className="relative w-4 bottom-6.5 lg:left-73 left-49 cursor-pointer overflow-hidden"
                  >
                    {viewPassword ? (
                      <img src={viewPass} alt="" />
                    ) : (
                      <img src={hidePass} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center mt-[-2.5vw] lg:mt-[-0.3vw]">
                <button
                  onClick={()=>{
                    sendRequest();
                  }}
                  className="flex w-[50%] justify-center rounded-md bg-indigo-600 px-1 py-1 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                >
                  {type == "signup" ? "Sign in " : "Log in"}
                  
                </button>
              </div>
            </form>

            <p className="mt-3 text-center text-sm text-gray-500">
              {type == "signup" ? "Already a member? " : "Not a member? "}
              <a
                href={type == "signup" ? "/login" : "/signup"}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                {type == "signup" ? "Login" : "Signup"}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full hidden lg:block">
        <Tag/>
      </div>
    </div>
  );
};
