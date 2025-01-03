"use client";
import { useActionState, useState, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { FormAction } from "./types";
import { FormStateContext } from "./context";

type BaseProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export type FormProps<ResultType = any, ErrorType = any> = {
  action: FormAction<ResultType, ErrorType>;
  realTime?: boolean;
  debounce?: number;
  permalink?: string;
} & BaseProps;

export const Form = <ResultType = any, ErrorType = any>({
  action,
  realTime = false,
  debounce = 300,
  permalink,
  children,
  ...props
}: FormProps<ResultType, ErrorType>) => {
  const formRef = useRef<HTMLFormElement>(null);

  const realTimeSubmit = useDebouncedCallback(
    (submitter?: HTMLElement | null) => {
      if (realTime) {
        formRef.current?.requestSubmit(submitter);
      }
    },
    debounce
  );

  const [lastResponse, formAction, pending] = useActionState(
    action,
    null,
    permalink
  );

  const [pristine, setPristine] = useState<string[]>([]);

  return (
    <FormStateContext.Provider
      value={{ lastResponse, pending, pristine, setPristine, realTimeSubmit }}
    >
      <form {...props} action={formAction} ref={formRef}>
        {children}
      </form>
    </FormStateContext.Provider>
  );
};
