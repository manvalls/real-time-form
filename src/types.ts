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
) => FormResponse<ResultType, ErrorType>;

export type FormState<ResultType = any, ErrorType = any> = {
  pending: boolean;
  lastResponse: FormResponse<ResultType, ErrorType> | null;
};
