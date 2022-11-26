import moment from "moment";

// To Do: helper functions traverse nested objects differently, refactor any overlapping functionality
const transformData = (object, time) => {
  const result = [];
  Object.keys(object).forEach((key) => {
    if (typeof object[key] === "object") {
      result.push({
        name: key,
        children: transformData(object[key], time),
      });
    } else {
      result.push({
        name: key,
        attributes: {
          [key]: object[key],
          timestamp: moment(time).fromNow(),
        },
      });
    }
  });
  return result;
};

const getNestedObject = (nestedObject, pathArray) => {
  return pathArray.reduce(
    (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    nestedObject
  );
};

// To Do: only inserts new property one level deep, refactor to be able to insert nested properties at any level
const insertNestedObject = (nestedObject, pathArray, newProperty) => {
  const currentTime = moment().format();
  const matchPathArray = Array.isArray(pathArray)
    ? pathArray
    : pathArray.match(/([^[.\]])+/g);

  matchPathArray.reduce((acc, key, i) => {
    if (acc[key] === undefined) acc[key] = {};
    if (i === matchPathArray.length - 1) acc[key] = newProperty;
    return acc[key];
  }, nestedObject);

  const transformedData = transformData(nestedObject, currentTime);
  return transformedData;
};

export { transformData, getNestedObject, insertNestedObject };
