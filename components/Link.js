import React from "react";
import A from "next/link";
import { useRouter } from "next/router";

const Link = ({ path = "", children, className = "" }) => {
  const router = useRouter();
  return (
    <A href={`/${router.locale}${path}`}>
      <a className={className}>{children}</a>
    </A>
  );
};

export default Link;
