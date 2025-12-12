import React from 'react'

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

function StatCard() {
  return (
    <div className="bg-white text-gray-800 flex flex-col px-4 py-6 rounded-xl shadow-md border border-gray-100">
              {/* Total Stock Value  */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 cursor-pointer">
            <p className={`${styles.gray.textGray500}`}>Total Stock Value</p>
            <h2 className={`text-3xl font-bold mt-2 ${styles.blue.textBlue}`}>128,500 DH</h2>
            <span className={`${styles.span}`}>+12% this month</span>
        </div>

        {/*  Low Stock Alerts  */}

         {/* Monthly Movements  */}
    </div>
  )
}

export default StatCard