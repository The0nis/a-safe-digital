const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className=" relative w-full h-1 bg-transparent overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-full bg-blue-500 animate-horizontal-slide"></div>
      </div>
    </div>
  );
};

export default Loader;
