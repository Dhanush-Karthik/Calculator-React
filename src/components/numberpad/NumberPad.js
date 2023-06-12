import Button from "../buttons/Button";
import "./NumberPad.css";

let keys = [
  {
    value: "C",
    class: "number-pad-item number-pad-item-spl",
  },
  {
    value: "BS",
    class: "number-pad-item number-pad-item-spl",
  },
  {
    value: "%",
    class: "number-pad-item number-pad-item-op",
  },
  {
    value: "/",
    class: "number-pad-item number-pad-item-op",
  },
  {
    value: "7",
    class: "number-pad-item",
  },
  {
    value: "8",
    class: "number-pad-item",
  },
  {
    value: "9",
    class: "number-pad-item",
  },
  {
    value: "*",
    class: "number-pad-item number-pad-item-op",
  },
  {
    value: "4",
    class: "number-pad-item",
  },
  {
    value: "5",
    class: "number-pad-item",
  },
  {
    value: "6",
    class: "number-pad-item",
  },
  {
    value: "-",
    class: "number-pad-item number-pad-item-op",
  },
  {
    value: "1",
    class: "number-pad-item",
  },
  {
    value: "2",
    class: "number-pad-item",
  },
  {
    value: "3",
    class: "number-pad-item",
  },
  {
    value: "+",
    class: "number-pad-item number-pad-item-op",
  },
  {
    value: "0",
    class: "number-pad-item number-pad-item-unique",
  },
  {
    value: ".",
    class: "number-pad-item",
  },
  {
    value: "=",
    class: "number-pad-item number-pad-item-op",
  },
];

let NumberPad = () => {

  return (
      <div className="number-pad">
        {keys.map((key, index) => {
          return <Button key={index} value={key.value} className={key.class} />;
        })}
      </div>
  );
};

export default NumberPad;
