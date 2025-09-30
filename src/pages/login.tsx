import { useAppSelector, useAppDispatch } from "../../reduxHooks";
import { login } from "../features/authenticate";

export default function Login() {
  const shoppingList = useAppSelector((state) => state.shoppingList);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>{shoppingList.Name}</h2>
      <button onClick={() => dispatch(login("Masiya "))}>display</button>
    </div>
  );
}
