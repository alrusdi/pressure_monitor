"use strict";

const buildChart = (targetCanvasId) => {
    var target = document.getElementById(targetCanvasId);
    console.log(target)
    if (!target) {
        console.log("Target element for chart not found ", targetCanvasId);
        return;
    }

    var data = JSON.parse(document.getElementById(targetCanvasId+'_data').innerText);

    var ctx = target.getContext('2d');

    var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStroke1.addColorStop(0, 'rgba(255, 255, 0, 0.5)');
    gradientStroke1.addColorStop(1, 'rgba(233, 30, 99, 0.0)');

    var gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStroke2.addColorStop(0, '#ffff00');
    gradientStroke2.addColorStop(1, '#e91e63');


    var gradientStroke3 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStroke3.addColorStop(0, 'rgba(0, 114, 255, 0.5)');
    gradientStroke3.addColorStop(1, 'rgba(0, 200, 255, 0.0)');

    var gradientStroke4 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStroke4.addColorStop(0, '#0072ff');
    gradientStroke4.addColorStop(1, '#00c8ff');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.days,
            datasets: [{
                label: 'android',
                data: data.count_android,
                backgroundColor: gradientStroke1,
                borderColor: gradientStroke2,
                pointRadius: "0",
                pointHoverRadius: "0",
                borderWidth: 3
            }, {
                label: 'apple',
                data: data.count_apple,
                backgroundColor: gradientStroke3,
                borderColor: gradientStroke4,
                pointRadius: "0",
                pointHoverRadius: "0",
                borderWidth: 3
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: true,
                labels: {
                    fontColor: '#585757',
                    boxWidth: 40
                }
            },
            tooltips: {
                enabled: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#585757'
                    },
                    gridLines: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.07)"
                    },
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#585757'
                    },
                    gridLines: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.07)"
                    },
                }]
            }
        }
    });
};


jQuery(function () {
    console.log("Here!");
    buildChart('chart1');
    buildChart('chart2');
    buildChart('chart3');
});