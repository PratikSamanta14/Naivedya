
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface CartItem {
    id: string;
    cartId: string; // Unique ID for cart entry (combining productId + options)
    name: string;
    price: number;
    originalPrice: number;
    quantity: number;
    image: string;
    category: string;
    selectedAddons?: { name: string; price: number }[];
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "cartId">) => void;
    removeItem: (cartId: string) => void;
    updateQuantity: (cartId: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (newItem: Omit<CartItem, "cartId">) => {
        setItems((currentItems) => {
            // Generate a unique cartId based on item ID and addons
            const addonsKey = newItem.selectedAddons
                ? newItem.selectedAddons.map(a => a.name).sort().join("|")
                : "";
            const newCartId = `${newItem.id}-${addonsKey}`;

            const existingItem = currentItems.find((item) => item.cartId === newCartId);

            if (existingItem) {
                return currentItems.map((item) =>
                    item.cartId === newCartId
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            }

            return [...currentItems, { ...newItem, cartId: newCartId }];
        });
    };

    const removeItem = (cartId: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.cartId !== cartId));
    };

    const updateQuantity = (cartId: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.cartId === cartId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => {
        const addonsCost = item.selectedAddons?.reduce((acc, addon) => acc + addon.price, 0) || 0;
        return sum + (item.price + addonsCost) * item.quantity;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                cartCount,
                subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
