import Button from "../buttons/Button";
import "./NumberPad.css";

let keys = [
  {
    value: "C",
    class: "spl",
  },
  {
    value: "BS",
    class: "spl",
  },
  {
    value: "%",
    class: "op",
  },
  {
    value: "/",
    class: "op",
  },
  {
    value: "7",
  },
  {
    value: "8",
  },
  {
    value: "9",
  },
  {
    value: "*",
    class: "op",
  },
  {
    value: "4",
  },
  {
    value: "5",
  },
  {
    value: "6",
  },
  {
    value: "-",
    class: "op",
  },
  {
    value: "1",
  },
  {
    value: "2",
  },
  {
    value: "3",
  },
  {
    value: "+",
    class: "op",
  },
  {
    value: "0",
    class: "unique",
  },
  {
    value: ".",
  },
  {
    value: "=",
    class: "op",
  },
];

let NumberPad = () => {

  return (
    <div className="number-pad">
      {keys.map((key, index) => {
        return (
          <Button
            key={index}
            value={key.value}
            className={key.class}
          />
        );
      })}
    </div>
  );
};

export default NumberPad;
