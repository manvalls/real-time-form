"use client";
import { Wrapper } from "./wrapper";

type BaseProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

export type LabelProps = {
  include?: RegExp;
  exclude?: RegExp;
  includeAll?: boolean;
  scrollTarget?: boolean;
  errorProps?: BaseProps;
} & BaseProps;

export const Label = ({
  include,
  exclude,
  includeAll,
  scrollTarget = true,
  children,
  errorProps,
  ...props
}: LabelProps) => {
  return (
    <Wrapper<any, HTMLLabelElement>
      include={include}
      exclude={exclude}
      includeAll={includeAll}
      scrollTarget={scrollTarget}
      children={({ ref, errors }) => {
        const labelProps = {
          ...props,
        };

        if (errors.length) {
          Object.assign(labelProps, errorProps);
        }

        return (
          <label ref={ref} {...labelProps}>
            {children}
          </label>
        );
      }}
    />
  );
};
