"use client";
import { useContext } from "react";
import type { FormState } from "./types";
import { FormStateContext } from "./context";

export const useFormState = <ResultType = any, ErrorType = any>() => {
  const formState: FormState<ResultType, ErrorType> =
    useContext(FormStateContext);

  return formState;
};
