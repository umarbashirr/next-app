import { LoaderCircle } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <LoaderCircle
        size={36}
        className="text-primary animate-spin repeat-infinite"
      />
    </div>
  );
};

export default Loading;
