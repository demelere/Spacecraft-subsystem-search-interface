// import { render, screen } from "@testing-library/react"; // testing-library is bugged when running d3 libraries
import { render } from "enzyme"; // enzyme library is returning an internal error and needs enzyme-adapter-react which is no longer supported and doesn't support React 18
import ComponentB from "./componentB";

const testData = [
  {
    name: "Mass",
    attributes: {
      Mass: 11,
      timestamp: "a few seconds ago",
    },
  },
];

describe("componentB", () => {
  it('renders an attribute with a css fill property of "#008001"', () => {
    const { component } = render(
      <ComponentB finalTransformedData={testData} />
    );
    let textAttribute = component.find("rd3t-label__title").props.style.fill;
    expect(textAttribute).toBe("#008001"); // enzyme library is returning an internal error and needs enzyme-adapter-react which is no longer supported and doesn't support React 18

    //   render(<ComponentB finalTransformedData={testData} />); // testing-library is bugged when running d3 libraries
    //   expect(screen.getByText("Mass")).toHaveStyle("fill: #008001");
  });
});
