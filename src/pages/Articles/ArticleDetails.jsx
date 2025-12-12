import { useState, useEffect, React } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { FaList } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import axios from 'axios';

const styles = {
  gray : {
    textGray800 : "text-gray-800",
    textGray700 : "text-gray-700",
    textGray500 : "text-gray-500",
    bgGray100 : "bg-gray-100",
  },
  red : {
    bgRed : "bg-[#c51231]",
    bgRedHover : "hover:bg-[#a01028]",
    textRed : "text-[#c51231]",
    spanRed : "text-red-600",
  },
  blue : {
    textBlue : "text-blue-600",
  },
  green : {
    bgGreen600 : "bg-green-600",
    textGreen700 : "text-green-700",
    bgGreenHover : "hover:bg-green-700",
  },
  textYellow : "text-yellow-600",
  mainDiv : "min-h-screen bg-gray-100 text-gray-800 flex flex-col pt-30 px-6 md:px-10",
  span : "text-sm text-gray-600 font-semibold",
  cardStyle : "bg-white rounded-xl shadow-md p-6",
  cardSpan : "text-blue-600 font-semibold",
};

function ArticleDetails() {

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

  const { id } = useParams();
  const article = articles.find((art) => art.id == id);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  }
  const navigateEdit = () => {
    navigate(`/articles/edit/${article.id}`);
  }

 if (loading) return <p>Chargement des Articles...</p>;

  return (
    <div className={`${styles.mainDiv}`}>
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
            <div className="text-center items-center mb-8">
              <h1 className={`text-5xl font-bold text-center ${styles.red.textRed} tracking-tight`}>Les Details D'Article</h1>
            </div>
            <div className="space-y-4 px-4">
                <div>
                    <span className="font-semibold text-gray-700">Id:</span>
                    <span className="ml-2 text-gray-600"> {article.id} </span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Référence:</span>
                    <span className="ml-2 text-gray-600"> {article.reference} </span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Nom:</span> 
                    <span className="ml-2 text-gray-600"> {article.name} </span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Catégorie:</span> 
                    <span className="ml-2 text-gray-600"> {article.category} </span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Quantité:</span> 
                    <span className="ml-2 text-gray-600"> {article.quantity} </span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Unité:</span> 
                    <span className="ml-2 text-gray-600"> {article.unit} </span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Seuil Min:</span> 
                    <span className="ml-2 text-gray-600"> {article.seuil_min} </span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Fournisseur:</span> 
                    <span className="ml-2 text-gray-600"> {article.fournisseur} </span>
                </div>
                
            </div>
            <div className="mt-8 flex justify-center gap-3">
              <button onClick={navigateEdit} className={`flex justify-center w-full items-center gap-2 cursor-pointer px-6 py-3 ${styles.green.bgGreen600} ${styles.green.bgGreenHover}
                          text-white rounded-xl shadow-md transition`}><span><MdModeEdit /></span>Modifier l’article</button>
              <button onClick={handleNavigate} className={`flex justify-center w-full items-center gap-2 cursor-pointer px-6 py-3 ${styles.red.bgRed} ${styles.red.bgRedHover}
                          text-white rounded-xl shadow-md transition`}><span><FaList /></span>Retour au tableau</button>
            </div>
        </div>
    </div>
  )
}

export default ArticleDetails