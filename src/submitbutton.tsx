"use client";

import { useFormState } from "./hooks";

type BaseProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type SubmitButtonProps = Omit<BaseProps, "type">;

export const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
  const { pending, pristine, setPristine, lastResponse } = useFormState();

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (
      pending ||
      (lastResponse &&
        !lastResponse.success &&
        lastResponse.errors.some(
          (error) => error.field && pristine.includes(error.field)
        ))
    ) {
      event.preventDefault();
    }

    setPristine([]);
    props.onClick?.(event);
  };

  return (
    <button
      {...props}
      disabled={
        !!(
          props.disabled ||
          pending ||
          (lastResponse &&
            !lastResponse.success &&
            lastResponse.errors.some(({ field }) => field) &&
            !pristine.length)
        )
      }
      type="submit"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
