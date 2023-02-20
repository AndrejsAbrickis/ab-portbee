## Requirements
* node v18 (required to use the node's fetch API)
* yarn v1

## Running the program from a terminal
1. Install node dependencies by running `yarn`
2. Set `API_URL` in `.env` file. You can execute the following script in the terminal by replacing the `{API_DOMAIN}` with real API domain URL
    ```bash
    echo API_URL={API_DOMAIN}/api/v2 > .env 
    ```
3. Run `yarn start` in terminal 
    * pass `--fetch` parameter to fetch and cache data locally
4. See the following statistics in the terminal
    * ⬆️ Top five ports with the most port calls
    * ⬇️ Bottom five ports with the fewest port calls
    * 🏗️ Port calls by Port and the P5, P20, P50, P75 and P90 percentiles of Port call durations

## Example of program's CLI output
![](https://github.com/AndrejsAbrickis/ab-portbee/blob/main/.github/assets/Screenshot%202023-02-19%20at%2012.00.47.png?raw=true)
