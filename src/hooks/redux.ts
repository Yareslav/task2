import { useSelector, useDispatch } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { StoreState, StoreDispatch } from "../redux/store";

export const useTypedSelector: TypedUseSelectorHook<StoreState> = useSelector;
export const useTypedDispatch = () => useDispatch<StoreDispatch>();
