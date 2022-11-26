import { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { rocketData } from "./seedData.js";
import {
  transformData,
  getNestedObject,
  insertNestedObject,
} from "./helpers.js";

export const useGetData = (props) => {
  const [finalTransformedData, setFinalTransformedData] = useState({});

  // const dynamicUrl = props.map((prop) => {
  //   return `/${prop}`; // TO DO: refactor this
  // }).join('');

  const transformDataForTree = useCallback((props) => {
    if (props) {
      const currTime = moment().format();
      const valueArray = props?.split(/[\s/]+/); // for usability: catches either space or forward slash and uses them as delimiters
      const traversedObj = getNestedObject(rocketData, valueArray);
      const newResult = { [valueArray?.at(-1)]: traversedObj };
      const transformedData = transformData(newResult, currTime);

      setFinalTransformedData(transformedData);
    }
  }, []);

  const getRemainingData = useCallback((data) => {
    setFinalTransformedData(data);
  }, []);

  const postData = (arg, prop) => {
    const args = arg.replace(/[\s/]+/, "."); // turns args into a string path to access nested object
    const traversedObj = insertNestedObject(rocketData, args, prop);
    setFinalTransformedData(traversedObj);
  };

  useEffect(() => {
    // fetch(`http://localhost:3000${dynamicUrl}`, // just here for mock purposes
    fetch(`http://localhost:3000/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.data.data)
      .then((response) => {})
      .catch(() => {
        transformDataForTree();
      });
  }, [props, finalTransformedData, transformDataForTree]);

  return {
    finalTransformedData,
    transformDataForTree,
    getRemainingData,
    postData,
  };
};

export const PostData = async (props) => {
  const [finalPostedData, setFinalTransformedData] = useState({});

  const dynamicUrl = props
    .map((prop) => {
      return `/${prop}`; // TO DO: refactor this
    })
    .join("");

  const postData = (arg, prop) => {
    const args = arg.replace(/[\s/]+/, ".");
    const traversedObj = insertNestedObject(rocketData, args, prop);
    setFinalTransformedData(traversedObj);
  };

  useEffect(() => {
    fetch(`http://localhost:3000${dynamicUrl}`, {
      Method: "POST",
      Headers: {
        "Content-Type": "application.json",
        Accept: "application/json",
      },
      // Body: JSON.stringify(data) // TO DO: include the new values in the body of the request
    })
      .then((response) => response.data.data)
      .then((response) => {
        postData();
      })
      .catch(() => {
        postData();
      });
  }, [dynamicUrl]);

  return { finalPostedData };
};
