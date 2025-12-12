import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { FaList } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addArticle } from '../../services/articlesSlice';

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
  mainDiv : "min-h-screen bg-gray-100 text-gray-800 flex flex-col pt-10 px-6 md:px-10",
  span : "text-sm text-gray-600 font-semibold",
  cardStyle : "bg-white rounded-xl shadow-md p-6",
  cardSpan : "text-blue-600 font-semibold",
  invalidInput : "border-red-500 focus:ring-red-500",
  validInput : "border-gray-300",
  errorText : "text-red-500 text-sm"
};

function ArticleForm() {

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

const [articleInfos, setArticleInfos] = useState({
  id: null,
  name: "",
  reference: "",
  category: "",
  quantity: 0,
  unit: "",
  seuil_min: 0,
  fournisseur: "",
});
const [postMessage, setPostMessage] = useState("Cliquez pour créer un article.");
 
 const handlePost = () => {
 	const API_URL = 'http://localhost:4000/articles';
 	const newArticle = {
    id: articles.length + 1,
    name: articleInfos.name,
    reference: articleInfos.reference,
    category: articleInfos.category,
    quantity: Number(articleInfos.quantity),
    unit: articleInfos.unit,
    seuil_min: Number(articleInfos.seuil_min),
    fournisseur: articleInfos.fournisseur,
 	};
	setPostMessage("Envoi en cours...");
	axios.post(API_URL, newArticle)

 	.then(response => {
 	console.log("Objet créé:", response.data);

 	})
 	.catch(error => {
 
 	console.error("Erreur POST:", error);
    setArticleInfos({
      id: null,
      name: "",
      reference: "",
      category: "",
      quantity: 0,
      unit: "",
      seuil_min: 0,
      fournisseur: "",
    });
 	});
 };

  const articlesState = useSelector((data) => data.articles.articles);
  const fournisseurs = useSelector((data) => data.articles.fournisseurs);
  const categories = useSelector((data) => data.articles.categories);
  const unites = useSelector((data) => data.articles.unites);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    nameError: false,
    referenceError: false,
    categoryError: false,
    quantityError: false,
    unitError: false,
    seuil_minError: false,
    fournisseurError: false,
  });

  const handleAddArticle = () => {

    const newArticle = {
      id: articlesState.length + 1,
      name: articleInfos.name,
      reference: articleInfos.reference,
      category: articleInfos.category,
      quantity: Number(articleInfos.quantity),
      unit: articleInfos.unit,
      seuil_min: Number(articleInfos.seuil_min),
      fournisseur: articleInfos.fournisseur,
    };
    dispatch(addArticle(newArticle));
    console.log("Article ajouté au store Redux:", newArticle);
    setArticleInfos({
      id: null,
      name: "",
      reference: "",
      category: "",
      quantity: 0,
      unit: "",
      seuil_min: 0,
      fournisseur: "",
    });
  }

  const HandleChange = (e) => {
    setArticleInfos({
      ...articleInfos,
      [e.target.name]: e.target.value,
    });
  }

  const handleErrors = () => {

    setErrors({
      nameError: false,
      referenceError: false,
      categoryError: false,
      quantityError: false,
      unitError: false,
      seuil_minError: false,
      fournisseurError: false,
    })

    let hasError = false;

    if (!articleInfos.name.trim() || articleInfos.name.length < 3) {
      setErrors((prevErrors) => ({ ...prevErrors, nameError: true }));
      hasError = true;
    }
    if (!articleInfos.reference.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, referenceError: true }));
      hasError = true;
    }
    if (!articleInfos.category.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, categoryError: true }));
      hasError = true;
    }
    if (articleInfos.quantity <= 0) {
      setErrors((prevErrors) => ({ ...prevErrors, quantityError: true }));
      hasError = true;
    }
    if (!articleInfos.unit.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, unitError: true }));
      hasError = true;
    }
    if (Number(articleInfos.seuil_min) <= 0 || Number(articleInfos.seuil_min) > Number(articleInfos.quantity)) {
      setErrors((prevErrors) => ({ ...prevErrors, seuil_minError: true }));
      hasError = true;
    }
    if (!articleInfos.fournisseur.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, fournisseurError: true }));
      hasError = true;
    }

    if (hasError) return true;
    return false;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasErrors = handleErrors();
    if (hasErrors) {
      console.log("Le formulaire contient des erreurs. Veuillez les corriger avant de soumettre.");
      return;
    } 
    
    handlePost();
    handleAddArticle();
  }

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  }

  const handleReset = () => {
    setArticleInfos({
      id: null,
      name: "",
      reference: "",
      category: "",
      quantity: 0,
      unit: "",
      seuil_min: 0,
      fournisseur: "",
    });
  }

  
 if (loading) return <p>Chargement des Articles...</p>;

  return (
    <div className={`${styles.mainDiv}`}>
      <div className="max-w-8xl w-full mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 px-5">
          <h1 className={`text-5xl font-bold text-center ${styles.red.textRed} tracking-tight`}>Ajouter un Article</h1>
  
          <button onClick={handleNavigate} className={`flex justify-between items-center gap-2 cursor-pointer px-6 py-3 ${styles.green.bgGreen600} ${styles.green.bgGreenHover}
                      text-white rounded-xl shadow-md transition`}><span><FaList /></span>Tableau des Articles</button>
        </div>

        {/* Card */}
        <div className={`${styles.cardStyle}`}>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Nom */}
            <div>
              <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Nom</label>
              <input type="text" value={articleInfos.name} name='name' onChange={HandleChange} className={`${errors.nameError ? styles.invalidInput : styles.validInput} w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600`}
                placeholder="Entrer le nom"/>
                {errors.nameError && ( <p className={`${styles.errorText}`}> Le nom de l’article doit contenir au moins 3 caractères. </p>)}
            </div>

            {/* reference */}
            <div>
              <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Référence</label>
              <input type="text" value={articleInfos.reference} name='reference' onChange={HandleChange} className={`${errors.referenceError ? styles.invalidInput : styles.validInput} w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600`}
                placeholder="Entrer la référence"/>
                {errors.referenceError && (<p className={`${styles.errorText}`}>La référence est obligatoire.</p>)}
            </div>
            
            {/* category */}
            <div>
              <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Catégorie</label>
              <select value={articleInfos.category} name='category' onChange={HandleChange} className={`${errors.categoryError ? styles.invalidInput : styles.validInput} w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600`}>
                <option value="">Choisir une catégorie</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              {errors.categoryError && (<p className={`${styles.errorText}`}>Veuillez sélectionner une catégorie.</p>)}
            </div>

            {/* quantite */}
            <div>
              <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Quantité</label>
              <input type="number" value={articleInfos.quantity} name='quantity' onChange={HandleChange} className={`${errors.quantityError ? styles.invalidInput : styles.validInput} w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600`}
                placeholder="Entrer la quantité"/>
                {errors.quantityError && (<p className={`${styles.errorText}`}>La quantité doit être supérieure à 0.</p>)}
            </div>
            
            {/* unite */}
            <div>
              <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Unité</label>
              <select value={articleInfos.unit} name='unit' onChange={HandleChange} className={`${errors.unitError ? styles.invalidInput : styles.validInput} w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600`}>
                <option value="">Choisir une unité</option>
                {unites.map((unite, index) => (
                  <option key={index} value={unite.symbol}>{unite.name}</option>
                ))}
              </select>
              {errors.unitError && (<p className={`${styles.errorText}`}>Veuillez choisir une unité.</p>)}
            </div>

            {/* seuil min */}
            <div>
              <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Seuil Min</label>
              <input value={articleInfos.seuil_min} name='seuil_min' onChange={HandleChange} type="number" className={`${errors.seuil_minError ? styles.invalidInput : styles.validInput} w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600`}
                placeholder="Entrer la Seuil min"/>
                {errors.seuil_minError && (<p className={`${styles.errorText}`}>Le seuil minimum doit être positif et inférieur à la quantité.</p>)}
            </div>
            
            {/* fournisseur */}
            <div>
              <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Fournisseur</label>
              <select value={articleInfos.fournisseur} name='fournisseur' onChange={HandleChange} className={`${errors.fournisseurError ? styles.invalidInput : styles.validInput} w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600`}>
                <option value="">Choisir un Fournisseur</option>
                {fournisseurs.map((fournisseur, index) => (
                  <option key={index} value={fournisseur}>{fournisseur}</option>
                ))}
              </select>
              {errors.fournisseurError && (<p className={`${styles.errorText}`}>Veuillez sélectionner un fournisseur.</p>)}
            </div>

            <div className='flex gap-3'>
              {/* Submit Button */}
              <button type="submit" className={`cursor-pointer w-full py-3 rounded-lg text-white font-semibold transition ${styles.green.bgGreen600} ${styles.green.bgGreenHover}`}>
                Enregistrer l'article
              </button>

              {/* Reset Button */}
              <button type="reset" onClick={handleReset} className={`cursor-pointer w-full py-3 rounded-lg text-white font-semibold transition ${styles.red.bgRed} ${styles.red.bgRedHover}`}>
                Reset
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default ArticleForm
