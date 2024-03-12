import React, { useCallback, useMemo } from "react";
import { Delete } from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';
import { remove } from "../redux/Slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { IconButton } from "@mui/material";

const CartItem = ({ item }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const removeItemFromCart = useCallback(() => {
    dispatch(remove(item.id));
    enqueueSnackbar(`Item has been removed from cart!`, {
      variant: "error", autoHideDuration: 3000, anchorOrigin: { vertical: 'top', horizontal: 'right' },
      action: (key) => (
        <IconButton onClick={() => closeSnackbar(key)} color="inherit">
          <CancelIcon />
        </IconButton>
      )
    });
  }, [dispatch, enqueueSnackbar, closeSnackbar, item.id]);

  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price || 0);
  }, [item.price]);

  return (
    <div className="flex items-center p-5 justify-between border-b-2 divide-slate-200">
      <div className="flex items-center p-3 flex-1">
        <img src={item.image} className="w-20 rounded-lg" alt="" />
        <div className="ml-10 self-start flex-1">
          <h1 className="text-xl text-blue-700 font-semibold">
            {item.title}
          </h1>
          <p>{formattedPrice}</p>
        </div>
      </div>
      <div onClick={removeItemFromCart} className="cursor-pointer p-3">
        <Delete className="text-red-500" />
      </div>
    </div>
  );
};

export default CartItem;