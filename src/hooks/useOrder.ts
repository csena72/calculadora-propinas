import { useState } from 'react';
import type { MenuItem, OrderItem } from '../types';

export default function useOrder() {

    const [order, setOrder] = useState<OrderItem[]>([]);
    const [tip, setTip] = useState<number>(0);

    const addItem = (item: MenuItem) => {

        const existingItem = order.find((orderItem) => orderItem.id === item.id);

        if (existingItem) {
            const updatedOrder = order.map((orderItem) => {
                if (orderItem.id === item.id) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                } else {
                    return orderItem
                }
            })
            setOrder(updatedOrder)
            return
        }
        
        const newItem: OrderItem = {
            ...item,
            quantity: 1
        }
        setOrder([...order, newItem])
    }


    const removeItem = (id: MenuItem['id']) => {

        const existingItem = order.find((orderItem) => orderItem.id === id);

        if (existingItem && existingItem.quantity > 1) {
            const updatedOrder = order.map((orderItem) => {
                if (orderItem.id === id) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity - 1
                    }
                } else {
                    return orderItem
                }
            })
            setOrder(updatedOrder)
            return
        }

        setOrder(order.filter((item) => item.id !== id));
    }

    const placeOrder = () => {
        
        setOrder([]);
        setTip(0);
    }

    return {
        order,
        tip,
        setTip,
        addItem,
        removeItem,
        placeOrder,
    }
}