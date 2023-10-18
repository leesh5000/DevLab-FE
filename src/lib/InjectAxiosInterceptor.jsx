import {useDispatch} from "react-redux";
import {setUpInterceptors} from "./client.jsx";

export const InjectAxiosInterceptor = () => {
  const dispatch = useDispatch();
  setUpInterceptors(dispatch);
  return <></>;
}
