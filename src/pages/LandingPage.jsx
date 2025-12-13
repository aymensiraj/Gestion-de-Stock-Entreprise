import { Link } from "react-router-dom"

import ouassimImg from '../assets/images/ouassim.png'
import aymenImg from '../assets/images/aymen.png'

const styles = {
  // Colors
  white : {
    bgWhite : "bg-white",
    textWhite : "text-white",
  },
  gray : {
    textGray800 : "text-gray-800",
    textGray700 : "text-gray-700",
    textGray600 : "text-gray-600",
    bgGray100 : "bg-gray-100",
  },
  red : {
    bgRed : "bg-[#c51231]",
    bgRedHover : "hover:bg-[#a01028]",
    textRed : "text-[#c51231]",
  },
  blue : {
    textBlue : "text-blue-600",
  },
  links : {
      montserrat : "font-['Montserrat'], sans-serif",
      text_size : "text-lg",
      text_gray : "text-[#757575]",
      hover_red : "hover:text-[#c51231]",
      transition_colors : "transition-colors",
  },
  mainDiv : "min-h-screen bg-gray-100 text-gray-800 flex flex-col pt-24",
  cardStyle : "p-5 bg-white shadow rounded-xl",
  pStyle : "mt-4 text-lg text-gray-600 max-w-2xl",
  sectionStyle : "flex flex-col items-center text-center mt-16 px-4",
  cardsPStyle : "text-gray-600 mt-2",
  h3Style : "text-2xl font-bold mb-6 text-gray-800 text-center",
  nameCardStyle : "flex flex-col items-center bg-white p-5 shadow rounded-xl",
};

function LandingPage() {
  return (
    <div className={`${styles.mainDiv}`}>

      <section className={`${styles.sectionStyle}`}>
        <h2 className={`text-4xl font-extrabold ${styles.red.textRed}`}>
          Gestion Professionnelle de Stock
        </h2>

        <p className={`${styles.pStyle}`}>
          Une application moderne et facile à utiliser pour gérer le stock dans les entreprises :
          contrôle des quantités, prévision des ruptures, et suivi de tous les mouvements en temps réel.
        </p>

        <Link to="/dashboard" className={`cursor-pointer mt-6 px-6 py-3 ${styles.red.bgRed} ${styles.red.bgRedHover}
                   text-white rounded-xl shadow-md transition`}>Accéder à l'application</Link>
      </section>

      <section className="mt-20 px-6 max-w-4xl mx-auto">
        <h3 className={`${styles.h3Style}`}>
          Fonctionnalités du Projet
        </h3>

        <div className="grid sm:grid-cols-2 gap-6">

          <div className={`${styles.cardStyle} cursor-pointer`}>
            <h4 className={`text-lg font-bold ${styles.red.textRed}`}>Gestion des Articles</h4>
            <p className={`${styles.cardsPStyle}`}>Ajout, modification et suppression des produits – avec suivi de la quantité,
              classification et seuil minimum de stockage.</p>
          </div>

          <div className={`${styles.cardStyle} cursor-pointer`}>
            <h4 className={`text-lg font-bold ${styles.red.textRed}`}>Mouvements</h4>
            <p className={`${styles.cardsPStyle}`}>Enregistrement des entrées et sorties avec mise à jour automatique des quantités.</p>
          </div>

          <div className={`${styles.cardStyle} cursor-pointer`}>
            <h4 className={`text-lg font-bold ${styles.red.textRed}`}>Alertes de Stock</h4>
            <p className={`${styles.cardsPStyle}`}>Codes couleur indiquant l’état du stock : confortable – attention – risque de rupture.</p>
          </div>

          <div className={`${styles.cardStyle} cursor-pointer`}>
            <h4 className={`text-lg font-bold ${styles.red.textRed}`}>Statistiques Détaillées</h4>
            <p className={`${styles.cardsPStyle}`}>Valeur du stock, nombre d’articles en danger, produits les plus consommés...</p>
          </div>

        </div>
      </section>

      <section className="mt-20 px-6 max-w-4xl mx-auto mb-20">
        <h3 className={`${styles.h3Style}`}>Équipe de Travail</h3>

        <div className="grid sm:grid-cols-2 gap-8">

          <div className={`${styles.nameCardStyle} cursor-pointer`}>
            <img src={ouassimImg} alt="Ouassim" className="w-30 h-30 rounded-full border"/>
            <h4 className={`text-lg font-bold mt-4 ${styles.red.textRed}`}>Ouassim Babakhali</h4>
            <p className={`${styles.gray.textGray600}`}>Développeur</p>
          </div>

          <div className={`${styles.nameCardStyle} cursor-pointer`}>
            <img src={aymenImg} alt="Aymen" className="w-30 h-30 rounded-full border"/>
            <h4 className={`text-lg font-bold mt-4 ${styles.red.textRed}`}>Aymen Siraj</h4>
            <p className={`${styles.gray.textGray600}`}>Développeur</p>
          </div>

        </div>
      </section>

      <footer className={`mt-auto w-full py-4 bg-gray-200 text-center ${styles.gray.textGray700}`}>
        © 2025 Ouassim / Aymen – Tous Droits Réservés
      </footer>

    </div>
  )
}

export default LandingPage
