import React, { useEffect } from 'react';
import Highcharts from 'highcharts';

export default function Charts() {
    useEffect(() => {
        // Create the Highcharts configuration object for the bar chart
        const barChartOptions = {
            chart: {
                type: 'column',
                backgroundColor: 'transparent',
            },
            title: {
                text: 'Bar Chart',
                style: {
                    color: '#ffffff', // Set the text color to white
                },
            },
            xAxis: {
                labels: {
                    style: {
                        color: '#ffffff', // Set the text color to white
                    },
                },
            },
            yAxis: {
                labels: {
                    style: {
                        color: '#ffffff', // Set the text color to white
                    },
                },
            },
            // Add additional configuration options for the bar chart
            series: [
                {
                    name: 'Data Series',
                    data: [1, 2, 3, 4, 5],
                },
            ],
        };

        // Render the bar chart
        Highcharts.chart('barContainer', barChartOptions);

        // Create the Highcharts configuration object for the pie chart
        const pieChartOptions = {
            chart: {
                type: 'pie',
                backgroundColor: 'transparent',
            },
            title: {
                text: 'Pie Chart',
                style: {
                    color: '#ffffff', // Set the text color to white
                },
            },
            // Add additional configuration options for the pie chart
            series: [
                {
                    name: 'Data Series',
                    data: [
                        { name: 'Category 1', y: 20 },
                        { name: 'Category 2', y: 30 },
                        { name: 'Category 3', y: 50 },
                    ],
                },
            ],
        };

        // Render the pie chart
        Highcharts.chart('pieContainer', pieChartOptions);
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            <div id="barContainer" style={{ width: '50%', height: '400px', borderRadius: '5px' }}></div>
            <div id="pieContainer" style={{ width: '50%', height: '400px', borderRadius: '5px' }}></div>
        </div>
    );
}
