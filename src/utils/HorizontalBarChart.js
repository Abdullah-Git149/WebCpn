//  import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { faker } from '@faker-js/faker'; 
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options2 = {
//   indexAxis: 'y' ,
//   elements: {
//     bar: {
//       borderWidth: 2,
//     },
//   },
//   responsive: true,
//   plugins: {
//     legend: {
//       display: false,
//       position: 'right' ,
//     },
//     title: {
//       display: true,
//       text: 'Redeemed Coupons',
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

// export const data2 = {
//   labels,
//   datasets: [
//     {
//       label: '',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
//       borderColor: 'rgb(96%, 42%, 12%)',
//       backgroundColor: 'rgb(96%, 42%, 12%)',
//     }, 
//   ],
// };







import React from 'react'
import { useSelector } from 'react-redux';
import { getRedeemedCoupons } from '../store/slices/userSlice';
import { Bar } from 'react-chartjs-2';
import moment from "moment"
 import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
 ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const HorizontalChart = () => {
    const totalCoupons = useSelector(getRedeemedCoupons);
    var totalNumber = []
    var month = []

    totalCoupons?.coupons?.map((item ) => 
        totalNumber.push(item?.coupons)
    )

    totalCoupons?.coupons?.map((item ) => 
        month.push(moment(item?.month).format("MMM"))
    )
    const options = {
        indexAxis: 'y' ,
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'right' ,
          },
          title: {
            display: true,
            text: 'Redeemed Coupons',
          },
        },
      }; 
    const labels =  month; 

    const data = {
        labels,
        datasets: [
          {
            label: '',
            data: totalNumber,
            borderColor: 'rgb(96%, 42%, 12%)',
            backgroundColor: 'rgb(96%, 42%, 12%)',
          }, 
        ],
      }
    return (
        <>
            <Bar
                options={options}
                data={data}
            />
        </>
    )
}
export default HorizontalChart