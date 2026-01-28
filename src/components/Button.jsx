import React from "react";

export function Button({
  as: As = "button",
  className = "",
  children,
  ...props
}) {
  return React.createElement(As, { className, ...props }, children);
}
