import { Component, Injectable, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ChartStatistics } from 'src/app/shared/widget/chart-statistics/chart-statistics.model';
import { StatisticsCard1 } from 'src/app/shared/widget/statistics-card/statistics-card.model';
import { ChartOptions } from '../../charts/apex/apex-chart.model';
import { RevenueHistory, UserBalance } from './dashboard-one.model';
import { REVENUEHISTORYDATA, USERBALANCEDATA } from './data';
import {  ServiceService } from '../../../apps/Service/service.service';
import { ApexAxisChartSeries } from 'ng-apexcharts';

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly month_list = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  readonly DELIMITER = " ";


  

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[1], 10),
        month: this.month_list.indexOf(date[0]),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? this.month_list[date.month - 1] + this.DELIMITER + date.day + ',' + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-dashboard-one',
  templateUrl: './dashboard-one.component.html',
  styleUrls: ['./dashboard-one.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})

export class DashboardOneComponent implements OnInit {

  statisticsCardData: StatisticsCard1[] = [];
  chartStatisticsData: ChartStatistics[] = [];
  revenuChart!: Partial<ChartOptions>;
  salesAnalyticsChart!: Partial<ChartOptions>;
  userBalanceData: UserBalance[] = [];
  revenueHistoryData: RevenueHistory[] = [];
  datos: any;
  labels: any;
  columns: any;

  date!: NgbDateStruct;

  constructor (private calendar: NgbCalendar,
               private service: ServiceService,) { }

  ngOnInit(): void {
    this.date = this.calendar.getToday();
    this._fetchStatisticsData();
    this.initChart();
    this._fetchUserBalanceData();
    this._fetchRevenueHistoryData();

    
  }

  /**
   * fetch statistics data
   */
  _fetchStatisticsData(): void {

    this.statisticsCardData = [
      {
        id: 1,
        variant: 'primary',
        description: "Total Revenue",
        icon: 'fe-heart',
        stats: 58967,
        options: {
          prefix: '$',
          duration: 2
        }
      },
      {
        id: 2,
        variant: 'success',
        description: "Today's Sales",
        icon: 'fe-shopping-cart',
        stats: 127,
        options: {
          duration: 2
        }
      },
      {
        id: 3,
        variant: 'info',
        description: "Conversion",
        icon: 'fe-bar-chart-line',
        stats: 0.58,
        options: {
          decimalPlaces: 2,
          duration: 2,
          suffix: '%'
        }
      },
      {
        id: 4,
        variant: 'warning',
        description: "Today's Visits",
        icon: 'fe-eye',
        stats: 78.41,
        options: {
          decimalPlaces: 2,
          duration: 2,
          suffix: 'k'
        }
      }

    ]
  }

  /**
   * initialize charts
   */
  initChart(): void {
    this.service.getGrafica().subscribe((response: any) => {
      const datos = response.data;
      
      // Extract unique labels
      const uniqueLabels = [...new Set(datos
        .filter((item: { labels?: string }) => item.labels !== undefined && item.labels !== '')
        .map((item: { labels: string }) => item.labels))];
      
      // Extract unique centro names
      const uniqueCentros = [...new Set(datos.map((item: { name?: string }) => item.name))];
      
      // Initialize the series array
      const series: ApexAxisChartSeries = (uniqueCentros as string[]).map(name => {
        const data = datos
          .filter((item: { name?: string }) => item.name === name)
          .map((item: { data: number }) => item.data);
        return {
          name: name,
          type: 'column',
          data: data
        };
      });
      
      console.log(series);

      // this.columns = series;
      // this.labels = uniqueLabels;

      this.salesAnalyticsChart = {
      
        series: series,
        visibleSeries: [0],
        chart: {
          height: 378,
          type: 'line',
          offsetY: 10,
          toolbar: {
            show: false,
          }
        },
        stroke: {
          width: [2, 3],
        },
        plotOptions: {
          bar: {
            columnWidth: '50%',
          },
        },
        colors: ['#1abc9c', '#4a81d4', '#d49d4a', '#4ad49d', '#d44ac6', '#4ad49d'],
        dataLabels: {
          enabled: false,
          enabledOnSeries: [1],
        },
        labels: uniqueLabels as string[],
        xaxis: {
          type: 'category',
        },
        legend: {
          offsetY: 7,
        },
        grid: {
          padding: {
            bottom: 20,
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.75,
            opacityTo: 0.75,
            stops: [0, 0, 0],
          },
        },
        yaxis: [
          {
            title: {
              text: 'Residentes con la enfermedad',
            },
          },
        ],
      }
    });
    
    this._fetchChartStatistics();
    this.revenuChart = {
      series: [68],
      chart: {
        height: 242,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '65%',
          }
        },
      },
      colors: ['#f86262'],
      labels: ['Revenue'],

    };

    
  }

  /**
   * fetches chart statistics
   */
  _fetchChartStatistics(): void {
    this.chartStatisticsData = [{
      title: 'Target',
      stats: '$7.8k',
      icon: 'fe-arrow-down',
      variant: 'danger'
    },
    {
      title: 'Last week',
      stats: '$1.4k',
      icon: 'fe-arrow-up',
      variant: 'success'
    },
    {
      title: 'Last Month',
      stats: '$15k',
      icon: 'fe-arrow-down',
      variant: 'danger'
    }
    ];
  }

  /**
   * fetch users balance data
   */
  _fetchUserBalanceData(): void {
    this.userBalanceData = USERBALANCEDATA;
  }

  _fetchRevenueHistoryData(): void {
    this.revenueHistoryData = REVENUEHISTORYDATA;
  }



}
