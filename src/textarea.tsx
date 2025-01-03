"use client";
import { useField } from "./hooks";

type BaseProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export type TextAreaProps = BaseProps & {
  name: string;
};

export const TextArea = (props: TextAreaProps) => {
  const fieldProps = useField(props);
  return <TextArea {...props} {...fieldProps} />;
};
