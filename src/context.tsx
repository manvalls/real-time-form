"use client";
import { createContext } from "react";
import { FormErrorHandler, FormState } from "./types";

export const ErrorMessageContext = createContext<FormErrorHandler>(
  ({ error }) => <div className="form-error">{error}</div>
);

export const FormStateContext = createContext<FormState>({
  pending: false,
  lastResponse: null,
  pristine: [],
  realTimeSubmit: () => {},
  setPristine: () => {},
});
