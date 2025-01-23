import React from "react";
import ProgressBar from "./progress-bar";
import { chartData, chartOptions, topCaseSourcesPercentage } from "@/lib/data";
import DoughnutChart from "./charts/donurt-chart";
import {  CircleUserRound, HelpCircle } from "lucide-react";

const TopCases = () => {
  return (
    <div className="grid grid-cols-8 gap-3">
      <div className="border col-span-12 md:col-span-6 rounded-xl p-5 w-full">
        <div className="flex justify-between items-start w-full">
          <div className="flex items-center">
            <h4 className="text-lg font-bold">Top Case Sources</h4>{" "}
          </div>
          <div>
            <HelpCircle size={24} color="#6C757D" />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3 mt-4">
          <div className="col-span-1 flex justify-center items-center">
            {/* <PieChart data={data} size={140} /> */}
            <DoughnutChart
              data={chartData}
              options={chartOptions}
              width="160%"
            />
          </div>
          <div className="col-span-4">
            <div className="">
              <div className="flex justify-between">
                <p className="text-base xplorer-grey">Kiki</p>
                <p className="text-base font-bold">{28}</p>
              </div>
              <div className="h-2 rounded-xl mt-2 bg-slate-100 w-full">
                <ProgressBar sections={topCaseSourcesPercentage.kiki} />
              </div>
            </div>
            <div className="mt-2">
              <div className="flex justify-between mt-4">
                <p className="text-base xplorer-grey">Social Media</p>
                <p className="text-base font-bold">{26}</p>
              </div>
              <div className="h-2 rounded-xl mt-2 bg-slate-100 w-full">
                <ProgressBar sections={topCaseSourcesPercentage.social_media} />
              </div>
            </div>
            <div className="mt-2">
              <div className="flex justify-between mt-4">
                <p className="text-base xplorer-grey">Inbound Calls</p>
                <p className="text-base font-bold">{4}</p>
              </div>
              <div className="h-2 rounded-xl mt-2 bg-slate-100 w-full">
                <ProgressBar
                  sections={topCaseSourcesPercentage.inbound_calls}
                />
              </div>
            </div>
            <div className="mt-2">
              <div className="flex justify-between mt-4">
                <p className="text-base xplorer-grey">Email</p>
                <p className="text-base font-bold">{8}</p>
              </div>
              <div className="h-2 rounded-xl mt-2 bg-slate-100 w-full">
                <ProgressBar sections={topCaseSourcesPercentage.email} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 border  rounded-xl p-5 items-center flex flex-col w-full  hidden md:flex">
        <h4 className="text-lg font-bold"> User</h4>
        <CircleUserRound className="h-24 w-24 text-[#009CBD]" />

        <div className="mt-4 text-center">
          <h4 className="text-[#004EEB] text-lg font-medium">moni@gail.com</h4>
          <span className=" text-base font-normal">Software Developer</span>
          <p className="text-[#6C757D] text-sm font-normal">moni@gail.com</p>
        </div>
      </div>
    </div>
  );
};

export default TopCases;
