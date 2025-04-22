import { supabase } from "@/supabaseClient";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const useShipmentHandlers = (fetchOrders) => {
  const router = useRouter();

  const handleEditShipment = (order) => {
    router.push(`/kuljetukset/muokkaa-kuljetus/${order.id}`);
  };

  const handleDeleteShipment = async (id) => {
    const confirmed = confirm("Haluatko varmasti poistaa lähetyksen?");
    if (!confirmed) return;

    const { error } = await supabase.from("shipments").delete().eq("id", id);
    if (error) {
      console.error("Error deleting:", error.message);
      toast.error("Poistaminen epäonnistui.");
      return;
    }

    toast.success("Lähetys poistettu.");
    fetchOrders?.(); // optional
  };

  const handleDuplicateShipment = (order) => {
    const template = {
      ...order,
      id: undefined,
      status: "draft",
    };

    router.push({
      pathname: "/kuljetukset/luo-ilmoitus",
      query: { template: JSON.stringify(template) },
    });
  };

  return { handleEditShipment, handleDeleteShipment, handleDuplicateShipment };
};