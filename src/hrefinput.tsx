"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type BaseProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type HrefInput = Omit<BaseProps, "type" | "value"> & {
  name: string;
};

export const HrefInput = (props: HrefInput) => {
  const pathname = usePathname();
  const [href, setHref] = useState<string | undefined>();

  useEffect(() => {
    if (globalThis.location) {
      setHref(globalThis.location.href);
    }
  }, [pathname]);

  return <input {...props} type="hidden" value={href} />;
};
