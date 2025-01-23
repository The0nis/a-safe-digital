import dynamic from "next/dynamic";

const CustomerClient = dynamic(() => import("@/components/page-component/customer-component"));

const Customer = () => {
  return <CustomerClient />;
};

export default Customer;
