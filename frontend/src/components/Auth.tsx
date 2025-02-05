import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import viewPass from "../assets/view.png";
import hidePass from "../assets/hide.png";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: zodResolver(authSchema),
  });

  
  async function sendRequest() {
      try {
          const response = await axiosInstance.post(
              `/auth/${type == "signup" ? "signup" : "login"}`,
              userInput
            );

            useEffect(() => {
              toast.success('Hello, world!');
            }, [sendRequest]);
      // console.log(response.data);
            
            setTimeout(() => {
                navigate("/");
            }, 2000);
    } catch (error) {
      console.log(error);
      toast(
        type == "signup" ? "Account creation failed" : "Login failed"
      );
    }
  }

  return (
    <div>
      {/* <div className="text-xl ">{JSON.stringify(userInput)}</div> */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        
      <div className="flex min-h-full flex-col justify-center px-10 py-30 lg:py-[9vw] lg:px-8 ">
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
                    className="relative w-4 bottom-12.5 lg:left-73 left-50 cursor-pointer overflow-hidden"
                  >
                    {viewPassword ? (
                      <img src={viewPass} alt="" />
                    ) : (
                      <img src={hidePass} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center lg:mt-[-13px] mt-[-20px]">
                <button
                  onClick={sendRequest}
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
    </div>
  );
};
