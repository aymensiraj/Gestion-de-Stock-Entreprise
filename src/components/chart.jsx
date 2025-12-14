import {LineChart,Line,BarChart,Bar,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer,CartesianGrid} from "recharts";
import { useSelector } from "react-redux";



const MouvementsJourChart = () => {
  // Liste des jours de la semaine
  const dayList = ["lundi", "mardi", "mercredi", "jeudi", "vendredi","samedi","dimanche"]

  // Fonction pour obtenir le nom du jour depuis une date
  const getDayName = (dateStr) => {
    const day = new Date(dateStr).toLocaleDateString("fr-FR", { weekday: "long" }) 
    return day.toLowerCase().trim() // Retourne en minuscule et sans espaces
  }

  // Hook personnalisé pour préparer les données du chart
  const useMovementChartData = () => {
    const movements = useSelector(state => state.movements.movements) // Récupérer les movements depuis Redux
    const dataObject = {} // Objet temporaire pour compter Entrées/Sorties par jour

    // Boucle sur chaque movement
    movements.forEach(m => {
      const day = getDayName(m.date)
      
      // Initialiser le jour dans l'objet si inexistant
      if (!dataObject[day]) {
          dataObject[day] = {
            day: day.charAt(0).toUpperCase() + day.slice(1),  // Capitaliser la première lettre
            Entrees: 0,
            Sorties: 0
        }
      }

      const type = m.type.toLowerCase().trim() // Normaliser le type

      // Incrémenter le compteur selon le type
      if (type === "entrée") dataObject[day].Entrees += 1
      if (type === "sortie") dataObject[day].Sorties += 1
    })

    // Retourner un tableau complet pour chaque jour, même si 0 mouvement
    return dayList.map(day => 
      dataObject[day] || { day: day.charAt(0).toUpperCase() + day.slice(1), Entrees: 0, Sorties: 0 }
    )
  }

  // Récupérer les données prêtes pour le chart
  const data = useMovementChartData()



  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height={300} >
        <LineChart data={data}>
          
          <CartesianGrid
            stroke="#e5e7eb" //color
            strokeDasharray="3 6" 
            vertical={false}
          />

          
          <XAxis
            dataKey="day"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          
          <Tooltip 
            contentStyle={{
              backgroundColor: "#111827",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "12px",
            }}
          />

          
          <Legend 
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ fontSize: "12px" }}
          />

          
          <Line 
            type="monotone"
            dataKey="Entrees"
            
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone"
            dataKey="Sorties"
            
            stroke="#c51231"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
    
  )
}

export default MouvementsJourChart;
