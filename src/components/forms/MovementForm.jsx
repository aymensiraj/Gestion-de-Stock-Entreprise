import {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaList } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addMovement } from '../../services/movementsSlice';
import {updateQuantite} from "../../services/articlesSlice"


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

function MovementForm() {
  const movementsState = useSelector((state)=>state.movements.movements)
  const [movements,setMovements] = useState([])
  const [loading, setLoading] = useState(true);



  //API GET
  useEffect(() => {
 	const API_URL = 'http://localhost:4000/movements'; 
 	setLoading(true);

 	axios.get(API_URL)
 	.then(response => {

 	setMovements(response.data);
 	})

 	.catch(error => {
 	console.error("Erreur GET:", error);
 	})

 	.finally(() => {
 	setLoading(false);
 	});
}, []);

  //API POST
 const handlePost = () => {
 	const API_URL = 'http://localhost:4000/movements';
  const newMovement = {
    id: movementsState.length + 1,
    article: movementsInfo.article,
    type: movementsInfo.type,
    quantite: Number(movementsInfo.quantite),
    commentaire: movementsInfo.commentaire,
    date: movementsInfo.date
    };
	axios.post(API_URL, newMovement)

 	.then(response => {
 	console.log("Objet créé:", response.data);

 	})
 	.catch(error => {
 
 	console.error("Erreur POST:", error);
    setMovementsInfos({
      id: null,
      article: "",
      type: "",
      quantite: 0,
      commentaire: "",
      date : ""
    });
 	});
 };


  //ga3 larticle li kynin f articles jbnahom w 7tinahom f array rashom
  const articles = useSelector((state)=>state.articles.articles)
  const articleName = []
  articles.forEach(a => {
      if(!articleName.includes(a.name)){
        articleName.push(a.name)
      }
  });

  //form donnes 
  const [movementsInfo, setMovementsInfos] = useState({
    id: null,
    article: "",
    type: "",
    quantite: 0,
    commentaire: "",
    date : ""

  });

  const HandleChange = (e) => {
  setMovementsInfos({
    ...movementsInfo,
    [e.target.name]: e.target.value
  });
  }

  const handlePut = (article, quantite, MovementType) => {
	const id = article.id; 
	const API_URL = `http://localhost:4000/articles/${id}`;
 
	const updatedPost = {
    ...article,
    quantity: MovementType === "Entrée" ? article.quantity + quantite : article.quantity - quantite
  };

  console.log("Updated Post:", updatedPost);
 
 	axios.put(API_URL, updatedPost)

 	.then(response => {console.log("Objet mis à jour:", response.data);})

 	.catch(error => {console.error("Erreur PUT:", error);});
 };
  
  // nsifto lvalue li jbna mn form wnsiftohom l store
  const [quantiteErrorV2,setQuantiteErrorV2] = useState(false)
  const dispatch = useDispatch()
  const handleAddMovement = ()=>{
          const newMovement = {
          id: movementsState.length + 1,
          article: movementsInfo.article,
          type: movementsInfo.type,
          quantite: Number(movementsInfo.quantite),
          commentaire: movementsInfo.commentaire,
          date: movementsInfo.date
        };
        //bach mli tkon quantity dyl new movement kbr mn quantity l9dima maydirch sortie ga3 
        const articleToUpdate = articles.find(a => a.name === newMovement.article);
        if(newMovement.quantite>articleToUpdate.quantity && newMovement.type=="Sortie"){
          setQuantiteErrorV2(true)
          return
        }
        
        dispatch(addMovement(newMovement));
        dispatch(updateQuantite(newMovement))
        console.log("Article ajouté au store Redux:", newMovement);
        handlePut(articleToUpdate, newMovement.quantite, newMovement.type)
        handlePost()

  }

  


  const [errors,setErrors] = useState(
  {
      articleError: false,
      typeError: false,
      quantiteError: false,
      commentaireError: false,
      dateError: false,
  }  
  )
  const handleErrors = () => {

    setErrors({
      articleError: false,
      typeError: false,
      quantiteError: false,
      commentaireError: false,
      dateError: false,
    })

    let hasError = false;

    if (!movementsInfo.article.trim() ) {
      setErrors((prevErrors) => ({ ...prevErrors, articleError: true }));
      hasError = true;
    }
    if (!movementsInfo.type.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, typeError: true }));
      hasError = true;
    }

    if (movementsInfo.quantite <= 0) {
      setErrors((prevErrors) => ({ ...prevErrors, quantiteError: true }));
      hasError = true;
    }
    if (!movementsInfo.commentaire.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, commentaireError: true }));
      hasError = true;
    }

    if (!movementsInfo.date.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, dateError: true }));
      hasError = true;
    }

    if (hasError) return true;
    return false;
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    const hasErrors = handleErrors();
    if (hasErrors) {
      console.log("Le formulaire contient des erreurs. Veuillez les corriger avant de soumettre.");
      return;
    } 
    handleAddMovement()
    setMovementsInfos({
      id: null,
      article: "",
      type: "",
      quantite: 0,
      commentaire: "",
      date : ""
      });
  }
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  }
// hado dyl date bach yb9a m7dod ra fsimana li fiha 7na
const today = new Date()
const endOfWeek = new Date(today)
endOfWeek.setDate(today.getDate() + 7)
const minDate = today.toISOString().split("T")[0]
const maxDate = endOfWeek.toISOString().split("T")[0]




 if (loading) return <p>Chargement des Movements...</p>;
  return (
    <div className={`${styles.mainDiv}`}>
      <div className="max-w-8xl w-full mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 px-5">
          <h1 className={`text-5xl font-bold text-center ${styles.red.textRed} tracking-tight`}>Ajouter un Movement</h1>
  
          <button onClick={handleNavigate} className={`flex justify-between items-center gap-2 cursor-pointer px-6 py-3 ${styles.green.bgGreen600} ${styles.green.bgGreenHover}
          text-white rounded-xl shadow-md transition`}><span><FaList /></span>Tableau des Movements</button>
        </div>

        {/* Card */}
        <div className={`${styles.cardStyle}`}>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Article */}
            <div>
              <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Article</label>
              <select value={movementsInfo.article} onChange={HandleChange} name='article' className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600">
                <option value={-1}>Choisir un article</option>
                {
                  articleName.map((a,i)=>(
                    <option key={i} value={a}>{a}</option>

                  ))
                }
              </select>
              {errors.articleError && ( <p className={`${styles.errorText}`}>Veuillez sélectionner une article.</p>)}

            </div>

            {/* Type */}
            <div>
              <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Type de mouvement</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input value="Entrée" checked={movementsInfo.type=="Entrée"} onChange={HandleChange} type="radio" name="type" />
                  <span className={`${styles.green.textGreen700}`}>Entrée</span>
                </label>

                <label className="flex items-center gap-2">
                  <input value="Sortie" checked={movementsInfo.type=="Sortie"} onChange={HandleChange} type="radio" name="type" />
                  {errors.typeError && (<p className={`${styles.errorText}`}>Veuillez sélectionner le type</p>)}
                  <span className={`${styles.red.textRed}`}>Sortie</span>
                </label>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Quantité</label>
              <input value={movementsInfo.quantite}  onChange={HandleChange} name='quantite' type="number" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Entrer la quantité"/>
              {quantiteErrorV2 && (<p className={`${styles.errorText}`}>La quantité doit être supérieure à quantite dans article.</p>)}
              {errors.quantiteError && (<p className={`${styles.errorText}`}>La quantité doit être supérieure à 0.</p>)}

            </div>

            {/* Comment */}
            <div>
              <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Commentaire</label>
              <textarea value={movementsInfo.commentaire}  onChange={HandleChange} name='commentaire' rows="4" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Commentaire (optionnel)..."></textarea>
              {errors.commentaireError && (<p className={`${styles.errorText}`}>Le champ de commentaire est vide</p>)}
            </div>

            {/* Date */}
            
            <div>
              <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Date</label>
              <input min={minDate} max={maxDate} value={movementsInfo.date}  onChange={HandleChange} name='date' type="date" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"/>
              {errors.dateError && (<p className={`${styles.errorText}`}>Entre la date</p>)}
            </div>

            {/* Submit Button */}
            <button type="submit" className={`cursor-pointer w-full py-3 rounded-lg text-white font-semibold transition ${styles.red.bgRed} ${styles.red.bgRedHover}`}>
              Enregistrer le mouvement
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default MovementForm
