import React from 'react'
import { useSelector } from 'react-redux';
import { getTotalCoupons } from '../store/slices/userSlice';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import moment from "moment" 
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const LineChart = () => {
    const totalCoupons = useSelector(getTotalCoupons);
    var totalNumber = []
    var month = []

    totalCoupons?.coupons?.map((item ) => 
        totalNumber.push(item?.coupons)
    )

    totalCoupons?.coupons?.map((item ) => 
        month.push(moment(item?.month).format("MMM"))
    )
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',

            },
            title: {
                display: true,
                text: 'Total Coupons',
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
                borderColor: 'rgb(100%, 35%, 54%)',
                backgroundColor: 'rgb(100%, 35%, 54%)',
            },
        ],
    };
    return (
        <>
            <Line
                options={options}
                data={data}
            />
        </>
    )
}
export default LineChart