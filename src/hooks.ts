"use client";
import { useContext, useEffect } from "react";
import type { FormState } from "./types";
import { FormStateContext } from "./context";
import React = require("react");

export const useFormState = <ResultType = any, ErrorType = any>(): FormState<
  ResultType,
  ErrorType
> => {
  return useContext(FormStateContext);
};

export type FieldProps = {
  name: string;
  onChange?: Function;
  onBlur?: Function;
};

export const useField = (props: FieldProps) => {
  const { setPristine, realTimeSubmit } = useFormState();

  useEffect(() => {
    setPristine((pristine) => {
      if (!pristine.includes(props.name)) {
        return [...pristine, props.name];
      }

      return pristine;
    });

    return () => {
      setPristine((pristine) => pristine.filter((p) => p !== props.name));
    };
  }, [props.name]);

  function onBlur(this: any) {
    setPristine((pristine) => pristine.filter((p) => p !== props.name));
    props?.onBlur?.apply(this, arguments);
  }

  function onChange(this: any, e: React.ChangeEvent<any>) {
    const elem = e.target;

    const isTextField =
      (elem.tagName === "INPUT" &&
        ["text", "password", "email", "number", "tel", "url"].includes(
          elem.type
        )) ||
      elem.tagName === "TEXTAREA";

    if (!isTextField) {
      setPristine((pristine) => pristine.filter((p) => p !== props.name));
    }

    realTimeSubmit();
    props?.onChange?.apply(this, arguments);
  }

  return {
    ...props,
    onBlur,
    onChange,
  };
};
