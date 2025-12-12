import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { FaList } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addMovement } from '../../services/movementsSlice';

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

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  }

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
          <form className="space-y-6">
            
            {/* Article */}
            <div>
              <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Article</label>
              <select className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600">
                <option>Choisir un article</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Type de mouvement</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="type" />
                  <span className={`${styles.green}`}>Entrée</span>
                </label>

                <label className="flex items-center gap-2">
                  <input type="radio" name="type" />
                  <span className={`${styles.red.textRed}`}>Sortie</span>
                </label>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Quantité</label>
              <input type="number" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Entrer la quantité"/>
            </div>

            {/* Comment */}
            <div>
              <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Commentaire</label>
              <textarea rows="4" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Commentaire (optionnel)..."></textarea>
            </div>

            {/* Date */}
            <div>
              <label className={`block mb-1 font-semibold ${styles.gray.textGray700}`}>Date</label>
              <input type="date" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"/>
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
