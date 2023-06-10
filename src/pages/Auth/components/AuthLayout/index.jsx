import { FC } from "react";
import { Container } from "./AuthLayout.styles";

interface props {
  children: JSX.Element | null | string;
}

const AuthLayout: FC<props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default AuthLayout;
