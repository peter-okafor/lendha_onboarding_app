import { globalStyles } from '@/theme/styles';
import { Props as ReactApexProps } from 'react-apexcharts';

export const LAYOUT_PADDING = '15px';
export const MAX_SCREEN_WIDTH = '1300px';
export const CHART_OPTIONS: ReactApexProps = {
  series: [
    {
      name: 'Money Inflow',
      data: [44, 55, 57, 56, 61, 58, 63, 57, 56, 61, 58, 63]
    },
    {
      name: 'Money Outflow',
      data: [76, 85, 101, 98, 87, 54, 94, 85, 101, 98, 87, 54]
    }
  ],
  options: {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '85%',
        borderRadius: 10
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent']
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    },
    yaxis: {
      title: {
        text: ''
      }
    },
    fill: {
      opacity: 1,
      colors: [globalStyles.colors.darkblue.DEFAULT, globalStyles.colors.yellow.DEFAULT]
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return '&#8358;' + val;
        }
      }
    }
  }
};

export const RADIAL_OPTIONS = {
  chart: {
    height: 280,
    type: 'radialBar'
  },
  series: [67],
  colors: ['#20E647'],
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      track: {
        background: '#333',
        startAngle: -135,
        endAngle: 135
      },
      dataLabels: {
        name: {
          show: false
        },
        value: {
          fontSize: '30px',
          show: true
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      gradientToColors: ['#87D4F9'],
      stops: [0, 100]
    }
  },
  stroke: {
    lineCap: 'butt'
  },
  labels: ['Progress']
};

export const REG_NUMBER_REGEX = /^(BN|RC)\d{7}$/;

export const BANK_NAME = 'Providus Bank';
export const ACCOUNT_NUMBER = '0291983021';
export const ACCOUNT_NAME = 'Lendha Limited';
