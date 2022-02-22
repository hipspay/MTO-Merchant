import React from 'react';
import ReactHighcharts from 'react-highcharts';

const LineChart = () => {
    const config = {
        title: {
            text: '',
        },
        yAxis: {
            title: {
                text: '',
            },
            gridLineWidth: 1,
        },
        xAxis: {
            accessibility: {
                rangeDescription: 'Range: 2010 to 2017',
            },
            gridLineWidth: 0,
        },
        legend: {
            enabled: false,
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false,
                },
                pointStart: 2010,
            },
        },
        credits: {
            enabled: false,
        },
        series: [
            {
                type: 'line',
                smooth: true,
                data: [439, 525, 571, 696, 970, 1199, 1371, 1541],
            },
        ],
    };

    return (
        <div className="chart-container">
            <ReactHighcharts config={config} />
        </div>
    );
};

export default LineChart;
