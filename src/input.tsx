"use client";
import { useField } from "./hooks";

type BaseProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputProps = BaseProps & {
  name: string;
};

export const Input = (props: InputProps) => {
  const fieldProps = useField(props);
  return <input {...props} {...fieldProps} />;
};
