import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Cart({ cartItems, setCartItems }) {
    const [complete, setComplete] = useState(false);

    function increaseQty(item) {
        if (item.qty < item.product.stock) {
            const updatedItems = cartItems.map(i =>
                i.product._id === item.product._id ? { ...i, qty: i.qty + 1 } : i
            );
            setCartItems(updatedItems);
        } else {
            toast.error("Maximum stock reached");
        }
    }

    function decreaseQty(item) {
        if (item.qty > 1) {
            const updatedItems = cartItems.map(i =>
                i.product._id === item.product._id ? { ...i, qty: i.qty - 1 } : i
            );
            setCartItems(updatedItems);
        } else {
            toast.error("Minimum quantity is 1");
        }
    }

    function deleteItem(itemId) {
        const updatedItems = cartItems.filter(i => i.product._id !== itemId);
        setCartItems(updatedItems);
    }

    const subtotalUnits = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const subtotalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.product.price, 0);

    function placeOrder() {
    fetch(process.env.REACT_APP_API_URL + '/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }),
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to place order');
            return response.json();
        })
        .then(() => {
            setCartItems([]);
            setComplete(true);
            toast.success('Order placed successfully!');
        })
        .catch(() => toast.error('Failed to place order'));
}

    return (
        <Fragment>
            {cartItems && cartItems.length > 0 ? (
                <div className="container container-fluid">
                    <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {cartItems.map((item) => (
                                <Fragment key={item.product._id}>
                                    <hr />
                                    <div className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img
                                                    src={item.product.images[0].image}
                                                    alt={item.product.name}
                                                    height="90"
                                                    width="115"
                                                />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/product/${item.product._id}`} className="adidas-link">
                                                    {item.product.name}
                                                </Link>
                                            </div>

                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">₹{item.product.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" onClick={() => decreaseQty(item)}>-</span>
                                                    <input
                                                        type="number"
                                                        className="form-control count d-inline"
                                                        value={item.qty}
                                                        readOnly
                                                    />
                                                    <span className="btn btn-primary plus" onClick={() => increaseQty(item)}>+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i
                                                    id="delete_cart_item"
                                                    className="fa fa-trash btn btn-danger"
                                                    onClick={() => deleteItem(item.product._id)}
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            ))}
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <span>Subtotal:</span>
                                    <span className="order-summary-values">{subtotalUnits} Unit(s)</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Est. Total:</span>
                                    <span className="order-summary-values">₹{subtotalPrice.toFixed(2)}</span>
                                </div>
                                <hr />
                                <button
                                    id="checkout_btn"
                                    className="btn btn-primary btn-block"
                                    onClick={placeOrder}
                                >
                                    {complete ? "Processing..." : "Place Order"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : complete ? (
                <div className="container mt-5 text-center">
                    <h2>Order Complete</h2>
                    <p>Your order has been placed successfully!</p>
                    <Link to="/" className="btn btn-success mt-3">Go to Home</Link>
                </div>
            ) : (
                <div className="container mt-5 text-center">
                    <h2>Your cart is Empty</h2>
                    <Link to="/" className="btn btn-secondary mt-3">Shop Now</Link>
                </div>
            )}
        </Fragment>
    );
}
