import React from 'react'
import { Line, defaults } from 'react-chartjs-2'
import '../styles/Dashboard.css'

function Dashboard() {
    return (
        <div>
            <div className='db-chart'>
                <Line
                    data={{
                        labels: ['01:01:01', '01:01:02', '01:01:03', '01:01:04', '01:01:05', '01:01:06'],
                        datasets: [
                            {
                                label: 'Temperature',
                                data: [12, 19, 3, 5, 2, 3],
                                backgroundColor: [
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)',
                                ],
                                borderWidth: 1,
                            },
                            {
                                label: 'Humidity',
                                data: [10, 50, 60, 30, 20, 70],
                                backgroundColor: [
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    }}
                    height={200}
                    width={700}
                    options={{
                        responsive: true,
                        interaction: {
                            mode: 'index',
                            intersect: false,
                        },
                        stacked: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Temperature - Humidity'
                            }
                        },
                        scales: {
                            y: {
                                type: 'linear',
                                display: true,
                                position: 'left',
                            },
                            y1: {
                                type: 'linear',
                                display: true,
                                position: 'right',
                                grid: {
                                    drawOnChartArea: false,
                                },
                            },
                        }
                    }}
                />
            </div>
            <div className='db-chart'>
                <Line
                    data={{
                        labels: ['01:01:01', '01:01:02', '01:01:03', '01:01:04', '01:01:05', '01:01:06'],
                        datasets: [
                            {
                                label: 'Temperature',
                                data: [12, 19, 3, 5, 2, 3],
                                backgroundColor: [
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)',
                                ],
                                borderWidth: 1,
                            }
                        ],
                    }}
                    height={200}
                    width={700}
                    options={{
                        responsive: true,
                        interaction: {
                            mode: 'index',
                            intersect: false,
                        },
                        stacked: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Light intensity'
                            }
                        },
                        scales: {
                            y: {
                                type: 'linear',
                                display: true,
                                position: 'left',
                            },
                            y1: {
                                type: 'linear',
                                display: true,
                                position: 'right',

                                grid: {
                                    drawOnChartArea: false,
                                },
                            },
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default Dashboard