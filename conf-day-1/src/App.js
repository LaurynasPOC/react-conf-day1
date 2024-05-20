import React, { Suspense, useTransition } from "react";

const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data loaded");
    }, 1500);
  });
};

const DataComponent = () => {
  const data = fetchData();
  if (!data) throw data; // This will suspend the component until the promise resolves
  return <div className="text-lg text-green-500">{data}</div>;
};

const App = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <button
          onClick={() => {
            startTransition(() => {
              // Trigger a state change or navigation that might take some time
            });
          }}
          className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Start Transition
        </button>
        <Suspense
          fallback={
            <div className="text-gray-500 flex justify-center">Loading...</div>
          }
        >
          <DataComponent />
        </Suspense>
        {isPending && (
          <div className="text-gray-500 mt-4">Loading transition...</div>
        )}
      </div>
    </div>
  );
};

export default App;
