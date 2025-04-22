"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { supabase } from "@/supabaseClient"
import { toast } from "react-toastify"

export const useShipmentHandlers = (fetchOrders) => {
  const router = useRouter()
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const handleEditShipment = (order) => {
    router.push(`/kuljetukset/muokkaa-kuljetus/${order.id}`)
  }

  const confirmDeleteShipment = (id) => {
    setSelectedId(id)
    setOpenDialog(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedId) return

    const { error } = await supabase.from("shipments").delete().eq("id", selectedId)
    if (error) {
      toast.error("Poistaminen epäonnistui.")
    } else {
      toast.success("Lähetys poistettu.")
      fetchOrders?.()
    }

    setOpenDialog(false)
    setSelectedId(null)
  }

  return {
    handleEditShipment,
    confirmDeleteShipment,
    handleConfirmDelete,
    openDialog,
    setOpenDialog,
  }
}