"use client";
import { useField } from "./hooks";

type BaseProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export type SelectProps = BaseProps & {
  name: string;
};

export const Select = (props: SelectProps) => {
  const fieldProps = useField(props);
  return <select {...props} {...fieldProps} />;
};
