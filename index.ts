import { parse } from "https://deno.land/std@0.61.0/flags/mod.ts";
import AsciiTable from "https://deno.land/x/ascii_table/mod.ts";

// const args = parse(Deno.args);

const appId = 63343358;
const appSecret = "8C50UlKi";

const res = await fetch(
  `https://tianqiapi.com/api?version=v1&appid=${appId}&appsecret=${appSecret}`
);

const data = await res.json();

interface forecastItem {
  day: string;
  wea: string;
  tem: string;
  air_level: string;
}
const forecast = data.data.map((item: forecastItem) => [
  item.day, // 日期
  item.wea, // 天气
  item.tem, // 实时温度
  item.air_level || "", // 空气质量等级
]);

const table = AsciiTable.fromJSON({
  title: `${data.city} 7日天气预报`,
  heading: ["日期", "天气", "温度", "空气质量"],
  rows: forecast,
});

console.log(table.toString());

Deno.exit()