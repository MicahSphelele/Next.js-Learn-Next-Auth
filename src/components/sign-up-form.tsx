"use client";

import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const clear = () => {

    if (error) {
      setError("");
    }

    if(success) {
      setSuccess("");
    }
    
  };

  const reset = () => {
    setFullName("");
    setEmail("");
    setPassowrd("");
  };

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const body = JSON.stringify({ name: fullName, email, password });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const result = await axios.post("api/sign-up", body, config);

      const response = result.data;

      console.log(`Response: ${JSON.stringify(result.data)}`);

      if (response.type === "success") {

        reset();
        setSuccess(response.message);

      }

      if (response.type === "error") {

        setError(response.message);

      }

    } catch (error) {
      
      console.log(`Error: ${error}`);

      setError("Something went wrong");
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Sign up with us</h1>
        <form id="sign-up-form" className="flex flex-col gap-3">
          <input
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
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
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounden-md mt-2 rounded-md">
              {success}
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
