import { Link } from "react-router-dom"
import React from 'react'
import StatCard from "../components/cards/StatCard";
import AlertCard from "../components/cards/AlertCard";

const styles = {
  gray : {
    textGray800 : "text-gray-800",
    textGray700 : "text-gray-700",
    textGray500 : "text-gray-500",
    bgGray100 : "bg-gray-100",
  },
  red : {
    bgRed : "bg-[#c51231]",
    bgRedHover : "hover:bg-[#0A3161]",
    textRed : "text-[#c51231]",
    spanRed : "text-red-600",
 },
 blue : {
    textBlue : "text-blue-600",
 },
  textYellow : "text-yellow-600",
  mainDiv : "min-h-screen bg-gray-100 text-gray-800 flex flex-col pt-30 px-6",
  span : "text-sm text-gray-600 font-semibold",
  cardStyle : "bg-white rounded-xl shadow-md p-6",
  cardSpan : "text-blue-600 font-semibold",
};

function Dashboard() {
 return (
    <div className={`${styles.mainDiv}`}>

    {/*  TOP CARDS  */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <StatCard />
        <StatCard />
        <StatCard />
        {/* Total Stock Value  */}
        {/* <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
            <p className={`${styles.gray.textGray500}`}>Total Stock Value</p>
            <h2 className={`text-3xl font-bold mt-2 ${styles.blue.textBlue}`}>128,500 DH</h2>
            <span className={`${styles.span}`}>+12% this month</span>
        </div> */}

        {/*  Low Stock Alerts  */}
        {/* <div className="bg-white p-6 rounded-xl shadow-md border border-red-100">
            <p className={`${styles.gray.textGray500}`}>Low Stock Alerts</p>
            <h2 className={`text-3xl font-bold mt-2 ${styles.blue.textBlue}`}>8 Items</h2>
            <span className={`${styles.span}`}>Action Required</span>
        </div> */}

         {/* Monthly Movements  */}
        {/* <div className="bg-white p-6 rounded-xl shadow-md border border-yellow-100">
            <p className={`${styles.gray.textGray500}`}>Movements This Month</p>
            <h2 className={`text-3xl font-bold mt-2 ${styles.blue.textBlue}`}>245</h2>
            <span className={`${styles.span}`}>Entries & Exits</span>
        </div> */}

    </div>

     {/* ALERTS LIST  */}
        <AlertCard />
    {/* <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className={`text-2xl font-bold mb-4 ${styles.red.textRed}`}>Stock Alerts</h2>

        <div className="space-y-3">
        <div className="flex justify-between bg-red-50 border border-red-200 p-4 rounded-lg">
            <span className={`font-medium ${styles.gray.textGray800}`}>Steel Bolts (REF-001)</span>
            <span className={`${styles.red.spanRed} font-semibold`}>Only 3 left</span>
        </div>

        <div className="flex justify-between bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <span className={`font-medium ${styles.gray.textGray800}`}>Aluminium Plate (REF-023)</span>
            <span className={`${styles.textYellow} font-semibold`}>Low: 12 units</span>
        </div>

        <div className="flex justify-between bg-red-50 border border-red-200 p-4 rounded-lg">
            <span className={`font-medium ${styles.gray.textGray800}`}>Nuts Set (REF-017)</span>
            <span className={`${styles.red.spanRed} font-semibold`}>Only 5 left</span>
        </div>
        </div>
    </div> */}

     {/* CHART + MOST USED  */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

         {/* Chart placeholder  */}
        <div className={`${styles.cardStyle} cursor-pointer`}>
            <h2 className={`text-2xl font-bold mb-3 ${styles.red.textRed}`}>Movements (Last 7 Days)</h2>

            <div className="h-56 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                Chart Placeholder
            </div>
        </div>

         {/* Top items  */}
        <div className={`${styles.cardStyle} cursor-pointer`}>
            <h2 className={`text-2xl font-bold mb-3 ${styles.red.textRed}`}>
            Top 5 Consumed Items
            </h2>

            <ul className="space-y-4">
                <li className="flex justify-between">
                    <span className={`font-medium ${styles.gray.textGray800}`}>Steel Bolts</span>
                    <span className={`${styles.cardSpan}`}>350 movements</span>
                </li>

                <li className="flex justify-between">
                    <span className={`font-medium ${styles.gray.textGray800}`}>Metal Sheets</span>
                    <span className={`${styles.cardSpan}`}>280 movements</span>
                </li>

                <li className="flex justify-between">
                    <span className={`font-medium ${styles.gray.textGray800}`}>Aluminium Plates</span>
                    <span className={`${styles.cardSpan}`}>210 movements</span>
                </li>

                <li className="flex justify-between">
                    <span className={`font-medium ${styles.gray.textGray800}`}>Nuts Set</span>
                    <span className={`${styles.cardSpan}`}>190 movements</span>
                </li>

                <li className="flex justify-between">
                    <span className={`font-medium ${styles.gray.textGray800}`}>Copper Tubes</span>
                    <span className={`${styles.cardSpan}`}>140 movements</span>
                </li>
            </ul>
        </div>

    </div>

    </div>

 )
}

export default Dashboard