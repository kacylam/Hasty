import React, { useEffect, useMemo, useState } from 'react';
import toastr from 'toastr';
import { Card } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import siteReferenceService from '../../services/siteReferenceService';
import './siteref.css';

function SiteReferenceChart() {
  const [summaryData, setSummaryData] = useState([]);

  const chartColors = ['#2E1A47', '#5C2563', '#FF9126', '#fa5c7c', '#ffbc00', '#39afd1'];

  useEffect(() => {
    siteReferenceService.getSummary().then(onSummarySuccess).catch(onSummaryError);
  }, []);

  const onSummarySuccess = (data) => {
    setSummaryData((prevState) => {
      let newData = { ...prevState };
      newData = data.items;
      return newData;
    });
  };

  const seriesData = summaryData.map((sum) => sum.totalCount);

  const chartData = useMemo(
    () => ({
      options: {
        chart: {
          height: 320,
          type: 'pie',
        },
        labels: summaryData?.map((sum) => sum.referenceType.name),
        colors: chartColors,
        legend: {
          show: true,
          position: 'bottom',
          horizontalAlign: 'left',
          verticalAlign: 'middle',
          floating: true,
          fontSize: '14px',
          offsetX: 0,
          offsetY: 77,
        },
        responsive: [
          {
            breakpoint: 600,
            options: {
              chart: {
                height: 240,
              },
              legend: {
                show: false,
              },
            },
          },
        ],
      },
      series: seriesData,
    }),
    [seriesData]
  );

  const onSummaryError = () => {
    toastr.error('Failed to connect. Cannot display chart.');
  };

  return (
    <Card className="height-pie">
      <Card.Body>
        <h4 className="header-title mb-3">Site References</h4>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="donut"
          height={320}
          className="apex-charts"
        />
      </Card.Body>
    </Card>
  );
}

export default SiteReferenceChart;
