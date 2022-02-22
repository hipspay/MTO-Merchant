import React from 'react';
import ReactHighcharts from 'react-highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
if (typeof ReactHighcharts === 'object') {
    highcharts3d(ReactHighcharts);
}

const BarChart = () => {
    const data = [
        {
            name: 'Products',
            y: 25,
            color: '#408fb2',
        },
        {
            name: 'Orders',
            y: 148,
            color: '#f5a94b',
        },
        {
            name: 'Sale MTO',
            y: 345,
            color: '#be675b',
        },
        {
            name: 'Disputes',
            y: 6,
            color: '#4f697d',
        },
    ];

    const config = {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 0,
                beta: 0,
                depth: 50,
                viewDistance: 15,
                fitToPlot: true,
            },
        },
        yAxis: {
            gridLineWidth: 0,
            title: '',
        },
        legend: {
            enabled: false,
        },
        tooltip: {
            enabled: false,
        },
        credits: {
            enabled: false,
        },
        title: {
            text: '',
        },
        plotOptions: {
            column: {
                depth: 150,
            },
        },
        xAxis: {
            type: 'category',
            labels: {
                useHTML: true,
                animate: true,
                formatter: function () {
                    let value = this.value;
                    let color = '';
                    data.map((item) => {
                        if (item.name === this.value) {
                            color = item.color;
                        }
                    });
                    return `<span style="color: ${color}">${this.value}</span>`;
                },
            },
        },
        series: [
            {
                id: 'main',
                dataSorting: {
                    enabled: true,
                    matchByName: true,
                },
                dataLabels: [
                    {
                        enabled: true,
                        style: {
                            fontSize: '16px',
                        },
                    },
                ],
                data,
            },
        ],
    };

    return (
        <div className="chart-container">
            <ReactHighcharts config={config} />
        </div>
    );
};

export default BarChart;
