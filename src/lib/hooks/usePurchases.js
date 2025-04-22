import { useState } from 'react';

export const usePurchases = (purchases, filterStatus, sortBy, currentPage, itemsPerPage) => {
  const filteredPurchases = purchases.filter(purchase =>
    filterStatus === "all" ? true : purchase.status === filterStatus
  );

  const sortedPurchases = [...filteredPurchases].sort((a, b) => {
    if (sortBy === "created_at") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortBy === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPurchases = sortedPurchases.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedPurchases.length / itemsPerPage);

  return { currentPurchases, totalPages };
};