import { DEFAULT_OPTIONS } from "@/constants/chart/default-chart-options.constants"
import * as Highcharts from "highcharts"
import { HighchartsReact } from "highcharts-react-official"

type DefaultPieChartProps = {
  series: Highcharts.SeriesOptionsType[]
}

export default function DefaultPieChart({ series }: DefaultPieChartProps) {
  const options: Highcharts.Options = {
    ...DEFAULT_OPTIONS,
    title: {
      text: "",
    },
    plotOptions: {
      pie: {
        innerSize: "40%",
        size: 250,
      },
    },
    series,
  }
  return (
    <div className="default-pie-chart">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}
