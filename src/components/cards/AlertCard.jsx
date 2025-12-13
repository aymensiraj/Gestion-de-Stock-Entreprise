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

function AlertCard() {
  return (
    <div className=" bg-gray-100 text-gray-800 flex flex-col">
        {/* ALERTS LIST  */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className={`text-2xl font-bold mb-4 ${styles.red.textRed}`}>Stock Alerts</h2>

        <div className="space-y-3">
          <div className="flex justify-between bg-red-50 border border-red-200 p-4 rounded-lg cursor-pointer">
            <span className={`font-medium ${styles.gray.textGray800}`}>Steel Bolts (REF-001)</span>
            <span className={`${styles.red.spanRed} font-semibold`}>Only 3 left</span>
          </div>

          <div className="flex justify-between bg-yellow-50 border border-yellow-200 p-4 rounded-lg cursor-pointer">
            <span className={`font-medium ${styles.gray.textGray800}`}>Aluminium Plate (REF-023)</span>
            <span className={`${styles.textYellow} font-semibold`}>Low: 12 units</span>
          </div>

          <div className="flex justify-between bg-red-50 border border-red-200 p-4 rounded-lg cursor-pointer">
            <span className={`font-medium ${styles.gray.textGray800}`}>Nuts Set (REF-017)</span>
            <span className={`${styles.red.spanRed} font-semibold`}>Only 5 left</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlertCard