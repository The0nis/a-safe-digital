"use client";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useFetchTransactions } from "@/hooks/fetcher";
import { CardContent } from "../ui/card";
import { Check, Users } from "lucide-react";
import SharedTable from "../shared-table";

const CustomerComponent = () => {
  const router = useRouter();
  const [payload, setPayload] = useState<FetchCustomerParams>({
    perPage: 10,
    currentPage: 1,
    search: "",
  });

  const handleSearch = useCallback(
    debounce((param: any) => {
      setPayload((prev) => ({ ...prev, search: param, currentPage: 1 }));
    }, 300),
    []
  );
  const { data, isLoading } = useFetchTransactions({
    perPage: payload.perPage,
    currentPage: payload.currentPage,
    search: payload.search,
  });
  // console.log("data", data);

  const transformedData = data?.data?.length
    ? data.data.map((item: Data) => ({
        name: (
          <>
            <span className="hidden" key={item?.id}>
              {item.id}
            </span>
            <p>{`${item.first_name} ${item.last_name}`}</p>
          </>
        ),
        username: item.username,
        email: item.email,
        gender: item.gender,
        ip_address: item.ip_address,
      }))
    : [];
  return (
    <div>
      <div>
        <CardContent className="p-0 text-primary">
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                icon: <Users className="h-6 w-6 " />,
                bgColor: "",
                title: "Total Customers",
                value: data?.meta?.total_count ?? 0,
              },
              {
                icon: <Check className="h-6 w-6 " />,
                bgColor: "",
                title: "Active Customers",
                value: "75%",
              },
              {
                icon: <Users className="h-6 w-6 " />,
                bgColor: "",
                title: "New Signups",
                value: "20",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 px-4 py-5 ${item.bgColor} rounded-xl shadow border transition-colors duration-300 hover:border-primary-foreground hover:border-1 hover:cursor-pointer`}
              >
                <div className="p-2 rounded">{item.icon}</div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                  <p className="text-lg font-bold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
      <SharedTable
        tableheaderList={[
          "Name",
          "Username",
          "Email",
          "Gender",
          "IP Address",
          "Action",
        ]}
        perPage={10}
        totalPage={data?.meta?.total_pages}
        currentPage={data?.meta?.current_page}
        onPageChange={(p) => {
          setPayload((prev) => ({ ...prev, currentPage: p }));
        }}
        hideFilter
        hideSort
        loading={isLoading}
        hideNewBtnOne={true}
        tableBodyList={transformedData}
        onSearch={handleSearch}
        dropDown
        dropDownList={[
          {
            label: "View Details",
            color: "",
            onActionClick: (param: any, dataTwo: any) => {
              router.push(
                `/dashboard/customer/${dataTwo?.name?.props?.children[0]?.props?.children}`
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default CustomerComponent;
