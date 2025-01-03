"use client";
import { useContext } from "react";
import type { FormState } from "./types";
import { FormStateContext } from "./context";

export const useFormState = <ResultType = any, ErrorType = any>(): FormState<
  ResultType,
  ErrorType
> => {
  return useContext(FormStateContext);
};
