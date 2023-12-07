import { Button } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../App/store/store";
import { decrement, increamentByAmount, increment } from "../scratch/testSlice";

function Scratch() {
  const { data } = useAppSelector((state) => state.test);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Sratch page</h1>
      <h3>The data is {data}</h3>
      <Button
        onClick={() => dispatch(increment())}
        color="green"
        content="increment"
      />
      <Button
        onClick={() => dispatch(decrement())}
        color="orange"
        content="decrement"
      />

      <Button
        onClick={() => dispatch(increamentByAmount(5))}
        color="brown"
        content="increment by 5"
      />
    </div>
  );
}

export default Scratch;
