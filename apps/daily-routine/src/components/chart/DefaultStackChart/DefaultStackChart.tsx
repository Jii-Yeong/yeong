import { DEFAULT_OPTIONS } from "@/constants/chart/default-chart-options.constants"
import Highcharts, { SeriesOptionsType, XAxisOptions } from "highcharts"
import { HighchartsReact } from "highcharts-react-official"

type DefaultStackChartProps = {
  series: SeriesOptionsType[]
  xAxis: XAxisOptions
}

export default function DefaultStackChart({
  series,
  xAxis,
}: DefaultStackChartProps) {
  const options = {
    ...DEFAULT_OPTIONS,
    plotOptions: {
      column: {
        stacking: "normal",
      },
    },
    series,
    xAxis,
  }
  return <HighchartsReact highcharts={Highcharts} options={options} />
}
