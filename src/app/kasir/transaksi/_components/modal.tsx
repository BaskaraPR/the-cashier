import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { FaX } from "react-icons/fa6";
import { Button } from "@/app/_components/global/button";
import { TextField } from "@/app/_components/global/input";
import { H3 } from "@/app/_components/global/text";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { upsertTransaksi, insertDetail } from "../action";
import { meja } from "@prisma/client";
import {
  transaksiWithUsersAndMejas,
  detailWithMenusAndTransaksis,
} from "@/types/relation";
import ModalWrapper from "@/app/_components/global/modal-wrapper";

export default function TransaksiModal({
  setIsOpenModal,
  data,
  detailData,
  mejaData,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  data?: transaksiWithUsersAndMejas | null;
  detailData?: detailWithMenusAndTransaksis | null;
  mejaData?: meja[];
}) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<
    Array<{
      id_menu: string;
      nama: string;
      harga: number;
      qty: number;
      totalHarga: number;
    }>
  >([]);
  const [formValues, setFormValues] = useState({
    id_meja: data?.id_meja || "",
    nama_pelanggan: data?.nama_pelanggan || "",
  });

  const router = useRouter();

  useEffect(() => {
    // Fetch cart data from localStorage when the modal is opened
    const storage = localStorage.getItem("cart");
    if (storage) {
      try {
        const cartItems = JSON.parse(storage);
        if (Array.isArray(cartItems)) {
          const formattedDetails = cartItems.map((item) => ({
            id_menu: item.id_menu,
            harga: item.harga ?? 0,
            nama: item.nama,
            qty: item.qty ?? 1,
            totalHarga: (item.harga ?? 0) * (item.qty ?? 1),
          }));
          setDetails(formattedDetails);
        }
      } catch (error) {
        console.error("Failed to parse cart data", error);
      }
    }
  }, []);

  const handleRemoveItem = (id_menu: string) => {
    setDetails((prevDetails) => {
      const updatedDetails = prevDetails.filter(
        (item) => item.id_menu !== id_menu
      );
      localStorage.setItem("cart", JSON.stringify(updatedDetails));
      return updatedDetails;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Loading...");

    try {
      const result = await upsertTransaksi(data?.id_transaksi, formValues);

      if (!result.success) {
        setLoading(false);
        return toast.error(result.message, { id: toastId });
      }

      const transaksiId = data?.id_transaksi ?? result.id_transaksi;

      const detailResult = await insertDetail(
        transaksiId,
        details.map((detail) => ({
          ...detail,
          id_transaksi: transaksiId ?? "",
        }))
      );

      if (!detailResult.success) {
        setLoading(false);
        return toast.error(detailResult.message, { id: toastId });
      }

      localStorage.removeItem("cart");
      toast.success(result.message, { id: toastId });
      setIsOpenModal(false);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("An error occurred while submitting the form.", {
        id: toastId,
      });
      setLoading(false);
    }
    router.refresh();
  };

  return (
    <ModalWrapper>
      <form onSubmit={onSubmit}>
        <div className="flex items-center justify-between border-b p-4 md:p-5">
          <H3>Transaksi Data</H3>
          <button
            className="ml-auto inline-flex items-center rounded-lg bg-red-200 p-1.5 text-sm text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-900"
            onClick={() => setIsOpenModal(false)}
            type="button"
          >
            <FaX size={16} />
          </button>
        </div>
        <div className="space-y-4 p-4 md:p-5">
          <TextField
            type="text"
            name="nama_pelanggan"
            label="Nama Pelanggan"
            placeholder="Enter customer name"
            value={formValues.nama_pelanggan}
            onChange={handleChange}
            required
          />
          <label htmlFor="id_meja">Select Meja</label>
          <select
            name="id_meja"
            value={formValues.id_meja}
            onChange={handleChange}
            required
            className="border p-2 rounded-md"
          >
            <option value="" disabled>
              Select Meja
            </option>
            {mejaData?.map((meja) => (
              <option key={meja.id_meja} value={meja.id_meja}>
                {meja.nomor_meja}
              </option>
            ))}
          </select>

          <H3>Detail Transaksi</H3>
          {details.length > 0 ? (
            details.map((item) => (
              <div
                key={item.id_menu}
                className="p-2 border-b flex justify-between items-center"
              >
                <div>
                  <p>Menu: {item.nama}</p>
                  <p>Harga: Rp. {item.harga}</p>
                  <p>Qty: {item.qty}</p>
                  <p>Total Harga: Rp. {item.totalHarga}</p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id_menu)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>No items in the cart</p>
          )}
        </div>
        <div className="flex items-right justify-end rounded-b border-t p-4">
          <Button
            variant={"primary"}
            type="submit"
            disabled={loading || details.length === 0}
          >
            Kirim
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
