import "dotenv/config";
import { DataFetcher } from "./services/DataFetcher";
import { Statistics } from "./services/Statistics";

const shouldFetch = process.argv.includes("--fetch");

if (shouldFetch) {
  await DataFetcher.fetchAllAndStore();
} else {
  console.log("ℹ️ Skipping data fetching");
}

const { top, bottom, all } = new Statistics();

console.log("⬆️ Top five ports with the most port calls");
if (top.length) {
  console.table(top);
} else {
  console.log("❌ There are no data available!");
}

console.log("⬇️ Bottom five ports with the fewest port calls");
if (bottom.length) {
  console.table(bottom);
} else {
  console.log("❌ There are no data available!");
}

console.log("🏗️ Port calls");
if (all.length) {
  console.table(all);
} else {
  console.log("❌ There are no data available!");
}
