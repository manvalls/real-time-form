"use client";
import { useWrapperContext, useFormState } from "./hooks";

type BaseProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type ErrorNoticeProps = {
  scrollToError?: boolean;
  children?: React.ReactNode;
} & BaseProps;

export const ErrorNotice = ({
  children,
  scrollToError,
  ...props
}: ErrorNoticeProps) => {
  const { errors } = useWrapperContext();
  const { scrollTargets } = useFormState();

  function scroll() {
    for (const error of errors) {
      if (!error.field) {
        continue;
      }

      for (const ref of scrollTargets[error.field] || []) {
        if (ref.current) {
          ref.current.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
    }
  }

  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    if (scrollToError) {
      scroll();
    }

    props.onClick?.(e);
  }

  return errors.length ? (
    <div {...props} onClick={onClick}>
      children
    </div>
  ) : null;
};
