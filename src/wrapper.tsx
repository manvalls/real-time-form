"use client";

import { useContext, useState, useRef, useMemo, useEffect } from "react";
import { WrapperContext } from "./context";
import { useFormState } from "./hooks";
import { FormError } from "./types";

export type WrapperProps<T> = {
  scrollTarget: boolean;
  children: (wrappedFields: {
    fields: string[];
    errors: FormError<T>[];
    ref: React.RefObject<HTMLElement | null>;
  }) => React.ReactNode;
};

export function Wrapper<ErrorType>({
  scrollTarget,
  children,
}: WrapperProps<ErrorType>) {
  const [fields, setFields] = useState<{ [field: string]: number }>({});
  const { lastResponse, registerScrollTarget, unregisterScrollTarget } =
    useFormState<any, ErrorType>();
  const [parentAddField, parentRemoveField] = useContext(WrapperContext);
  const ref = useRef<HTMLElement>(null);

  const fieldList = useMemo(
    () => Object.keys(fields).filter((field) => fields[field] > 0),
    [fields]
  );

  const errors = useMemo(
    () =>
      (lastResponse?.success ? [] : lastResponse?.errors || []).filter(
        (error) => error.field && fieldList.includes(error.field)
      ),
    [lastResponse, fieldList]
  );

  useEffect(() => {
    if (scrollTarget) {
      fieldList.forEach((field) => {
        registerScrollTarget(field, ref);
      });

      return () => {
        fieldList.forEach((field) => {
          unregisterScrollTarget(field, ref);
        });
      };
    }
  }, [fieldList, scrollTarget]);

  const addField = (field: string) => {
    setFields((fields) => ({
      ...fields,
      [field]: (fields[field] || 0) + 1,
    }));

    parentAddField(field);
  };

  const removeField = (field: string) => {
    setFields((fields) => ({
      ...fields,
      [field]: (fields[field] || 0) - 1,
    }));

    parentRemoveField(field);
  };

  return (
    <WrapperContext.Provider value={[addField, removeField, fieldList, errors]}>
      {children({ fields: fieldList, errors, ref })}
    </WrapperContext.Provider>
  );
}
