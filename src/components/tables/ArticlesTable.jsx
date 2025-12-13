import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";
import { useSelector } from 'react-redux';
import axios from 'axios';

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
  th : "px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wide text-center",
  td : "px-6 py-4 text-gray-800 font-medium text-center",
};

function ArticlesTable() {

  const articlesState = useSelector((state) => state.articles.articles);
  console.log(articlesState);
  const [articles, setArticles] = useState([]); 
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const API_URL = 'http://localhost:4000/articles'; 
    setLoading(true);

    axios.get(API_URL)
    .then(response => {

    setArticles(response.data);
    })

    .catch(error => {
    console.error("Erreur GET:", error);
    })

    .finally(() => {
    setLoading(false);
    });
  }, []);

 if (loading) return <p>Chargement des Articles...</p>;

  return (
    <div className={styles.mainDiv}>
      {/* Title */}

      <div className="flex justify-between items-center mb-8 px-5">
        <h1 className={`text-5xl font-bold text-center ${styles.red.textRed} tracking-tight`}>Tableau des Articles</h1>

        <Link to="/articles/add" className={`flex justify-between items-center gap-2 cursor-pointer px-6 py-3 ${styles.green.bgGreen600} ${styles.green.bgGreenHover}
                    text-white rounded-xl shadow-md transition`}><span><IoMdAdd /></span>Ajouter un Articles</Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-100">
        <table className="w-full text-left border-collapse">
          {/* Head */}
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className={`${styles.th}`}>Nom</th>
              <th className={`${styles.th}`}>Catégorie</th>
              <th className={`${styles.th}`}>Quantité</th>
              <th className={`${styles.th}`}>Unité</th>
              <th className={`${styles.th}`}>Seuil Min</th>
              <th className={`${styles.th}`}>Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {articlesState.map((article, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className={`${styles.td}`}>{article.name}</td>
                <td className="px-6 py-4 text-gray-600 text-center">{article.category}</td>
                <td className={`${styles.td}`}>{article.quantity}</td>
                <td className="px-6 py-4 text-gray-600 text-center">{article.unit}</td>
                <td className={`${styles.td}`}>{article.seuil_min}</td>
                <td>
                  <Link to={`/articles/${article.id}`} className={`m-auto flex justify-between items-center gap-2 cursor-pointer mt-6 px-5 w-fit py-3 mb-2 ${styles.red.bgRed} ${styles.red.bgRedHover}
                      text-white rounded-xl shadow-md transition`}><span><IoMdArrowForward /></span>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ArticlesTable;