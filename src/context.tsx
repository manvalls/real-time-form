"use client";
import { createContext } from "react";
import { FormErrorHandler, FormState, FormError } from "./types";

export const ErrorMessageContext = createContext<FormErrorHandler>(
  ({ error }) => <div className="form-error">{error}</div>
);

export const FormErrorMessageProvider = ErrorMessageContext.Provider;

export const FormStateContext = createContext<FormState>({
  pending: false,
  lastResponse: null,
  pristine: [],
  setPristine: () => {},
  realTimeSubmit: () => {},
  scrollTargets: {},
  registerScrollTarget: () => {},
  unregisterScrollTarget: () => {},
});

export const WrapperContext = createContext<
  [(field: string) => void, (field: string) => void, string[], FormError<any>[]]
>([() => {}, () => {}, [], []]);
