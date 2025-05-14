/** @format */

import type React from "react";
import AddNewUser from "./AddNewUser";
type Props = {
  children: React.ReactNode;
};

const PageWrapper = ({ children }: Props) => {
  return (
    <>
      <header className="bg-gray-200 text-2xl p-8 flex justify-end">
        <AddNewUser />
      </header>
      <div>{children}</div>
    </>
  );
};

export default PageWrapper;
