import React from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const styles = {
  gray: {
    textGray800: "text-gray-800",
    textGray700: "text-gray-700",
    textGray500: "text-gray-500",
    bgGray100: "bg-gray-100",
  },
  red: {
    bgRed: "bg-[#c51231]",
    bgRedHover: "hover:bg-[#a01028]",
    textRed: "text-[#c51231]",
    spanRed: "text-red-600",
  },
  green : {
    bgGreen600 : "bg-green-600",
    textGreen700 : "text-green-700",
    bgGreenHover : "hover:bg-green-700",
  },
  blue: { textBlue: "text-blue-600" },
  textYellow: "text-yellow-600",
  mainDiv: "min-h-screen bg-gray-50 text-gray-800 flex flex-col pt-10 px-6 md:px-10",
  span: "text-sm text-gray-600 font-semibold",
  cardStyle: "bg-white rounded-xl shadow-lg p-6 border border-gray-100",
  cardSpan: "text-blue-600 font-semibold",
  th : "px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wide",
  td : "px-6 py-4 text-gray-800 font-medium",
};

function MovementsTable() {
  return (
    <div className={styles.mainDiv}>
      {/* Title */}

      <div className="flex justify-between items-center mb-8 px-5">
        <h1 className={`text-5xl font-bold text-center ${styles.red.textRed} tracking-tight`}>Tableau des Movements</h1>

        <Link to="/movements/add" className={`flex justify-between items-center gap-2 cursor-pointer px-6 py-3 ${styles.green.bgGreen600} ${styles.green.bgGreenHover}
                    text-white rounded-xl shadow-md transition`}><span><IoMdAdd /></span>Ajouter un mouvement</Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-100">
        <table className="w-full text-left border-collapse">
          {/* Head */}
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className={`${styles.th}`}>Article</th>
              <th className={`${styles.th}`}>Type</th>
              <th className={`${styles.th}`}>Quantité</th>
              <th className={`${styles.th}`}>Commentaire</th>
              <th className={`${styles.th}`}>Date</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            <tr className="hover:bg-gray-50 transition">
              <td className={`${styles.td}`}>Steel Bolts</td>
              <td className="px-6 py-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Entry</span>
              </td>
              <td className={`${styles.td}`}>100</td>
              <td className="px-6 py-4 text-gray-600">New stock received</td>
              <td className="px-6 py-4 text-gray-500 text-sm">2024-06-15</td>
            </tr>

            <tr className="hover:bg-gray-50 transition">
              <td className={`${styles.td}`}>Aluminum Sheets</td>
              <td className="px-6 py-4">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">Exit</span>
              </td>
              <td className={`${styles.td}`}>40</td>
              <td className="px-6 py-4 text-gray-600">Used in production line</td>
              <td className="px-6 py-4 text-gray-500 text-sm">2024-06-11</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default MovementsTable;