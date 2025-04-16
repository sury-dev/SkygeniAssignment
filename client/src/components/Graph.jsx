import React, { useEffect, useRef } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import * as d3 from 'd3';

function Graph({ isAcv = false, maxValue = 0, data = [] }) {
    const svgRef = useRef();

    useEffect(() => {
        if (!data || data.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        // const width = svg.attr("width") - 200;
        const width = svgRef.current.getBoundingClientRect().width - 200;
        const barHeight = 30;
        const barSpacing = 30;
        const leftLabelWidth = 80;

        svg.attr("height", (data.length - 1) * (barHeight + barSpacing));

        for (let i = 0; i < data.length - 1; i++) {
            const d = data[i];
            const y = i * (barHeight + barSpacing);
            const value = isAcv ? d.acv : d.count;

            const g = svg.append("g").attr("transform", `translate(${leftLabelWidth}, ${y})`);

            // Full bar
            g.append("rect")
                .attr("width", width)
                .attr("height", barHeight)
                .attr("fill", "#ccc");

            // Green bar
            g.append("rect")
                .attr("width", value / maxValue * width)
                .attr("height", barHeight)
                .attr("fill", "green")
                .attr('x', (width - (value / maxValue * width)) / 2);

            // Value label
            g.append("text")
                .attr("x", width / 2)
                .attr("y", barHeight / 2 + 12)
                .attr("text-anchor", "middle")
                .text(`${isAcv ? '$' : ''}${value}`);

            if (i !== 0) {
                g.append("text")
                    .attr("x", width / 2)
                    .attr("y", (barHeight * -1) / 2 + 12)
                    .attr("text-anchor", "middle")
                    .attr("fill", "#000")
                    .text(`${d.stagePercent}%`);
            }

            svg.append("text")
                .attr("x", 0)
                .attr("y", y + barHeight / 2)
                .attr("class", "label")
                .text(d.label);

            svg.append("text")
                .attr("x", width + leftLabelWidth + 10)
                .attr("y", y + barHeight / 2)
                .attr("class", "label")
                .text(`${d.winPercent}%`);
        }
    }, [data, maxValue, isAcv]);

    return (
        <Card sx={{width: '40vw' , m: 2 , border:'1px solid #ccc'}}>
            <CardContent>
                <h3>{isAcv ? 'ACV Data' : 'Count Data'}</h3>
                <svg style={{'width' : '100%'}} ref={svgRef}></svg>
            </CardContent>
        </Card>
    )
}

export default Graph;
