"use client";

import { useContext, useState, useRef, useMemo, useEffect } from "react";
import { WrapperContext } from "./context";
import { useFormState } from "./hooks";
import { FormError } from "./types";

export type WrapperProps<T> = {
  include?: RegExp;
  exclude?: RegExp;
  includeAll?: boolean;
  scrollTarget?: boolean;
  ref?: React.RefObject<HTMLElement | null>;
  children: (wrappedFields: {
    fields: string[];
    errors: FormError<T>[];
    ref: React.RefObject<HTMLElement | null>;
  }) => React.ReactNode;
};

export function Wrapper<ErrorType = any>({
  scrollTarget,
  children,
  include,
  exclude,
  includeAll,
  ref: propsRef,
}: WrapperProps<ErrorType>) {
  const [fields, setFields] = useState<{ [field: string]: number }>({});
  const { lastResponse, registerScrollTarget, unregisterScrollTarget } =
    useFormState<any, ErrorType>();
  const [parentAddField, parentRemoveField] = useContext(WrapperContext);
  const ref = propsRef || useRef<HTMLElement>(null);

  const unfilteredList = useMemo(
    () => Object.keys(fields).filter((field) => fields[field] > 0),
    [fields]
  );

  const filteredList = useMemo(() => {
    if (!include || includeAll) {
      return unfilteredList;
    }

    return unfilteredList.filter((field) => include.test(field));
  }, [unfilteredList, include, includeAll]);

  const listWithoutExcludes = useMemo(() => {
    if (!include || includeAll || !lastResponse || lastResponse.success) {
      return filteredList;
    }

    return [
      ...new Set([
        ...filteredList,
        ...lastResponse.errors
          .filter(
            (error) => error.field && (includeAll || include.test(error.field))
          )
          .map((error) => error.field as string),
      ]),
    ];
  }, [filteredList, include, includeAll, lastResponse]);

  const fieldList = useMemo(() => {
    if (!exclude) {
      return listWithoutExcludes;
    }

    return listWithoutExcludes.filter((field) => !exclude.test(field));
  }, [listWithoutExcludes, exclude]);

  const errors = useMemo(() => {
    const responseErrors = lastResponse?.success
      ? []
      : lastResponse?.errors || [];

    const errorsWithField = responseErrors.filter((error) =>
      fieldList.includes(error.field as string)
    );

    if (!includeAll) {
      return errorsWithField;
    }

    const errorsWithoutField = responseErrors.filter((error) => !error.field);
    return errorsWithField.concat(errorsWithoutField);
  }, [lastResponse, includeAll, fieldList]);

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
  }, [fieldList, scrollTarget, ref]);

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
