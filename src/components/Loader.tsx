import React from "react";
import { GridLoader } from "react-spinners";
import {css} from '@emotion/react'

interface LoaderProps {}

const loaderCSS = css`
  margin-top: 8rem;
`;
export const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <GridLoader css={loaderCSS} size={50} color="#ef4444" />
  );
};
