import React, { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Tree from "react-d3-tree";

const useCenteredTree = () => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 4 });
    }
  }, []);
  return [translate, containerRef];
};

export default function ComponentB(props) {
  const { finalTransformedData, getRemainingData } = props || {};
  const [hoverState, setHoverState] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(false);
  const [clickConfirm, setClickConfirm] = useState(false);
  const [clickedNode, setClickedNode] = useState("");
  const [translate, containerRef] = useCenteredTree();

  const renderCustomNode = ({ nodeDatum, toggleNode, onNodeClick }) => {
    let colorAttribute;

    const { name, attributes, __rd3t } = nodeDatum || {};
    const { id } = __rd3t || {};

    const handleMouseOver = (props) => {
      if (props.target.getAttribute("id")) {
        setHoverState(true);
        setHoveredNode(props.target.getAttribute("id"));
        setClickedNode(name);
      } else {
        setHoverState(true);
        setHoveredNode(props.relatedTarget.getAttribute("id"));
        setClickedNode(name);
      }
    };

    const handleMouseOut = () => {
      setHoverState(false);
      setHoveredNode(null);
    };

    const handleDelete = (props) => {
      setClickConfirm(true);
      setClickedNode(name);
    };

    const deleteNode = (data, clickedNode) => {
      const newData = data.filter((item) => {
        if (item.name === clickedNode && clickedNode !== "Rocket") {
          return false;
        }
        if (item.children) {
          item.children = deleteNode(item.children, clickedNode);
        }
        return true;
      });
      return newData;
    };

    // To Do: refactor deleteNode so that it only deletes the object that clickedNode is found in, and not every other property with the same name as clickedNode
    const handleConfirm = (props) => {
      const result = deleteNode(finalTransformedData, clickedNode);
      getRemainingData(result);
      setClickConfirm(false);
    };

    if (attributes && Object.values(attributes)[0]) {
      if (Object.values(attributes)[0] > 10) {
        colorAttribute = "green-text";
      } else {
        colorAttribute = "normal-text";
      }
    } else {
      colorAttribute = "normal-text";
    }

    const textLayout = {
      title: {
        textAnchor: "start",
        x: 40,
      },
      attribute: {
        x: 40,
        dy: "1.2em",
      },
    };

    return (
      <>
        <circle r={15} id={id}></circle>
        <g
          className={`rd3t-label ${colorAttribute} svg`}
          overflow="visible"
          viewBox="0 0 200 200"
          onMouseOver={(props) => handleMouseOver(props)}
          onMouseOut={() => handleMouseOut()}
          name={name}
          id={id}
        >
          <text className="rd3t-label__title" {...textLayout.title} id={id}>
            {nodeDatum.name}
          </text>
          <text className="rd3t-label__attributes" id={id}>
            {nodeDatum.attributes &&
              Object.entries(nodeDatum.attributes).map(
                ([labelKey, labelValue], i) => (
                  <tspan key={`${labelKey}-${i}`} {...textLayout.attribute}>
                    {typeof labelValue === "boolean"
                      ? labelValue.toString()
                      : labelValue}
                  </tspan>
                )
              )}
          </text>
          <foreignObject x="5px" y="23px" width="120px" height="200px" id={id}>
            {hoverState && id === hoveredNode ? (
              <Button
                variant="contained"
                size="small"
                onClick={(props) => handleDelete(props)}
                id={id}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            ) : null}
            {clickConfirm && id === hoveredNode ? (
              <Button
                variant="contained"
                size="small"
                onClick={(props) => handleConfirm(props)}
                id={id}
                endIcon={<SendIcon />}
              >
                Confirm
              </Button>
            ) : null}
          </foreignObject>
        </g>
      </>
    );
  };

  return (
    <div
      id="treeWrapper"
      style={{ width: "100%", height: "100vh" }}
      ref={containerRef}
    >
      {finalTransformedData !== undefined ? (
        <Tree
          data={finalTransformedData}
          orientation="vertical"
          translate={translate}
          collapsible="true"
          renderCustomNodeElement={(
            nodeProps,
            onNodeMouseOver,
            onNodeMouseOut
          ) => renderCustomNode({ ...nodeProps })}
          hasInteractiveNodes={true}
        />
      ) : null}
    </div>
  );
}
