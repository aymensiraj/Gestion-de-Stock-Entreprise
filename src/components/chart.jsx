import {LineChart,Line,BarChart,Bar,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer,CartesianGrid} from "recharts";
import { useSelector } from "react-redux";



const MouvementsJourChart = () => {
  const dayList = ["lundi", "mardi", "mercredi", "jeudi", "vendredi","samedi","dimanche"]

  const getDayName = (dateStr) => {
    const day = new Date(dateStr).toLocaleDateString("fr-FR", { weekday: "long" }) //kijib kola day mn date li kyna f form wyrodo str b fr wdik "long" ra bach yjib smyat nhar kamla
    return day.toLowerCase().trim() // yrodo lower bach n9dro n9arnoh m3a array ta3 dayList
  }

  const useMovementChartData = () => {
    const movements = useSelector(state => state.movements.movements)
    const dataObject = {} // hada object li fih days w entrees w sorties li jayin

    movements.forEach(m => {
    const day = getDayName(m.date)
      if (!dataObject[day]) {
          dataObject[day] = {
            day: day.charAt(0).toUpperCase() + day.slice(1),  
            Entrees: 0,
            Sorties: 0
        }
      }
      const type = m.type.toLowerCase().trim() 

      if (type === "entrée") dataObject[day].Entrees += 1
      if (type === "sortie") dataObject[day].Sorties += 1
    })

    // drt had condition bach chart mayb9ach 5awi bach tala kan day mafih ta entrees wla sorties yban day fchart wyban entree wsorties 0
    return dayList.map(day => 
      dataObject[day] || { day: day.charAt(0).toUpperCase() + day.slice(1), Entrees: 0, Sorties: 0 }
    )

}

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

          
          <Tooltip // hada ra bach la drti hover fchi day y3tk detail dylo 
            contentStyle={{
              backgroundColor: "#111827",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "12px",
            }}
          />

          
          <Legend // dak lkey bach tfhm kola lon dylch 
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ fontSize: "12px" }}
          />

          
          <Line // hada dyl entrees 
            type="monotone"
            dataKey="Entrees"
            
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
          <Line // hada dyl sorties
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
// ra la mbgitich tfhm
// hdchi sahl
export default MouvementsJourChart;
