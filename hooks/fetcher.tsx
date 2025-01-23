"use client";
import { useEffect, useState } from "react";

export const useFetchTransactions = ({
  perPage,
  currentPage,
  search,
}: FetchCustomerParams) => {
  const [data, setData] = useState<{
    data: Data[];
    meta: any;
  }>({ data: [], meta: {} });
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/customers?per_page=${perPage}&current_page=${currentPage}&search=${search}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [perPage, currentPage, search]);

  return { data, error, isLoading };
};
export const useFetchCustomerDetails = (customerId: string) => {
  const [data, setData] = useState<{ data: Data } | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/customer-details?id=${customerId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
        console.error("Error fetching customer details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [customerId]);

  return { data, error, isLoading };
};
