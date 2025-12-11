import { Link } from "react-router-dom"

const colors = {
  // Colors
  red : {
    bgRed : "bg-[#c51231]",
    bgRedHover : "hover:bg-[#0A3161]",
    textRed : "text-[#c51231]",
},
  // Sizes
  small: 'px-3 py-2',
  medium: 'px-4 py-2',
  large: 'px-5 py-2',
};

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">

      <header className="w-full p-5 bg-white shadow">
        <img src="src/assets/images/logo.jpeg" alt="Atlas Manufacturing" className="w-40 py-3 px-3 mx-6" />
      </header>

      <section className="flex flex-col items-center text-center mt-16 px-4">
        <h2 className={`text-4xl font-extrabold ${colors.red.textRed}`}>
          Gestion Professionnelle de Stock
        </h2>

        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Une application moderne et facile à utiliser pour gérer le stock dans les entreprises :
          contrôle des quantités, prévision des ruptures, et suivi de tous les mouvements en temps réel.
        </p>

        <Link to="/dashboard" className={`mt-6 px-6 py-3 ${colors.red.bgRed} ${colors.red.bgRedHover}
                   text-white rounded-xl shadow-md transition`}>Accéder à l'application</Link>
      </section>

      <section className="mt-20 px-6 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Fonctionnalités du Projet
        </h3>

        <div className="grid sm:grid-cols-2 gap-6">

          <div className="p-5 bg-white shadow rounded-xl">
            <h4 className={`text-lg font-bold ${colors.red.textRed}`}>Gestion des Articles</h4>
            <p className="text-gray-600 mt-2">Ajout, modification et suppression des produits – avec suivi de la quantité,
              classification et seuil minimum de stockage.</p>
          </div>

          <div className="p-5 bg-white shadow rounded-xl">
            <h4 className={`text-lg font-bold ${colors.red.textRed}`}>Mouvements</h4>
            <p className="text-gray-600 mt-2">Enregistrement des entrées et sorties avec mise à jour automatique des quantités.</p>
          </div>

          <div className="p-5 bg-white shadow rounded-xl">
            <h4 className={`text-lg font-bold ${colors.red.textRed}`}>Alertes de Stock</h4>
            <p className="text-gray-600 mt-2">Codes couleur indiquant l’état du stock : confortable – attention – risque de rupture.</p>
          </div>

          <div className="p-5 bg-white shadow rounded-xl">
            <h4 className={`text-lg font-bold ${colors.red.textRed}`}>Statistiques Détaillées</h4>
            <p className="text-gray-600 mt-2">Valeur du stock, nombre d’articles en danger, produits les plus consommés...</p>
          </div>

        </div>
      </section>

      <section className="mt-20 px-6 max-w-4xl mx-auto mb-20">
        <h3 className="text-2xl font-bold text-center mb-8">Équipe de Travail</h3>

        <div className="grid sm:grid-cols-2 gap-8">

          <div className="flex flex-col items-center bg-white p-5 shadow rounded-xl">
            <img src="src/assets/images/ouassim.png" alt="Ouassim" className="w-30 h-30 rounded-full border"/>
            <h4 className={`text-lg font-bold mt-4 ${colors.red.textRed}`}>Ouassim Babakhali</h4>
            <p className="text-gray-600">Développeur Front-End</p>
          </div>

          <div className="flex flex-col items-center bg-white p-5 shadow rounded-xl">
            <img src="src/assets/images/aymen.png" alt="Aymen" className="w-30 h-30 rounded-full border"/>
            <h4 className={`text-lg font-bold mt-4 ${colors.red.textRed}`}>Aymen Siraj</h4>
            <p className="text-gray-600">Développeur Front-End</p>
          </div>

        </div>
      </section>

      <footer className="mt-auto w-full py-4 bg-gray-200 text-center text-gray-700">
        © 2025 Ouassim / Aymen – Tous Droits Réservés
      </footer>

    </div>
  )
}

export default LandingPage
