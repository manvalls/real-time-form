"use client";
import { createContext } from "react";
import { ErrorHandler } from "./types";

export const ErrorMessageContext = createContext<ErrorHandler>(
  (error) => error
);

export const FormContext = createContext<{
  pending: boolean;
  success: boolean;
  errors: { [key: string]: any[] };
}>({
  pending: false,
  success: false,
  errors: {},
});
