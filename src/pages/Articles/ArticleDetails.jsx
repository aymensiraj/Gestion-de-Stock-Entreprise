import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { deleteArticle } from '../../services/articlesSlice';
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

  // Récupérer les articles depuis le store Redux
  const articlesState = useSelector((state) => state.articles.articles);

  // Récupérer le dispatch pour envoyer des actions Redux
  const dispatcher = useDispatch();

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
        // Stocker les articles récupérés dans le state local
        setArticles(response.data);
      })
      .catch(error => {
        console.error("Erreur GET:", error); // Afficher les erreurs éventuelles
      })
      .finally(() => {
        setLoading(false); // Désactiver le loader une fois terminé
      });
  }, []);

  // Récupérer l'id depuis les paramètres de l'URL
  const { id } = useParams();

  // Chercher l'article correspondant à l'id dans le store Redux
  const article = articlesState.find((art) => art.id == id);

  // Hook pour la navigation
  const navigate = useNavigate();

  // Fonction pour revenir à la page précédente
  const handleNavigate = () => {
    navigate(-1);
  }

  // Fonction pour naviguer vers la page d'édition de l'article
  const navigateEdit = () => {
    navigate(`/articles/edit/${article.id}`);
  }

  // Fonction pour supprimer l'article depuis l'API
  const deleteFromApi = (id) => {
    const API_URL = `http://localhost:4000/articles/${id}`;

    axios.delete(API_URL)
      .then(() => {
        console.log("deleted with success");
      })
      .catch(error => {
        console.error("Erreur DELETE:", error);
      });
  };

  // Fonction pour supprimer un article à la fois du store Redux et de l'API
  const handleDelete = (id) => {
    dispatcher(deleteArticle(id)); // Supprimer du store Redux
    deleteFromApi(id);             // Supprimer depuis l'API
    navigate(-1);                  // Retourner à la page précédente
  }

  // Afficher un message de chargement si les articles sont en cours de récupération
  if (loading) return <p>Chargement des Articles...</p>;

  // Afficher un message si l'article n'existe pas ou a été supprimé
  if (!article) {
    return <p className="text-center mt-10">Article introuvable ou supprimé.</p>;
  }

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
              <button onClick={() => handleDelete(article.id)} className={`flex justify-center w-full items-center gap-2 cursor-pointer px-6 py-3 ${styles.red.bgRed} ${styles.red.bgRedHover}
                          text-white rounded-xl shadow-md transition`}><span><MdDelete /></span>Supprimer l’article</button>
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