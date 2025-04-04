"use client";
import type { ReactElement } from "react";

export type FormError<T = any> = {
  field?: string;
  error: T;
};

export type FormErrorHandler<T = any> = (
  error: FormError<T>
) => ReactElement | null;

export type FormErrorResponse<T = any> = {
  success: false;
  errors: FormError<T>[];
};

export type FormSuccessResponse<T> = {
  success: true;
  result: T;
};

export type FormResponse<ResultType = any, ErrorType = any> =
  | FormSuccessResponse<ResultType>
  | FormErrorResponse<ErrorType>;

export type FormAction<ResultType = any, ErrorType = any> = (
  lastResponse: FormResponse<ResultType, ErrorType> | null,
  formData: FormData
) => Promise<FormResponse<ResultType, ErrorType>>;

export type FormState<ResultType = any, ErrorType = any> = {
  pending: boolean;
  lastResponse: FormResponse<ResultType, ErrorType> | null;
  pristine: string[];
  setPristine: React.Dispatch<React.SetStateAction<string[]>>;
  realTimeSubmit: (submitter?: HTMLElement | null) => void;

  scrollTargets: {
    [field: string]: React.RefObject<HTMLElement | null>[];
  };

  registerScrollTarget: (
    field: string,
    ref: React.RefObject<HTMLElement | null>
  ) => void;
  unregisterScrollTarget: (
    field: string,
    ref: React.RefObject<HTMLElement | null>
  ) => void;
};
