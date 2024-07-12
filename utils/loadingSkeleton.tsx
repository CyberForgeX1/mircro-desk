const LatestLoading = () => {
  return (
    <div className="col-span-2 animate-pulse">
      <div className="h-[70vh] w-full bg-slate-200 rounded-md"></div>
      <div className="mt-8">
        <div className="h-[2vh] mb-3 w-full bg-slate-200 rounded-full"></div>
        <div className="h-[2vh] mb-3 bg-slate-200 rounded-full"></div>
        <div className="md:flex items-center gap-16">
          <div className="h-[2vh] w-40 bg-slate-200 rounded-full"></div>
          <div className="h-[2vh] w-52 bg-slate-200 rounded-full"></div>
          <div className="h-[2vh] w-32 bg-slate-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const AiBlockChain = () => {
  return (
    <>
      <div className="flex flex-col col-span-1 animate-pulse">
        <div className="bg-slate-200 h-[50vh] rounded-md"></div>
        <div className="bg-slate-200 h-[3vh] mt-2 rounded-full"></div>
        <div className="mt-2 flex gap-x-4">
          <div className="bg-slate-200 h-[2vh] w-20 rounded-full"></div>
          <div className="bg-slate-200 h-[2vh] w-28 rounded-full"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16 gap-y-5 col-span-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data, index) => (
          <div
            className="animate-pulse flex flex-col rounded-md justify-start"
            key={index}
          >
            <div className="h-[20vh] rounded-md bg-slate-200"></div>
            <div className="p-2">
              <div className="bg-slate-200 h-[2vh] rounded-full"></div>
              <div className="grid grid-cols-5 gap-x-2 mt-2">
                <div className="bg-slate-200 h-[2vh] col-span-3 rounded-full"></div>
                <div className="bg-slate-200 h-[2vh] col-span-2 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const BlogDetailSkeleton = () => {
  return (
    <div className="max-w-4xl animate-pulse mt-5">
      <div className="bg-slate-200 w-[30%] rounded-full h-[3vh]"></div>
      <div className="bg-slate-200 w-1/2 rounded-full h-[3vh] mt-4"></div>
      <div className="bg-slate-200 w-full rounded h-[60vh] mt-4"></div>
      <div className="grid grid-cols-6 mt-4 gap-x-2">
        {[1, 2, 3, 4, 5, 6].map((data, index) => (
          <div
            className="col-span-1 h-[2vh] bg-slate-200 rounded-full"
            key={index}
          ></div>
        ))}
      </div>
      <div className="grid grid-cols-4 mt-4 gap-x-2">
        {[1, 2, 3, 4].map((data, index) => (
          <div
            className="col-span-1 h-[2vh] bg-slate-200 rounded-full"
            key={index}
          ></div>
        ))}
      </div>
      <div className="grid grid-cols-3 mt-4 gap-x-2">
        {[1, 2, 3].map((data, index) => (
          <div
            className="col-span-1 h-[2vh] bg-slate-200 rounded-full"
            key={index}
          ></div>
        ))}
      </div>
      <div className="grid grid-cols-6 mt-4 gap-x-2">
        {[1, 2, 3, 4, 5, 6].map((data, index) => (
          <div
            className="col-span-1 h-[2vh] bg-slate-200 rounded-full"
            key={index}
          ></div>
        ))}
      </div>
      <div className="grid grid-cols-2 mt-4 gap-x-2">
        {[1, 2].map((data, index) => (
          <div
            className="col-span-1 h-[2vh] bg-slate-200 rounded-full"
            key={index}
          ></div>
        ))}
      </div>
      <div className="grid grid-cols-1 mt-4 gap-x-2">
        {[1].map((data, index) => (
          <div
            className="col-span-1 h-[2vh] bg-slate-200 rounded-full"
            key={index}
          ></div>
        ))}
      </div>
      {/* comments */}
      <div className="mt-10 max-w-[60%]">
        <div className="bg-slate-200 rounded-full h-[3vh] w-[60%]"></div>
        <div className="bg-slate-200 rounded h-[20vh] w-full mt-4"></div>
        <div className="bg-slate-200 rounded-full h-[3vh] w-[40%] mt-4"></div>
        {[1, 2, 3, 4, 5, 6].map((data, index) => (
          <div className="mt-16" key={index}>
            <div className="mt-4 flex gap-x-3 items-center">
              <div className="w-8 h-8 rounded-full bg-slate-200"></div>
              <div className="grid grid-cols-2 w-[40%] gap-x-3">
                <div className="col-span-1 h-[2vh] rounded-full bg-slate-200"></div>
                <div className="col-span-1 h-[2vh] rounded-full bg-slate-200"></div>
              </div>
            </div>
            <div className="h-[2vh] w-[80%] gap-x-3 rounded-full bg-slate-200 mt-4"></div>
            <div className="grid grid-cols-2 w-[70%] gap-x-3 mt-4">
              <div className="col-span-1 h-[2vh] rounded-full bg-slate-200"></div>
              <div className="col-span-1 h-[2vh] rounded-full bg-slate-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TrendingLoadingSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-y-4 mb-6 pb-3 border-b">
      <div className="bg-slate-200 h-[3vh] w-full rounded-full"></div>
      <div className="flex gap-x-5">
        <div className="h-[2vh] w-44 rounded-full bg-slate-200"></div>
        <div className="h-[2vh] w-40 rounded-full bg-slate-200"></div>
      </div>
    </div>
  );
};

const LatestUploadSkeleton = () => {
  return (
    <div className="col-span-6 lg:order-1 order-1 animate-pulse p-4 flex flex-col gap-y-4 mt-6">
      <div className="bg-slate-200 h-8 w-full rounded-full"></div>
      <div className="flex gap-x-5">
        <div className="h-6 w-44 rounded-full bg-slate-200"></div>
        <div className="h-6 w-40 rounded-full bg-slate-200"></div>
      </div>
      <div className="w-full h-full bg-slate-200 rounded-md"></div>
    </div>
  );
};

export {
  LatestLoading,
  AiBlockChain,
  BlogDetailSkeleton,
  TrendingLoadingSkeleton,
  LatestUploadSkeleton,
};
