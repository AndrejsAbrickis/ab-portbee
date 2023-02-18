import "dotenv/config";
import { DataFetcher } from "./services/DataFetcher";
import { Statistics } from "./services/Statistics";

const shouldFetch = process.argv.includes("--fetch");

if (shouldFetch) {
  await DataFetcher.fetchAllAndStore();
} else {
  console.log("Skipping data fetching");
}

const { top, bottom, all } = new Statistics();

console.log("⬆️ Top five ports with the most port calls");
console.table(top);
console.log("⬇️ Top five ports with the fewest port calls");
console.table(bottom);
console.log("🏗️ Port calls");
console.table(all);
