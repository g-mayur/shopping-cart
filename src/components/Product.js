import React, { useCallback, useMemo } from "react";
import { add, remove } from "../redux/Slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CancelIcon from '@mui/icons-material/Cancel';
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const Product = ({ item }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const addToCart = useCallback(() => {
    dispatch(add(item));
    enqueueSnackbar(`Item has been added to cart!`, {
      variant: "success", autoHideDuration: 3000, anchorOrigin: { vertical: 'top', horizontal: 'right' },
      action: (key) => (
        <IconButton onClick={() => closeSnackbar(key)} color="inherit">
          <CancelIcon />
        </IconButton>
      )
    });
  }, [dispatch, enqueueSnackbar, closeSnackbar, item]);

  const removeFromCart = useCallback(() => {
    dispatch(remove(item.id));
    enqueueSnackbar(`Item has been removed from cart!`, {
      variant: "error", autoHideDuration: 3000, anchorOrigin: { vertical: 'top', horizontal: 'right' }, action: (key) => (
        <IconButton onClick={() => closeSnackbar(key)} color="inherit">
          <CancelIcon />
        </IconButton>
      )
    });
  }, [dispatch, enqueueSnackbar, closeSnackbar, item.id]);

  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price || 0);
  }, [item.price]);

  const isItemInCart = cart.some((p) => p.id === item.id);

  return (
    <>
      <div className="group flex flex-col border-2 border-solid border-stone-100 bg-white shadow-current gap-3 pt-4 rounded-lg overflow-hidden">
        <div className="h-52 flex items-center px-4 pb-2"><img src={item.image} alt={item.title} className="w-60 object-cover mx-auto" /></div>
        <div className="product-meta flex-1 px-4 pt-2">
          <h1 className="mt-3 mb-1 text-gray-700 font-semibold text-lg">{item.title}</h1>
          <p className="text-gray-700 font-medium text-sm">{item.description}</p>
        </div>
        <div className={`flex items-center justify-between w-full mt-5 ${isItemInCart ? "bg-red-700" : "bg-blue-700"} p-4`}>
          <button
            className="font-semibold flex items-center gap-1 text-white"
            onClick={isItemInCart ? removeFromCart : addToCart}>
            {isItemInCart ? <Delete /> : <ShoppingBasketIcon />}{" "}
            {isItemInCart ? "Remove item" : "Add to cart"}
          </button>
          <p className="text-white">{formattedPrice}</p>
        </div>
      </div>
    </>
  );
};

export default Product;
