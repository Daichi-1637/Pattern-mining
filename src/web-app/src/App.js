import React, { Component } from 'react';
import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import axiois from "axios"

am4core.useTheme(am4themes_animated);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      corr: 0.0,
      data0: [],
      data1: [],
      url: "http://localhost:8000/A/A",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = async () => {
    let chart0 = am4core.create('chartdiv0', am4charts.XYChart);
    let chart1 = am4core.create('chartdiv1', am4charts.XYChart);
    let chart2 = am4core.create('chartdiv2', am4charts.GaugeChart);

    chart0.paddingRight = 20;
    chart1.paddingRight = 20;
    chart2.innerRadius = am4core.percent(82);

    await axiois
      .get(this.state.url)
      .then((results) => {
        this.setState({corr: results.data.corr})
        this.state.data0 = results.data.data0
        this.state.data1 = results.data.data1
      })
      .catch(() => {
        console.log("error : Can't get data from api server !")
      })

      var axis = chart2.xAxes.push(new am4charts.ValueAxis());
      axis.min = 0.0;
      axis.max = 1.0;
      axis.strictMinMax = true;
      axis.renderer.radius = am4core.percent(90);
      axis.renderer.inside = false;
      axis.renderer.line.strokeOpacity = 1;
      axis.renderer.ticks.template.strokeOpacity = 1;
      axis.renderer.ticks.template.length = 0.1;
      
      /**
       * Axis for ranges
       */
      
      var colorSet = new am4core.ColorSet();
      
      var axis2 = chart2.xAxes.push(new am4charts.ValueAxis());
      axis2.min = 0;
      axis2.max = 100;
      axis2.renderer.innerRadius = 10
      axis2.strictMinMax = true;
      axis2.renderer.labels.template.disabled = true;
      axis2.renderer.ticks.template.disabled = true;
      axis2.renderer.grid.template.disabled = true;
      
      var range0 = axis2.axisRanges.create();
      range0.value = 0;
      range0.endValue = 50;
      range0.axisFill.fillOpacity = 1;
      range0.axisFill.fill = colorSet.getIndex(0);
      
      var range1 = axis2.axisRanges.create();
      range1.value = 50;
      range1.endValue = 100;
      range1.axisFill.fillOpacity = 1;
      range1.axisFill.fill = colorSet.getIndex(2);
      
      /**
       * Hand
       */
      
      var hand = chart2.hands.push(new am4charts.ClockHand());
      hand.axis = axis2;
      hand.innerRadius = am4core.percent(20);
      hand.startWidth = 10;
      hand.pin.disabled = true;
      hand.value = 50;
      
      hand.events.on("propertychanged", function(ev) {
        range0.endValue = ev.target.value;
        range1.value = ev.target.value;
        axis2.invalidate();
      });
      
      setInterval(() => {
        var value = Math.abs(this.state.corr) * 100;
        new am4core.Animation(hand, {
          property: "value",
          to: value
        }, 1000, am4core.ease.cubicOut).start();
      }, 2000);

    // 一つ目のグラフ
    chart0.data = this.state.data0;

    let valueAxisX = chart0.xAxes.push(new am4charts.ValueAxis());
    valueAxisX.renderer.grid.template.location = 0;
    valueAxisX.renderer.minGridDistance = 60;
    valueAxisX.title.text = "時間[s]"

    let valueAxisY = chart0.yAxes.push(new am4charts.ValueAxis());
    valueAxisY.tooltip.disabled = false;
    valueAxisY.renderer.minWidth = 35;
    valueAxisY.title.text = "振幅"

    let series = chart0.series.push(new am4charts.LineSeries());
    series.dataFields.valueX = "data";
    series.dataFields.valueY = "value";

    series.name = "name";
    series.tooltipText = "{name}: [bold]{valueY}";
    chart0.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart0.scrollbarX = scrollbarX;

    chart0.scrollbarY = new am4core.Scrollbar();

    this.chart0 = chart0;

    //二つ目のグラフ
    chart1.data = this.state.data1;

    let valueAxisX1 = chart1.xAxes.push(new am4charts.ValueAxis());
    valueAxisX1.renderer.grid.template.location = 0;
    valueAxisX1.renderer.minGridDistance = 60;
    valueAxisX1.title.text = "時間[s]"

    let valueAxisY1 = chart1.yAxes.push(new am4charts.ValueAxis());
    valueAxisY1.tooltip.disabled = false;
    valueAxisY1.renderer.minWidth = 35;
    valueAxisY1.title.text = "振幅"

    let series1 = chart1.series.push(new am4charts.LineSeries());
    series1.dataFields.valueX = "data";
    series1.dataFields.valueY = "value";

    series1.name = "name";
    series1.tooltipText = "{name}: [bold]{valueY}";
    chart1.cursor = new am4charts.XYCursor();

    let scrollbarX1 = new am4charts.XYChartScrollbar();
    scrollbarX1.series.push(series1);
    chart1.scrollbarX = scrollbarX1;

    chart1.scrollbarY = new am4core.Scrollbar();

    this.chart1 = chart1;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  handleSubmit = async (event, form) => {
    let bar = this.state.url.match(/http?:\/\/localhost?:8000\/(\w)\/(\w)/)
    console.log(bar)
    console.log(bar)
    if (form === 0) {
      this.state.url = "http://localhost:8000/" + event.target.value + "/" + bar[2]
    } else if (form === 1) {
      this.state.url = "http://localhost:8000/" + bar[1] + "/" + event.target.value
    }

    console.log(this.state.url)

    // console.log(url)
    await axiois
      .get(this.state.url)
      .then((results) => {
        this.setState({corr: results.data.corr})
        this.state.data0 = results.data.data0
        this.state.data1 = results.data.data1
      })
      .catch(() => {
        console.log("error : Can't get data from api server !")
      })

    this.chart0.data = this.state.data0
    this.chart1.data = this.state.data1
    console.log(this.state.corr)
  }

  render() {
    return (
      <table style={{ width: "100%" }}>
        <tr style={{ width: "100%", height: "50px", backgroundColor: "#00fa9a" }}>
          <td colSpan="2">
            <text style={{ color: "white", fontWeight: 'bold' }}>　[実験] パタンマイニングによる50音の音の相関関係の調査</text>
          </td>
        </tr>
        <tr style={{width: "100%", height: "20px"}}/>
        <tr style={{ width: "100%" }}>
          <td colSpan="2" align='center'>
            <text style={{fontSize: "20px"}}>相関係数: {this.state.corr}</text>
          </td>
        </tr>
        <tr style={{ width: "100%" }}>
          <td colSpan="2" align='center'>
            {/*<text style={{fontSize: "50px"}}>相関係数: {this.state.corr}</text>*/}
            <div id='chartdiv2' style={{ width: "80%" }} />
          </td>
        </tr>
        <tr>
          <td align='center' style={{ width: "20%", height: "500px", }}>
            <select name="voices" form="data0" style={{ width: "80%" }} onChange={(e) => { this.handleSubmit(e, 0) }}>
              <option value="A">「あ」の音</option>
              <option value="I">「い」の音</option>
              <option value="U">「う」の音</option>
              <option value="E">「え」の音</option>
              <option value="O">「お」の音</option>
            </select>
          </td>
          <td id='chartdiv0' style={{ width: "80%", height: "500px" }} />
        </tr>
        <tr>
          <td align='center' style={{ width: "20%", height: "500px", }}>
            <select name="voices" form="data1" style={{ width: "80%" }} onChange={(e) => { this.handleSubmit(e, 1) }}>
              <option value="A">「あ」の音</option>
              <option value="I">「い」の音</option>
              <option value="U">「う」の音</option>
              <option value="E">「え」の音</option>
              <option value="O">「お」の音</option>
            </select>
          </td>
          <td id='chartdiv1' style={{ width: "80%", height: "500px" }} />
        </tr>
      </table>
    );
  }
}

export default App;