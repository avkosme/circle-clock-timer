'use strict';
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

let appElement = document.getElementById('circle-clock-timer');

class Circle extends React.Component {
    constructor(params) {
        super(params);
        this.percent = 0;
        this.timeLeft = 25200;
        this.state = {
            endPercent: 0,
            curPerc: 0,
            timeLeft: 0,
        };
        this.tick = this.tick.bind(this);
    }

    tick() {

        if (this.timeLeft != 0) {
            this.percent = this.percent + 0.002380952;
            this.timeLeft = this.timeLeft - 60;
            this.setState({
                endPercent: this.percent,
                timeLeft: this.timeLeft,
            })

        }

        let canvas = this.refs.canvas;
        let context = canvas.getContext('2d');
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        let radius = 50;
        let endPercent = this.state.endPercent;
        let curPerc = this.state.endPercent - 2;
        let counterClockwise = false;
        let circ = Math.PI * 2;
        let quart = Math.PI / 2;

        let gradient = context.createLinearGradient(0, 0, 170, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");


        context.strokeStyle = gradient;
        context.lineWidth = 5;
        context.strokeRect(20, 20, 150, 100);

        context.lineWidth = 3;
        // context.strokeStyle = '#ad2323';
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 3;
        context.shadowColor = '#656565';

        function animate(current) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.arc(x, y, radius, -(quart), ((circ) * current) - quart, false);
            context.stroke();
            curPerc++;
            if (curPerc < endPercent) {
                requestAnimationFrame(function () {
                    animate(curPerc)
                });
            }
        }

        animate();
    }

    componentDidMount() {
        setInterval(this.tick, 1000);
    }

    getTimeLeft() {

        let date = new Date(null);
        date.setSeconds(this.state.timeLeft);
        return date.toISOString().substr(11, 5);
    }

    render() {
        const style = {
            width: 500,
            height: 250,
            margin: 50,
        };
        return (
            <div>
                <canvas
                    id="myCanvas"
                    style={style}
                    ref="canvas"
                />
                <div className="timer">{this.getTimeLeft()}</div>
            </div>
        );
    }
}

ReactDOM.render(<Circle/>, appElement);