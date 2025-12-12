import React from 'react'
import ArticlesTable from '../../components/tables/ArticlesTable'


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

function ArticlesList() {
  return (
    <div className={`${styles.mainDiv}`}>
        <ArticlesTable />
    </div>
  )
}

export default ArticlesList