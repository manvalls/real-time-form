"use client";
import { useFormState } from "./hooks";

export type LoadingIndicatorProps = {
  children?: React.ReactNode;
};

export const LoadingIndicator = ({ children }: LoadingIndicatorProps) => {
  const { pending } = useFormState();
  return pending ? children : null;
};
