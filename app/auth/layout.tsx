import Logo from "@/assets/logo";
import Sphere from "@/assets/sphere";
import ThemeSwitch from "@/components/theme-kits/ThemeSwich";
import React, { Suspense } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full h-screen overflow-hidden px-4 pb-[10rem] relative">
      <div className="absolute top-0 left-0 right-0 h-full mx-auto w-11/12 z-1">
        <div className="absolute w-px h-full top-0 left-1/4 bg-white bg-opacity-10 overflow-hidden">
          <div
            className="absolute h-1/4 w-full top-1/2 left-0 bg-gradient-to-b from-transparent to-white animate-drop"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
        <div className="absolute w-px h-full top-0 left-1/2 bg-white bg-opacity-10 overflow-hidden">
          <div
            className="absolute h-1/4 w-full top-1/2 left-0 bg-gradient-to-b from-transparent to-white animate-drop"
            style={{ animationDelay: "0.75s" }}
          ></div>
        </div>
        <div className="absolute w-px h-full top-0 left-3/4 bg-white bg-opacity-10 overflow-hidden z-10">
          <div
            className="absolute h-1/4 w-full top-1/2 left-0 bg-gradient-to-b from-transparent to-white animate-drop"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>
      <div className="w-full flex items-end justify-end p-4">
        {/* <ModeToggle /> */}
        <Suspense fallback={null}>
          <ThemeSwitch />
        </Suspense>
      </div>
      <div className="flex w-full flex fex-col tab:flex-row items-center justify-center h-full z-10">
        <div className="w-full h-full flex flex-col items-center justify-center gap-[3rem]">
          <div>
            <Logo width="w-[15rem]" />
          </div>
          {/* Form goes here */}
          <div className="z-[99999]">{children}</div>
        </div>
        <div className="w-full h-full hidden tab:flex items-center justify-center">
          <Sphere />
        </div>
      </div>
    </div>
  );
};

export default Layout;
