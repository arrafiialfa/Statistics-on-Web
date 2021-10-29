import Item from "./Item";

const Row = ({ array }) => {
  return (
    <tr className="bg-gray-100 ">
      {array.map((item) => {
        return (
          <td key={item + Math.random()} className="px-3 border-2">
            {item}
          </td>
        );
      })}
    </tr>
  );
};

export default Row;
