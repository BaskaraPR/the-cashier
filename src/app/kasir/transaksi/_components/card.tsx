"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { menu } from "@prisma/client";
import { Button } from "@/app/_components/global/button";

interface CartItem {
  id_menu: string;
  nama: string;
  qty: number;
  totalHarga: number;
}

export default function MenuCard({ menuData }: { menuData: menu }) {
  const [qty, setQuantity] = useState<number>(1);
  const [cart, setCart] = useState<CartItem[]>([]);

  function getCart() {
    const storage = localStorage.getItem("cart");
    const cartItems = storage ? JSON.parse(storage) : [];
    const indexCart = cartItems.findIndex(
      (item: CartItem) => item.id_menu === menuData.id_menu
    );
    if (indexCart !== -1) {
      setQuantity(cartItems[indexCart].qty);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  function updateCart(id_menu: string) {
    const storage = localStorage.getItem("cart") || "[]";
    const cartItems = JSON.parse(storage);
    const indexCart = cartItems.findIndex(
      (item: CartItem) => item.id_menu === id_menu
    );

    if (indexCart === -1) {
      // If the item is not in the cart, add it with initial qty and totalHarga
      const nama = menuData.nama_menu;
      const harga = menuData.harga;
      const totalHarga = qty * harga;
      cartItems.push({ id_menu, nama, harga, qty, totalHarga });
      console.log("Item added to cart");
    } else {
      // If the item is already in the cart, update the quantity and totalHarga
      cartItems[indexCart].qty = qty; // Increment qty by current value
      cartItems[indexCart].totalHarga =
        cartItems[indexCart].qty * menuData.harga; // Update totalHarga
      console.log("Item quantity updated in cart");
    }
    // Update the cart in localStorage and state
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setCart(cartItems);
    setQuantity(1);
  }

  const formatCash = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);

  return (
    <div>
      <div>
        <div
          key={menuData.id_menu}
          className="w-72 rounded-lg overflow-hidden shadow-lg bg-white"
        >
          <div className="relative">
            <Image
              src={`/menu/${menuData.gambar}`}
              alt={`Menu Data: ${menuData.nama_menu}`}
              width={400}
              height={400}
              className="w-full h-56 object-cover"
            />
            <div className="absolute top-2 left-2 bg-secondary text-tertiary rounded-full px-2 py-1 text-sm font-bold">
              {menuData.jenis.charAt(0).toUpperCase() + menuData.jenis.slice(1)}
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 truncate">
              {menuData.nama_menu}
            </div>
            <p className="text-gray-700 text-base line-clamp-2 min-h-[3rem]">
              {menuData.deskripsi}
            </p>
          </div>
          <div className="px-6 pb-6 flex justify-between items-center">
            <span className="font-bold text-xl">
              Rp. {formatCash(menuData.harga)}
            </span>
            <input
              type="number"
              value={qty}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 text-center border border-gray-300 rounded"
            />
            <Button onClick={() => updateCart(menuData.id_menu)}>
              Add to Cart
            </Button>
          </div>
          <div className="rounded-md bg-white p-2"></div>
        </div>
      </div>
    </div>
  );
}
