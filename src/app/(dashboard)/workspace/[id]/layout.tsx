import { ReactNode } from "react";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

const SingleWorkspaceLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-[280px_1fr] w-full h-full">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default SingleWorkspaceLayout;
