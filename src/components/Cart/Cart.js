import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import {useContext} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = props => {
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = item => {
        /* Why we set amount to 1?
        Because in CART(here), we can only add items to cart by step 1. So we can't add items by each click, with amount of 2. So we
        can't click and then the amount would go up by 3 or 4, that's can be happen only on the MenuItem comps.
        Therefore we specified amount to 1 here. */
        cartCtx.addItem({...item, amount: 1});
    };

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(item => <CartItem key={item.id}
                                             name={item.name}
                                             amount={item.amount}
                                             price={item.price}
                                             onRemove={cartItemRemoveHandler.bind(null, item.id)}
                                             onAdd={cartItemAddHandler.bind(null, item)}/>)}
    </ul>

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;
