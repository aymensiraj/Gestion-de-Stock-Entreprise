import { useSelector } from 'react-redux';
import MouvementsJourChart from "../components/chart";

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

function Dashboard() {
    // Récupérer les articles et movements depuis le store Redux
    const articlesState = useSelector((state) => state.articles.articles);
    const movementsState = useSelector((state) => state.movements.movements);

    // Calculer la quantité totale de tous les articles
    const totalQuantity = articlesState.reduce(
    (total, article) => total + parseInt(article.quantity),
    0
    );

    // Compter le nombre d'articles en stock inférieur au seuil minimal
    const lowStockArticles = articlesState.filter(
    article => article.quantity < article.seuil_min
    ).length;

    // Obtenir le nombre total de movements
    const movementStateLength = movementsState.length;

    // Obtenir les 3 premiers articles dont le stock est proche du seuil minimal (x1.3)
    const last3lowStockArticles = articlesState
    .filter(article => article.quantity < article.seuil_min * 1.3)
    .slice(0, 3);



    // Tableau pour stocker la consommation des articles
    const consumption = {};

    // Parcourir tous les movements pour calculer la consommation (Sorties)
    movementsState.forEach(movement => {
    if (movement.type === "Sortie") {
        if (!consumption[movement.article]) {
        consumption[movement.article] = movement.quantite; // Initialiser si pas encore présent
        } else {
        consumption[movement.article] += movement.quantite; // Ajouter à la consommation existante
        }
    }
    });

    // Obtenir les 5 articles les plus consommés
    const top5Ids = Object.entries(consumption)
    .sort((a, b) => b[1] - a[1]) // Trier par quantité décroissante
    .slice(0, 5); // Prendre les 5 premiers

    // Récupérer les infos complètes des articles les plus consommés
    const top5Articles = top5Ids.map(([id, total]) => {
    const article = articlesState.find(article => article.name == id); // Trouver l'article correspondant
    if (!article) {
        // Si l'article n'existe plus, on peut l'ignorer ou mettre un placeholder
        return {
        name: "Article supprimé",
        total
        };
    } 
    return {
        name: article.name, // Nom de l'article
        total              // Quantité totale consommée
    };
    });


 return (
    <div className={`${styles.mainDiv}`}>

    {/*  TOP CARDS  */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Total Stock Value  */}
        <div className="bg-white text-gray-800 flex flex-col px-4 py-6 rounded-xl shadow-md border border-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 cursor-pointer">
                <p className={`${styles.gray.textGray500}`}>Quantité Totale</p>
                <h2 className={`text-3xl font-bold mt-2 ${styles.blue.textBlue}`}> {totalQuantity} Articles</h2>
                <span className={`${styles.span}`}>+12 % ce mois-ci</span>
            </div>
        </div>

        {/*  Low Stock Alerts  */}
        <div className="bg-white text-gray-800 flex flex-col px-4 py-6 rounded-xl shadow-md border border-gray-100">
                <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 cursor-pointer">
                <p className={`${styles.gray.textGray500}`}>Alertes de stock faible</p>
                <h2 className={`text-3xl font-bold mt-2 ${styles.blue.textBlue}`}> {lowStockArticles} </h2>
                <span className={`${styles.span}`}>Action requise</span>
            </div>
        </div>

         {/* Monthly Movements  */}
        <div className="bg-white text-gray-800 flex flex-col px-4 py-6 rounded-xl shadow-md border border-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 cursor-pointer">
                <p className={`${styles.gray.textGray500}`}>Mouvements ce mois-ci</p>
                <h2 className={`text-3xl font-bold mt-2 ${styles.blue.textBlue}`}> {movementStateLength} </h2>
                <span className={`${styles.span}`}>Entrées et sorties</span>
            </div>
        </div>

    </div>

     {/* ALERTS LIST  */}
    <div className="bg-white text-gray-800 flex flex-col px-4 py-6 rounded-xl shadow-md border border-gray-100 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 cursor-pointer">
            <h2 className={`text-2xl font-bold mb-4 ${styles.red.textRed}`}>Stock Alerts</h2>

            <div className="space-y-3">
                {last3lowStockArticles.length === 0 ? (
                <p className={`${styles.gray.textGray700}`}>Aucune alerte de stock faible.</p>
                ) : (
                last3lowStockArticles.map((article) =>
                    (article.quantity <= article.seuil_min && article.quantity > 0) ? (
                    <div key={article.id} className="flex justify-between bg-red-50 border border-red-200 p-4 rounded-lg">
                        <span className={`font-medium ${styles.gray.textGray800}`}>
                        {article.name} (REF-{article.reference})
                        </span>
                        <span className={`${styles.red.spanRed} font-semibold`}>Il n'en reste que {article.quantity} </span>
                    </div>
                    ) : article.quantity == 0 ? (
                    <div key={article.id} className="flex justify-between bg-red-50 border border-red-200 p-4 rounded-lg">
                        <span className={`font-medium ${styles.gray.textGray800}`}>
                        {article.name} (REF-{article.reference})
                        </span>
                        <span className={`${styles.red.spanRed} font-semibold`}>Rupture de stock</span>
                    </div>
                    ) : (
                    <div key={article.id} className="flex justify-between bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <span className={`font-medium ${styles.gray.textGray800}`}> {article.name} (REF-{article.reference}) </span>
                        <span className={`${styles.textYellow} font-semibold`}> Faible: {article.quantity} unités </span>
                    </div>
                    )
                )
                )}
            </div>
        </div>
    </div>

     {/* CHART + MOST USED  */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

         {/* Chart placeholder  */}
        <div className={`${styles.cardStyle} cursor-pointer`}>
            <h2 className={`text-2xl font-bold mb-3 ${styles.red.textRed}`}>Mouvements (7 derniers jours)</h2>
            <MouvementsJourChart/>
        </div>

         {/* Top items  */}
        <div className={`${styles.cardStyle} cursor-pointer`}>
            <h2 className={`text-2xl font-bold mb-3 ${styles.red.textRed}`}>Les 5 produits les plus consommés</h2>

            <ul className="space-y-3 bg-white p-4 rounded-lg shadow-sm border mt-5">
            {top5Articles.length ? (
                top5Articles.map((article, index) => (
                <li
                    key={index}
                    className="flex justify-between items-center px-3 py-2 rounded hover:bg-gray-50 transition"
                >
                    <span className="font-medium text-gray-800">{article.name}</span>
                    <span className="text-gray-500 font-semibold">{article.total} movements</span>
                </li>
                ))
            ) : (
                <p className="text-gray-500 text-center py-4">Aucun produit consommé récemment</p>
            )}
            </ul>
        </div>

    </div>

    </div>

 )
}

export default Dashboard