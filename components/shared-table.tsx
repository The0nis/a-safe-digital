"use client";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BtnPlusIcon,
  ExportIcon,
  FilterIcon,
} from "@/public/assets/icons";
import Image from "next/image";
import React, { useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  //   DropdownMenuItem,
  //   DropdownMenuLabel,
  //   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { iife } from "@/lib/utils";
import { ArrowUpDownIcon, EllipsisVertical, Search } from "lucide-react";

interface myComponentProps {
  children?: React.ReactNode;
  onAdd?: () => void;
  TableTitle?: string;
  addText?: string;
  hideTableHeader?: boolean;
  hideFilter?: boolean;
  hideExport?: boolean;
  filterList?: any;
  filterVal?: any;
  rowId?: any;
  onFilterClick?: (param: any) => void;
  hideNewBtnOne?: boolean;
  onPdfChange?: () => void;
  onCsvChange?: () => void;
  onSearch?: (param?: any) => void;
  handleSearchClick?: (param?: any) => void;
  onManualBtn?: () => void;
  onBulkUploadBtn?: () => void;
  hideBulkOption?: boolean;
  hideNewBtn?: boolean;
  newBtnBulk?: boolean;
  hideSearchFilterBox?: boolean;
  tableheaderList?: any;
  loading?: boolean;
  tableBodyList?: any;
  hidePagination?: boolean;
  onPageChange?: (param?: any) => void;
  currentPage?: string | number;
  totalPage?: string | number;
  perPage?: string | number;
  onSort?: (param?: any) => void;
  sortList?: any;
  hideSort?: boolean;
  onRowClick?: (param?: any) => void;
  defaultBodyList?: any;
  dropDown?: boolean;
  dropDownList?: any;
  dynamicDropDownList?: (row?: any) => any[];
  width?: string;
}

const SharedTable = ({
  children,
  onAdd,
  TableTitle,
  addText,
  hideTableHeader,
  filterList,
  filterVal,
  hideFilter,
  onFilterClick,
  rowId,
  hideNewBtnOne,
  newBtnBulk,
  onCsvChange,
  onPdfChange,
  onSearch,
  handleSearchClick,
  hideBulkOption,
  onBulkUploadBtn,
  onManualBtn,
  hideNewBtn,
  hideExport,
  hideSearchFilterBox,
  tableheaderList,
  loading,
  tableBodyList,
  currentPage,
  hidePagination,
  perPage,
  onPageChange,
  totalPage,
  sortList,
  hideSort,
  onSort,
  onRowClick,
  defaultBodyList,
  dropDown,
  dropDownList,
  dynamicDropDownList,
  width,
}: myComponentProps) => {
  const [showFilter, setShowFilter] = useState<any>(false);
  const [defaultFilterVal, setDefaultFilterVal] = useState<any>({});
  const [defaultSortVal, setDefaultSortVal] = useState<any>({});
  const [showExport, setShowExport] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  // header here ------------------
  const topHeaderWrap = (
    <div className="flex justify-between items-center border-b p-3  pr-16">
      <p className=" font-medium text-base ">{TableTitle}</p>
    </div>
  );
  //  header here end ---------------

  //   pagination here ------

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= Number(totalPage)) {
      onPageChange && onPageChange(page);
    }
  };

  const handlePickObjFromDefaultList = (param: any) => {
    if (defaultBodyList?.length > 0) {
      const obj = defaultBodyList?.find((chi: any, idx: any) => idx === param);
      return obj;
    }
  };

  const CurrentPage = iife(() => {
    if (Number(currentPage) > Number(totalPage)) return "";

    return (Number(currentPage) - 1) * Number(perPage) + 1;
  });

  const TotalPage =
    String(
      Math.min(
        Number(currentPage || 1) * Number(perPage || 1),
        Number(totalPage || 1)
      )
    ) || "1";

  //   filter here ------------------
  const addResetToList = (list: any) => {
    if (list?.length > 0) {
      const newList = [...list, { label: "All", value: "all" }];
      return newList;
    }
  };
  //   ---- list pattern here ---
  const list = [
    { label: "success", value: "1" },
    { label: "failed", value: "2" },
  ];
  // list pattern here ----
  const filterDrop = (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={() => {
          setShowFilter(!showFilter);
        }}
        asChild
      >
        <Button
          variant="outline"
          className="ml-auto border h-[33px] rounded-[6px] focus:border-primary focus:border-0"
        >
          <div className="flex gap-3 items-center">
            <Image src={FilterIcon} alt="filter" />
            <p className=" font-normal text-xs">
              {filterVal
                ? filterVal?.label
                : defaultFilterVal?.label || `Filter by`}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <>
          {addResetToList(filterList)?.map((chi: any, idx: any) => {
            return (
              <DropdownMenuCheckboxItem
                key={idx}
                className="capitalize  font-light text-xs"
                checked={filterVal?.value === chi?.value}
                // onCheckedChange={() => {
                //     onFilterClick && on
                // }}
                onClick={() => {
                  setDefaultFilterVal(chi);
                  onFilterClick && onFilterClick(chi);
                }}
              >
                {chi?.label}
              </DropdownMenuCheckboxItem>
            );
          })}
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  // filter end here -------------------

  const newBtnClass = "text-xs font-light cursor-pointer hover:bg-accent hover:text-foreground";

  //   export here start ------
  const onExportChange = () => {
    setShowExport(!showExport);
  };
  const exportDrop = (
    <DropdownMenu open={showExport} onOpenChange={onExportChange}>
      <DropdownMenuTrigger asChild>
        <Button
         variant="secondary"
          className="ml-auto px-4 rounded-[6px] h-[33px] border-1 text-bold"
        >
          <div className="flex gap-3 items-center">
            <Image src={ExportIcon} alt="export" />
            <p className=" font-normal text-xs">Export</p>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="border rounded-sm bg-background"
        align="end"
        style={{ width: "10rem" }}
      >
        <DropdownMenuItem className={newBtnClass} onClick={onPdfChange}>
          {/* <Link href={href} className="flex gap-3"> */}
          PDF
          {/* </Link> */}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={newBtnClass} onClick={onCsvChange}>
          CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  //  export here end --------

  const [showNewBtn, setShowNewBtn] = useState(false);
  //   newBtn  -------
  const newBtn = (
    <DropdownMenu
      open={showNewBtn}
      onOpenChange={() => {
        setShowNewBtn(!showNewBtn);
      }}
    >
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button className={"items-center h-[32px] px-4 gap-3 font-light"}>
          <Image src={BtnPlusIcon} alt="plus icon" />
          <p>{addText || `New`}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border rounded-sm"
        align="end"
        style={{ width: "10rem" }}
      >
        <DropdownMenuItem className={newBtnClass} onClick={onManualBtn}>
          {/* <Link href={href} > */}
          Add Manually
          {/* </Link> */}
        </DropdownMenuItem>
        {!hideBulkOption && <DropdownMenuSeparator />}
        {!hideBulkOption && (
          <DropdownMenuItem className={newBtnClass} onClick={onBulkUploadBtn}>
            Bulk Upload
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  //  sort start here -----
  const sortBy = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto border h-[33px] rounded-[6px] focus:border-primary focus:border-0 hover:bg-white"
        >
          <div className="flex gap-3 items-center">
            <ArrowUpDownIcon />
            <p className="font-normal text-xs">
              {Object?.keys(defaultSortVal)?.length > 0
                ? defaultSortVal?.label
                : "Sort by"}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {addResetToList(sortList)?.map((chi: any, idx: any) => {
          return (
            <DropdownMenuCheckboxItem
              key={idx}
              className="capitalize font-light text-xs"
              onClick={() => {
                onSort && onSort(chi);
                setDefaultSortVal(chi);
              }}
            >
              {chi?.label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
  // sort end here -------

  const TableRowComponet = ({ row, children, onClick }: any) => (
    <TableRow className="transition-all duration-300" key={`${row}`}>
      {row?.map((cell: any, index: any) => (
        <TableCell
          className="font-normal text-xs border-t-2 border-b-2"
          key={`${index}-${cell}`}
          onClick={onClick}
        >
          {typeof cell === "object" && cell !== null && "props" in cell
            ? cell
            : cell}
        </TableCell>
      ))}
      {children}
    </TableRow>
  );

  return (
    <div className="w-full flex flex-col">
      {/* table header here --------------------- */}
      <>{!hideTableHeader && TableTitle ? topHeaderWrap : null}</>
      {/* table header end here --------------------- */}
      {/* search an dfilter componeent here --------------- */}
      {!hideSearchFilterBox && (
        <div className="flex items-center py-4">
          <div className="grid place-items-center relative">
            <Input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              value={searchVal}
              data-testid="search-table"
              // onChange={onSearchChange}
              onChange={(e) => {
                setSearchVal(e.target.value);
                onSearch && onSearch(e.target.value);
              }}
              className="border-custom-divider  w-[250px] font-normal text-xs border  rounded-[6px]"
            />
            <Search
              onClick={() =>
                handleSearchClick && searchVal && handleSearchClick(searchVal)
              }
              className="absolute right-0 mr-5 text-primary"
            />
          </div>
          <div className="flex gap-5 items-center ml-auto">
            {/* SHOW NEW BTN */}
            {!hideNewBtnOne && !newBtnBulk && (
              <Button
                onClick={() => {
                  onAdd && onAdd();
                }}
                className={"items-center h-[32px] px-6 gap-3 font-light"}
              >
                <Image src={BtnPlusIcon} alt="plus icon" />
                <p>{addText || `New`}</p>
              </Button>
            )}
            {!hideNewBtn && newBtnBulk ? newBtn : null}
            {!hideSort ? sortBy : null}

            {/* SHOW FILTER DROP */}
            {!hideFilter ? filterDrop : null}

            {/* EXPORT DROP */}
            {!hideExport ? exportDrop : null}
          </div>
        </div>
      )}
      {/* search and filter component end here --------------- */}
      {/* table component start here ------ */}
      <Table
      
      data-testid="shared-table">
        {tableheaderList?.length > 0 && (
          <>
            <TableHeader>
              <TableRow>
                {tableheaderList?.map((chi: any, idx: any) => {
                  if (chi === "Action") {
                    return (
                      <TableHead
                        key={idx}
                        className="font-normal text-xs text-center capitalize text-primary"
                      >
                        {chi || ""}
                      </TableHead>
                    );
                  }
                  return (
                    <TableHead
                      key={idx}
                      className=" font-normal text-xs capitalize text-primary"
                    >
                      {chi || ""}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
          </>
        )}
        {/* body start here ------ */}

        <TableBody className="text-primary">
          {loading ? (
            <>
              {/* <TableRow>
                <TableCell
                  colSpan={tableheaderList?.length}
                  className="h-60 text-center"
                >
                  <div
                    className="inline-block size-7 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em]  motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  />
                </TableCell>
              </TableRow> */}
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: tableheaderList?.length }).map(
                    (_, cellIndex) => (
                      <TableCell key={cellIndex} className="h-12">
                        <div className="animate-pulse flex space-x-4">
                          <div className="rounded bg-gray-200 h-6 w-full bg-opacity-50"></div>
                        </div>
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))}
            </>
          ) : (
            <>
              {tableBodyList?.length > 0 ? (
                <>
                  {tableBodyList?.map((item: any, rowIndex: any) => {
                    // to ignore some data that might be needed when accessing row object, table row: value Object.values(item) is changed to FORMATTED_DATA?.map((data) => Object.values(data))

                    //  if tableBodyList object has _slug key it will be ignored when rendering table data
                    const FORMATTED_DATA = Object?.entries(item)
                      .filter(([key, value]) => {
                        return key !== "_slug";
                      })
                      ?.map((d) => {
                        return {
                          [d[0]]: d[1],
                        };
                      });
                    return (
                      <TableRowComponet
                        key={rowIndex}
                        row={FORMATTED_DATA?.map((data) => Object.values(data))}
                        onClick={() => {
                          if (onRowClick) {
                            defaultBodyList?.length > 0
                              ? onRowClick(
                                  handlePickObjFromDefaultList(rowIndex)
                                )
                              : onRowClick(item);
                          }
                        }}
                      >
                        {dropDown && (
                          <td className="border-b-2 border-t-2" key={rowIndex}>
                            <div
                              key={rowIndex}
                              style={{
                                inlineSize:
                                  "100%" as React.CSSProperties["inlineSize"],
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                blockSize:
                                  "100%" as React.CSSProperties["blockSize"],
                              }}
                            >
                              <DropdownMenu>
                                <DropdownMenuTrigger
                                  asChild
                                  className="cursor-pointer px-2 text-primary bg-background"
                                >
                                  <span>
                                    <EllipsisVertical />
                                  </span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  className="border rounded-sm bg-background"
                                  align="end"
                                  style={{
                                    inlineSize: (width
                                      ? width
                                      : "170px") as React.CSSProperties["inlineSize"],
                                  }}
                                >
                                  {dropDownList?.length > 0 &&
                                    dropDownList?.map(
                                      (child: any, idx: any) => {
                                        return (
                                          <DropdownMenuItem
                                            key={`${rowIndex}-${idx}`}
                                            onClick={() => {
                                              child?.onActionClick &&
                                                child?.onActionClick(
                                                  handlePickObjFromDefaultList(
                                                    rowIndex
                                                  ),
                                                  item
                                                );
                                            }}
                                            className="font-light text-sm cursor-pointer"
                                          >
                                            {child?.label}
                                          </DropdownMenuItem>
                                        );
                                      }
                                    )}
                                  {dynamicDropDownList &&
                                    dynamicDropDownList(item)?.length > 0 &&
                                    dynamicDropDownList(item)?.map(
                                      (child: any, idx: any) => {
                                        return (
                                          <DropdownMenuItem
                                            key={`${rowIndex}-${idx}`}
                                            onClick={() => {
                                              child?.onActionClick &&
                                                child?.onActionClick(
                                                  handlePickObjFromDefaultList(
                                                    rowIndex
                                                  ),
                                                  item
                                                );
                                            }}
                                            className="font-light text-sm cursor-pointer"
                                          >
                                            {child?.label}
                                          </DropdownMenuItem>
                                        );
                                      }
                                    )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        )}
                      </TableRowComponet>
                    );
                  })}
                </>
              ) : (
                <>
                  <TableRow>
                    <TableCell
                      colSpan={tableheaderList?.length}
                      className="h-24 text-center"
                    >
                      <span>No results.</span>
                    </TableCell>
                  </TableRow>
                </>
              )}
            </>
          )}
        </TableBody>
        {/* body end here ------------------ */}
      </Table>
      {/* table component end here ------ */}
      {tableBodyList?.length > 0 && !hidePagination && (
        <div className="ml-auto">
          <div className="flex mt-4 gap-5 items-center pb-2">
            <p className="text-custom-ash font-normal text-sm">{`${
              CurrentPage || "1"
            } - ${TotalPage || "1"} of ${totalPage || "1"}`}</p>
            <Button
              disabled={Number(currentPage) === 1}
              // className=" bg-custom-gray-2 hover:bg-[--primary-color]"
              onClick={() => {
                handlePageChange(Number(currentPage) - 1);
              }}
            >
              <Image src={ArrowLeftIcon} alt="arrow left" />
            </Button>
            <Button
              disabled={Number(TotalPage) >= Number(totalPage)}
              // className=" bg-custom-gray-2 hover:bg-[--primary-color]"
              onClick={() => {
                handlePageChange(Number(currentPage) + 1);
              }}
            >
              <Image src={ArrowRightIcon} alt="arrow right" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedTable;
