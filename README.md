## Requirements
* node v18 (required to use the node's fetch API)
* yarn v1

## Running the program from a terminal
1. Install node dependencies by running `yarn`
2. Set `API_URL` in `.env` file
3. Run `yarn start` in terminal 
    * pass `--fetch` parameter to fetch and cache data locally
4. See the following statistics in the terminal
    * ⬆️ Top five ports with the most port calls
    * ⬇️ Bottom five ports with the fewest port calls
    * 🏗️ Port calls by Port and the P5, P20, P50, P75 and P90 percentiles of Port call durations