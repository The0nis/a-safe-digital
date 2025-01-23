import React from "react";

interface CustomLoaderProps {
  type?: "full" | "default";
  loadingText?: string;
}

const CustomLoader: React.FC<CustomLoaderProps> = ({
  type = "default",
  loadingText,
}) => {
  const LoaderIcon = () => (
    <div className="relative">
      <div className="w-10 h-10 border-4 border-whitesmoke border-t-4 border-t-gray-300 rounded-full animate-spin"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-4 border-whitesmoke border-t-4 border-t-gray-200 rounded-full animate-rotatediv"></div>
    </div>
  );

  if (type === "full") {
    return (
      <div className="relative w-full h-screen inset-0 z-[9999] flex items-center justify-center  backdrop-blur-[2px]">
        <div className="flex flex-col items-center w-full h-full">
          <LoaderIcon />
          {loadingText && (
            <p className="mt-4 text-center text-gray-600">{loadingText}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen inset-0 z-[9999] flex items-center justify-center  backdrop-blur-[2px] flex flex-col items-center ">
      <LoaderIcon />
      {loadingText && (
        <p className="mt-4 text-center text-gray-600 ">{loadingText}</p>
      )}
    </div>
  );
};

export default CustomLoader;
