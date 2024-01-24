"use client";

import Link from "next/link";
import { useState } from "react";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [error, setError] = useState("");

  const clear = () => {
    if (error) {
      setError("");
    }
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required.");
      return
    }


  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Sign up with us</h1>
        <form className="flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clear();
            }}
            type="text"
            placeholder="Full Name"
          />
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clear();
            }}
            type="text"
            placeholder="E-mail"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassowrd(e.target.value);
              clear();
            }}
            type="password"
            placeholder="Password"
          />
          <button
            onClick={(e) => onSubmit(e)}
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 rounded-md"
          >
            Sign up
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounden-md mt-2 rounded-md">
              Error message
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/"} replace>
            Already have an account?{" "}
            <span className="underline font-semibold">Sign in</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
