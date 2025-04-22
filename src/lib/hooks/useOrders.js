import { useState } from 'react';

export const useOrders = (orders, filterStatus, sortBy, currentPage, itemsPerPage) => {
  const filteredOrders = orders.filter(order =>
    filterStatus === "all" ? true : order.status === filterStatus
  );

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "created_at") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortBy === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  return { currentOrders, totalPages };
};