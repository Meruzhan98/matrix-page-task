import {Component, Inject, InjectionToken, NgZone, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Matrix-task';


  private chart1: am4charts.XYChart | undefined;
  private chart2: am4charts.PieChart | undefined;
  private chart3: am4maps.MapChart | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: InjectionToken<Object>, private zone: NgZone) {
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart1 = am4core.create("chart1div", am4charts.XYChart);
      let chart2 = am4core.create("chart2div", am4charts.PieChart);

      chart1.paddingRight = 20;

      let data1 = [];
      let visits = 10;
      for (let i = 1; i < 366; i++) {
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        data1.push({date: new Date(2018, 0, i), name: "name" + i, value: visits});
      }

      chart1.data = data1;

      let dateAxis = chart1.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart1.yAxes.push(new am4charts.ValueAxis());
      if (valueAxis && valueAxis.tooltip) {
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;
      }


      let series = chart1.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      series.tooltipText = "{valueY.value}";

      chart1.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart1.scrollbarX = scrollbarX;

      chart1.stroke = am4core.color("grey");

      chart2.stroke = am4core.color("grey");
      this.chart1 = chart1;

      // Add data
      let data2 = [{
        "country": "Lithuania",
        "litres": 501.9
      }, {
        "country": "Czech Republic",
        "litres": 301.9
      }, {
        "country": "Ireland",
        "litres": 201.1
      }, {
        "country": "Germany",
        "litres": 165.8
      }, {
        "country": "Australia",
        "litres": 139.9
      }, {
        "country": "Austria",
        "litres": 128.3
      }, {
        "country": "UK",
        "litres": 99,
        "hidden": true
      }, {
        "country": "Belgium",
        "litres": 60,
        "hidden": true
      }, {
        "country": "The Netherlands",
        "litres": 50,
        "hidden": true
      }];


      // Add and configure Series
      let pieSeries = chart2.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "litres";
      pieSeries.dataFields.category = "country";
      pieSeries.dataFields.hidden = "hidden";

// Let's cut a hole in our Pie chart the size of 40% the radius
      chart2.innerRadius = am4core.percent(40);

// Disable ticks and labels
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;

// Disable tooltips
      pieSeries.slices.template.tooltipText = "";

// Add a legend
      chart2.legend = new am4charts.Legend();
      chart2.legend.position = "right";
      this.chart2 = chart2;
      this.chart2.data = data2;


      let chart3 = am4core.create("chart3div", am4maps.MapChart);

// Set map definition
      chart3.geodata = am4geodata_worldLow;

// Set projection
      chart3.projection = new am4maps.projections.Miller();

// Create map polygon series
      let polygonSeries = chart3.series.push(new am4maps.MapPolygonSeries());

// Make map load polygon (like country names) data from GeoJSON
      polygonSeries.useGeodata = true;

// Configure series
      let polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.fill = am4core.color("#74B266");

// Create hover state and set alternative fill color
      let hs = polygonTemplate.states.create("hover");
      hs.properties.fill = am4core.color("#367B25");

// Remove Antarctica
      polygonSeries.exclude = ["AQ"];

// Add some data
      polygonSeries.data = [{
        "id": "US",
        "name": "United States",
        "value": 100,
        "fill": am4core.color("#F05C5C")
      }, {
        "id": "FR",
        "name": "France",
        "value": 50,
        "fill": am4core.color("#5C5CFF")
      }];

// Bind "fill" property to "fill" key in data
      polygonTemplate.propertyFields.fill = "fill";
      this.chart3 = chart3;
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart1) {
        this.chart1.dispose();
      }
      if (this.chart2) {
        this.chart2.dispose();
      }
      if (this.chart3) {
        this.chart3.dispose();
      }
    });
  }


}

