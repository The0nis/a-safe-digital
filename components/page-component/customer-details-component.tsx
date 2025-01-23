"use client";
import CustomLoader from "@/components/custom-loader/index";
import { useFetchCustomerDetails } from "@/hooks/fetcher";
import { useParams } from "next/navigation";
import React from "react";

const styles = {
  container: "p-4",
  header: "text-2xl font-bold text-primary mb-4",
  card: "rounded-lg shadow-xl rounded-md p-6 bg-background ",
  item: "mb-4 text-primary flex items-center",
  label: "font-semibold text-primary mr-2",
};

const CustomerDetailsComponent = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchCustomerDetails(id as string);
  if (isLoading) {
    return <CustomLoader />;
  }
  console.log(data);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Customer Details</h1>
      <div className={styles.card}>
        <div className={styles.item}>
          <span className={styles.label}>Title: </span>
          <span>{data?.data?.title}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Name: </span>
          <span>
            {data?.data?.first_name} {data?.data?.last_name}
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Email: </span>
          <span>{data?.data?.email}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Gender: </span>
          <span>{data?.data?.gender}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>IP Address: </span>
          <span>{data?.data?.ip_address}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Username: </span>
          <span>{data?.data?.username}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsComponent;
