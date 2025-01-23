"use client";
import { AreaCharts } from "@/components/charts/area-charts";
import { BarCharts } from "@/components/charts/bar-charts";
import { HorizontalBarChart } from "@/components/charts/bar-charts-horizontal";
import { SingleLineChart } from "@/components/charts/single-line-chart";
import SharedTable from "@/components/shared-table";
import TopCases from "@/components/top-cases";
import { useFetchTransactions } from "@/hooks/fetcher";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";

const DashboardComponent = () => {
  const router = useRouter();
  const [payload, setPayload] = useState<FetchCustomerParams>({
    perPage: 10,
    currentPage: 1,
    search: "",
  });

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

  const handleSearch = useCallback(
    debounce((param: any) => {
      setPayload((prev) => ({ ...prev, search: param, currentPage: 1 }));
    }, 300),
    []
  );
  return (
    <div className="flex flex-col gap-2 h-ful">
      <div className=" rounded-xl">
        <TopCases />
      </div>
      <div className="flex flex-1 flex-col gap-2 pt-0 grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl w-full">
          <BarCharts />
        </div>
        <div className="rounded-xl  w-full">
          <HorizontalBarChart />
        </div>
        <div className="rounded-xl w-full">
          <SingleLineChart />
        </div>
      </div>

      <div className="rounded-xl">
        <AreaCharts />
      </div>
      <div>
        <h1 className="text-xl font-bold mt-2">Customer Summary</h1>
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
        totalPage={1}
        currentPage={data?.meta?.current_page}
        onPageChange={(p) => {
          setPayload((prev) => ({ ...prev, currentPage: p }));
        }}
        loading={isLoading}
        hideNewBtnOne={true}
        tableBodyList={transformedData}
        onSearch={handleSearch}
        hideFilter
        hideSort
        hidePagination
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

export default DashboardComponent;
