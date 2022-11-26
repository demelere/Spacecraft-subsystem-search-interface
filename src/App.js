import React from "react";
import ComponentA from "./components/componentA";
import ComponentB from "./components/componentB";
import { useGetData } from "./services/api.js";
import "./App.css";

function App() {
  const {
    finalTransformedData,
    transformDataForTree,
    getRemainingData,
    postData,
  } = useGetData({});

  return (
    <div className="App">
      <div>
        <ComponentA
          transformDataForTree={transformDataForTree}
          postData={postData}
        />
      </div>
      <div>
        <ComponentB
          finalTransformedData={finalTransformedData}
          getRemainingData={getRemainingData}
        />
      </div>
    </div>
  );
}

export default App;
