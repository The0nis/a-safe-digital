// import CustomerDetailsComponent from "@/components/page-component/customer-details-component";
import dynamic from "next/dynamic";

const CustomerDetailsComponent = dynamic(() => import("@/components/page-component/customer-details-component"))

const CustomerDetails = () => {
 

  return (
    <CustomerDetailsComponent/>
  );
};

export default CustomerDetails;
