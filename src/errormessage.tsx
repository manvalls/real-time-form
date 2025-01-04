"use client";
import { useContext } from "react";
import { useWrapperContext } from "./hooks";
import { ErrorMessageContext } from "./context";

export const ErrorMessage = () => {
  const { errors } = useWrapperContext();
  const errorHandler = useContext(ErrorMessageContext);

  return <>{errors.map(errorHandler)}</>;
};
