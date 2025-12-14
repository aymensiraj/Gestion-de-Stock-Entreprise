import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdArrowForward } from "react-icons/io";
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
  green: {
    bgGreen600: "bg-green-600",
    textGreen700: "text-green-700",
    bgGreenHover: "hover:bg-green-700",
  },
  blue: { textBlue: "text-blue-600" },
  textYellow: "text-yellow-600",
  mainDiv: "min-h-screen bg-gray-50 text-gray-800 flex flex-col pt-10 px-4 sm:px-6 md:px-10",
  span: "text-sm text-gray-600 font-semibold",
  cardStyle: "bg-white rounded-xl shadow-lg p-6 border border-gray-100",
  cardSpan: "text-blue-600 font-semibold",
  th: "px-4 sm:px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wide text-center",
  td: "px-4 sm:px-6 py-4 text-gray-800 font-medium text-center",
};

function ArticlesTable() {// Récupérer les articles depuis le store Redux
const articlesState = useSelector((state) => state.articles.articles);

// State local pour stocker les articles récupérés depuis l'API
const [articles, setArticles] = useState([]);

// State pour gérer le chargement des données
const [loading, setLoading] = useState(true);

// useEffect pour récupérer les articles depuis l'API au chargement du composant
useEffect(() => {
  const API_URL = 'http://localhost:4000/articles';
  setLoading(true); // Activer le loader pendant la récupération

  axios.get(API_URL)
    .then(response => {
      // Stocker les données récupérées dans le state local
      setArticles(response.data);
    })
    .catch(error => {
      console.error("Erreur GET:", error); // Afficher les erreurs éventuelles
    })
    .finally(() => {
      setLoading(false); // Désactiver le loader une fois terminé
    });
}, []);

// State pour stocker les articles filtrés selon les critères de recherche
const [filteredArticles, setFilteredArticles] = useState(articlesState);

// State pour gérer les valeurs de recherche / filtres
const [search, setSearch] = useState({
  filter: "", 
  nom: '',      
  category: '', 
  quantity: '', 
  unite: ''    
});

// Fonction pour gérer les changements dans les champs de recherche
const HandleChange = (e) => {
  setSearch(prev => ({
    ...prev,
    [e.target.name]: e.target.value, // Mettre à jour le champ correspondant
  }));
}

// useEffect pour filtrer les articles chaque fois que search ou articlesState change
useEffect(() => {
  const filtered = articlesState.filter(article => {
    return (
      article.name.toLowerCase().includes(search.filter.toLowerCase()) && // Filtre par nom
      article.category.toLowerCase().includes(search.category.toLowerCase()) && // Filtre par catégorie
      article.unit.toLowerCase().includes(search.unite.toLowerCase()) && // Filtre par unité
      article.quantity.toString().includes(search.quantity) // Filtre par quantité
    );
  });

  // Mettre à jour le state avec les articles filtrés
  setFilteredArticles(filtered);
}, [search, articlesState]);

// Afficher un message de chargement si les articles sont en cours de récupération
if (loading) return <p>Chargement des Articles...</p>;

  return (
    <div className={styles.mainDiv}>
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 px-2 md:px-5">
        <h1 className={`text-3xl md:text-5xl font-bold text-center md:text-left ${styles.red.textRed} tracking-tight mb-4 md:mb-0`}>
          Tableau des Articles
        </h1>

        <Link to="/articles/add" className={`flex justify-center md:justify-between items-center gap-2 cursor-pointer px-6 py-3 ${styles.green.bgGreen600} ${styles.green.bgGreenHover}
                    text-white rounded-xl shadow-md transition`}>
          <span><IoMdAdd /></span>Ajouter un Articles
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="flex flex-col flex-1">
          <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Filter Par Nom</label>
          <input type="text" value={search.filter} name='filter' onChange={HandleChange}
            className="border-gray-300 w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Filter Par Nom..." />
        </div>
        <div className="flex flex-col flex-1">
          <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Filter Par Catégorie</label>
          <input type="text" value={search.category} name='category' onChange={HandleChange}
            className="border-gray-300 w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Filter Par Catégorie..." />
        </div>
        <div className="flex flex-col flex-1">
          <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Filter Par Quantité</label>
          <input type="text" value={search.quantity} name='quantity' onChange={HandleChange}
            className="border-gray-300 w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Filter Par Quantité..." />
        </div>
        <div className="flex flex-col flex-1">
          <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Filter Par Unité</label>
          <input type="text" value={search.unite} name='unite' onChange={HandleChange}
            className="border-gray-300 w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Filter Par Unité..." />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 bg-gray-100 p-4 border-b border-gray-200 text-center">
          <div>
            <span className="font-bold text-green-600">Vert : </span>
            <span>Stock Confortable</span>
          </div>
          <div>
            <span className="font-bold text-yellow-500">Jaune : </span>
            <span>Attention</span>
          </div>
          <div>
            <span className="font-bold text-red-600">Rouge : </span>
            <span>alerte r´eapprovisionnement</span>
          </div>
        </div>

        <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className={styles.th}>Nom</th>
              <th className={styles.th}>Catégorie</th>
              <th className={styles.th}>Quantité</th>
              <th className={styles.th}>Unité</th>
              <th className={styles.th}>Seuil Min</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((article, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className={styles.td}>{article.name}</td>
                <td className="px-6 py-4 text-gray-600 text-center">{article.category}</td>
                {article.quantity > article.seuil_min * 1.3 ? (
                  <td className="px-6 py-4 text-green-600 font-semibold text-center">
                    <span className="bg-green-100 rounded-lg px-3 py-1">{article.quantity}</span>
                  </td>
                ) : article.quantity > article.seuil_min ? (
                  <td className="px-6 py-4 text-yellow-600 font-semibold text-center">
                    <span className="bg-yellow-100 rounded-lg px-3 py-1">{article.quantity}</span>
                  </td>
                ) : (
                  <td className="px-6 py-4 text-red-600 font-semibold text-center">
                    <span className="bg-red-100 rounded-lg px-3 py-1">{article.quantity}</span>
                  </td>
                )}
                <td className="px-6 py-4 text-gray-600 text-center">{article.unit}</td>
                <td className={styles.td}>{article.seuil_min}</td>
                <td>
                  <Link to={`/articles/${article.id}`} className={`m-auto flex justify-center md:justify-between items-center gap-2 cursor-pointer mt-6 px-5 w-fit py-3 mb-2 ${styles.red.bgRed} ${styles.red.bgRedHover}
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
