'use client'

import React from "react";

function SettingsTabs({ tabs, selectedTab, onChange }) {
  return (
    <>
      {/* Desktop Tabs */}
      <div className="border max-lg:hidden rounded-sm border-[#DADADA] mx-5 lg:mx-10 xl:mx-20 flex items-center">
        {tabs.map((tab, index) => (
          <div
            key={tab.name}
            onClick={() => onChange(tab.name)}
            className={`w-full flex-1 text-center cursor-pointer font-medium
              p-1 md:p-2 max-md:text-xs max-xl:text-sm md:text-nowrap
              transition-colors duration-500
              ${index !== tabs.length - 1 ? "border-r border-[#DADADA]" : ""}
              ${
                selectedTab === tab.name
                  ? "text-white bg-admin-violet"
                  : "text-[#434343]"
              }`}
          >
            {tab.name}
          </div>
        ))}
      </div>

      {/* Mobile Tabs */}
      <div className="rounded-sm lg:hidden mx-2">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            onClick={() => onChange(tab.name)}
            className={`w-full border border-[#DADADA] text-xs px-3 py-1 my-2 cursor-pointer
              transition-colors duration-500
              ${
                selectedTab === tab.name
                  ? "text-white bg-admin-violet"
                  : "text-[#434343]"
              }`}
          >
            {tab.name}
          </div>
        ))}
      </div>
    </>
  );
}

export default SettingsTabs;
