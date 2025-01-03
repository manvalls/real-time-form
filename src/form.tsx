"use client";
import { useActionState } from "react";
import { FormAction } from "./types";
import { FormStateContext, FormOptionsContext } from "./context";

type BaseProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export type FormProps<ResultType = any, ErrorType = any> = {
  action: FormAction<ResultType, ErrorType>;
  realTime?: boolean;
  debounce?: number;
} & BaseProps;

export const Form = <ResultType = any, ErrorType = any>({
  action,
  realTime = false,
  debounce = 300,
  children,
  ...props
}: FormProps<ResultType, ErrorType>) => {
  const [lastResponse, formAction, pending] = useActionState(action, null);

  return (
    <FormStateContext.Provider value={{ lastResponse, pending }}>
      <FormOptionsContext.Provider value={{ realTime, debounce }}>
        <form {...props} action={formAction}>
          {children}
        </form>
      </FormOptionsContext.Provider>
    </FormStateContext.Provider>
  );
};
