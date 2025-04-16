import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import * as d3 from 'd3';
// import './Graph.css'

function Graph({ isAcv = false, maxValue = 0, dat = [] }) {

    maxValue = 910147;
    isAcv = true;

    const data = [
        {
            "label": "Suspect",
            "acv": 910147,
            "lost": 237000,
            "qualified": 673147,
            "winPercent": 4,
            "stagePercent": "-"
        },
        {
            "label": "Qualify",
            "acv": 673147,
            "lost": 359407,
            "qualified": 313740,
            "winPercent": 5,
            "stagePercent": 74
        },
        {
            "label": "Demo",
            "acv": 313740,
            "lost": 176922,
            "qualified": 136818,
            "winPercent": 10,
            "stagePercent": 47
        },
        {
            "label": "Proposal",
            "acv": 136818,
            "lost": 104714,
            "qualified": 32104,
            "winPercent": 23,
            "stagePercent": 44
        },
        {
            "label": "Negotiate",
            "acv": 32104,
            "lost": 0,
            "qualified": 32104,
            "winPercent": 100,
            "stagePercent": 23
        },
        {
            "label": "Won",
            "acv": 32104,
            "lost": "-",
            "qualified": "-",
            "winPercent": 100,
            "stagePercent": 100
        }
    ];

    useEffect(() => {
        const svg = d3.select("#count");
        const width = svg.attr("width") - 200;
        console.log(width);
        const barHeight = 30;
        const barSpacing = 30;
        const leftLabelWidth = 80;

        svg.attr("height", data.length * (barHeight + barSpacing));

        data.forEach((d, i) => {
            const y = i * (barHeight + barSpacing);

            // Group
            const g = svg.append("g").attr("transform", `translate(${leftLabelWidth}, ${y})`);

            const value = isAcv ? d.acv : d.count; // Use acv if isAcv is true

            // Full bar (grey)
            g.append("rect")
                .attr("width", width)
                .attr("height", barHeight)
                .attr("fill", "#ccc");

            // Green part
            g.append("rect")
                .attr("width", value / 910147 * width) // Scale to fit the bar width
                .attr("height", barHeight)
                .attr("fill", "green")
                .attr('x', (width - (value / 910147 * width)) / 2);

            // Value in center
            g.append("text")
                .attr("x", width / 2)
                .attr("y", barHeight / 2 + 12)
                .attr("text-anchor", "middle")
                .text(`${!isAcv ? '$' : ''}${value}`);

            // % label inside bar
            if (i != 0) {
                g.append("text")
                    .attr("x", width / 2)
                    .attr("y", (barHeight * -1) / 2 + 12)
                    .attr("text-anchor", "middle")
                    .attr("fill", "#000")
                    .text(`${d.stagePercent}%`);
            }

            // Left stage label
            svg.append("text")
                .attr("x", 0)
                .attr("y", y + barHeight / 2)
                .attr("class", "label")
                .text(d.label);

            // Right-side %
            svg.append("text")
                .attr("x", width + leftLabelWidth + 10)
                .attr("y", y + barHeight / 2)
                .attr("class", "label")
                .text(`${d.winPercent}%`);
        });
    }, []);

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <svg width="800" id='count'></svg>
            </CardContent>
        </Card>
    )
}

export default Graph
