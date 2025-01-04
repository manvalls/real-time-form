"use client";
import { useActionState, useState, useRef, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import { FormAction } from "./types";
import { FormStateContext } from "./context";
import { Wrapper } from "./wrapper";

type BaseProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export type FormProps<ResultType = any, ErrorType = any> = {
  action: FormAction<ResultType, ErrorType>;
  realTime?: boolean;
  debounce?: number;
  permalink?: string;
} & Omit<BaseProps, "action">;

export const Form = <ResultType = any, ErrorType = any>({
  action,
  realTime = false,
  debounce = 300,
  permalink,
  children,
  ...props
}: FormProps<ResultType, ErrorType>) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [scrollTargets, setScrollTargets] = useState<{
    [field: string]: React.RefObject<HTMLElement | null>[];
  }>({});

  const registerScrollTarget = (
    field: string,
    ref: React.RefObject<HTMLElement | null>
  ) => {
    setScrollTargets((scrollTargets) => ({
      ...scrollTargets,
      [field]: [...(scrollTargets[field] || []), ref],
    }));
  };

  const unregisterScrollTarget = (
    field: string,
    ref: React.RefObject<HTMLElement | null>
  ) => {
    setScrollTargets((scrollTargets) => ({
      ...scrollTargets,
      [field]: (scrollTargets[field] || []).filter((r) => r !== ref),
    }));
  };

  const realTimeSubmit = useDebouncedCallback(
    (submitter?: HTMLElement | null) => {
      if (realTime) {
        formRef.current?.requestSubmit(submitter);
      }
    },
    debounce
  );

  const [lastResponse, formAction, formPending] = useActionState(
    action,
    null,
    permalink
  );

  const [transitionPending, startTransition] = useTransition();

  const pending = formPending || transitionPending;

  const [pristine, setPristine] = useState<string[]>([]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(() => {
      formAction(new FormData(e.currentTarget));
    });
  }

  return (
    <FormStateContext.Provider
      value={{
        lastResponse,
        pending,
        pristine,
        setPristine,
        realTimeSubmit,
        scrollTargets,
        registerScrollTarget,
        unregisterScrollTarget,
      }}
    >
      <Wrapper includeAll ref={formRef}>
        {() => (
          <form
            {...props}
            action={formAction}
            onSubmit={onSubmit}
            ref={formRef}
          >
            {children}
          </form>
        )}
      </Wrapper>
    </FormStateContext.Provider>
  );
};
