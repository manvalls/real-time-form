"use client";
import { createContext } from "react";
import { FormErrorHandler, FormState } from "./types";

export const ErrorMessageContext = createContext<FormErrorHandler>(
  ({ error }) => error
);

export const FormStateContext = createContext<FormState>({
  pending: false,
  lastResponse: null,
});

export const FormOptionsContext = createContext({
  realTime: false,
  debounce: 300,
});
