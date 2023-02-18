import "dotenv/config";
import { DataFetcher } from "./services/DataFetcher";

const shouldFetch = process.argv.includes("--fetch");

if (shouldFetch) {
  await DataFetcher.fetchAllAndStore();
} else {
  console.log("Skipping data fetching");
}
