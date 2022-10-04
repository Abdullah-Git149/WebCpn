import React from 'react'
import { useSelector } from 'react-redux';
import { getPresentedCoupons } from '../store/slices/userSlice';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; 
ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = () => {
    const totalCoupons = useSelector(getPresentedCoupons); 
    const data = {
        labels: ['Percentage', 'Dollars', 'No Discount'],
        datasets: [
          {
             data: [totalCoupons?.coupons?.percentageCounpons,totalCoupons?.coupons?.DollarCounpons,totalCoupons?.coupons?.NoDiscountCounpons ],
            backgroundColor: [
              'rgb(0%, 64%, 100%)', 
              'rgb(100%, 83%, 0%)',
              'rgb(100%, 49%, 0%)', 
            ],  
          },
        ],
      };
    return (
        <>
           <Pie data={data} style={{ width: "100%", height: "100%" }} />
        </>
    )
}
export default PieChart