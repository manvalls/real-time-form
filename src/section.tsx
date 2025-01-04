"use client";
import { Wrapper } from "./wrapper";

type BaseProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export type SectionProps = {
  include?: RegExp;
  exclude?: RegExp;
  includeAll?: boolean;
  scrollTarget?: boolean;
  errorProps?: BaseProps;
  errorClassName?: string;
} & BaseProps;

export const Section = ({
  include,
  exclude,
  includeAll,
  scrollTarget = true,
  children,
  errorProps,
  errorClassName,
  ...props
}: SectionProps) => {
  return (
    <Wrapper<any, HTMLElement>
      include={include}
      exclude={exclude}
      includeAll={includeAll}
      scrollTarget={scrollTarget}
      children={({ ref, errors }) => {
        const labelProps = {
          ...props,
        };

        if (errors.length) {
          if (errorClassName) {
            labelProps.className += ` ${errorClassName}`;
          }

          Object.assign(labelProps, errorProps);
        }

        return (
          <section ref={ref} {...labelProps}>
            {children}
          </section>
        );
      }}
    />
  );
};
