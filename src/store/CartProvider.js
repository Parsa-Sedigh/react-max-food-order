import CartContext from "./cart-context";
import {useReducer} from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD')  {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        /* if sushi was ALREADY part of the cart and we added two more sushies, then we need to update the amount of that EXISTING
        sushi which is part of the cart.
        This if statement gets executed if added item is already part of the cart items array.*/
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];

            /* We picked the old item(updatedItems[existingCartItemIndex]) which we identified in the cart items array and we overwrite it
            with this updatedItem */
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            /* This block executes if the added item is added for the first time to that cart items array.*/
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);

        /* Now get the id itself: */
        const existingItem = state.items[existingCartItemIndex];

        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;

        /* This if gets executed if it's the last item of that type in the cart, which we wanna remove that last one now.
        So in this case, we wanna remove the ENTIRE ITEM from the array. */
        if (existingItem.amount === 1) {
            /* In this filter(), we make sure that all items where the id is not equal to action.id are kept, because in that case,
            item.id !== action.id returns true and hence the items are kept. But the one item where the item.id is equal to the id
            of the action, which is the to be-removed-id , for that one item, we return false and then, we remove that item from the
            newly generated array which is assigned to updatedItems. */
            updatedItems = this.state.items.filter(item => item.id !== action.id);
        } else {
            /* Here, we wanna KEEP THE ITEM in the array or cart, BUT we wanna decrease the amount of that item.  */
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};

            /* create a new array with old items, but then override one of them which is the item for that index which we got in const
            named existingCartItemIndex. */
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    /* Fallback in case we had other action type: */
    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item});
    };
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id: id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;
