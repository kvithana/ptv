## PTV Public Transport App

This demo Next.js application provides a user-friendly interface to access real-time and scheduled information about public transport in Melbourne, Victoria. This repository should be used for learning purposes only.

### Getting Started

1. **Clone the repository:**

   ```bash
   git clone git@github.com:kvithana/ptv.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd ptv
   ```

3. **Install dependencies using pnpm:**

   ```bash
   pnpm install
   ```

4. **Start the development server:**

   ```bash
   pnpm dev
   ```

   The app will be accessible at [http://localhost:3000](http://localhost:3000).

### Using GraphQL Queries

This project utilizes GraphQL for fetching data from the PTV API. You can find example queries in the `app/stop/[routeType]/[slug]/page.tsx` file.

Here's a basic example of how to query for a stop's information:

```graphql
query ServerStopQuery($id: ID!, $routeType: RouteType!) {
  stop(id: $id, routeType: $routeType) {
    id
    stop_name
    stop_suburb
  }
}
```

This query takes two arguments: `id` (the stop ID) and `routeType` (the type of transport). The query returns the stop's ID, name, and suburb.

**To run the query:**

1. Replace the placeholder values for `id` and `routeType` with actual values.
2. Open the GraphQL Playground at [https://studio.apollographql.com/sandbox/](https://studio.apollographql.com/sandbox/) and set the endpoint to **https://ptv.kal.im/api/graphql**.
3. Paste the query into the Playground and click "Play".

**You can find more complex queries for fetching departures, routes, and other information within the project code.**

### Contributing

We encourage you to contribute to this project by making small improvements or adding new features! Here are some potential ideas:

- **Add a map feature:** Display the location of stops on a map.
- **Improve the search functionality:** Implement autocomplete or fuzzy matching for stop names.
- **Enhance the user interface:** Add styling, animations, or accessibility features.
- **Add support for different route types:** Include information about buses, trains, trams, and other transport modes.
- **Improve the error handling:** Handle unexpected errors gracefully and provide informative messages to the user.
- **Add unit tests:** Write tests to ensure the functionality of the code.
- **Document the code:** Add comments and documentation to explain the logic of the code.

**To contribute:**

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request to the main repository.

We look forward to your contributions!

### Checklist for Potential Improvements

- [ ] Make the UI prettier, add loading skeletons
- [ ] Improve the search UI and make it global
- [ ] Enhance the user interface with styling, animations, and accessibility features
- [ ] Add support for different route types
- [ ] Improve error handling with informative messages
- [ ] Add unit tests for code functionality
- [ ] Add comments and documentation to explain code logic

### What's already implemented

The PTV Public Transport app currently supports:

- Searching for stops
- Displaying real-time and scheduled departures for trains and trams
- Viewing route information for train and tram routes

### Tools used

The app uses the following tools:

- Next.js: For building the frontend
- GraphQL: For fetching data from the PTV API
- pnpm: For managing project dependencies
- Date-fns: For formatting dates and times
- Fuse.js: For search functionality

### Environment Variables

Please have a read of the env.example. To run the application locally, you'll need to set the following environment variables:

- `PTV_DEVELOPER_ID`: Your PTV Developer ID
- `PTV_API_KEY`: Your PTV API Key

**If you don't have your own PTV API key, you can use the following example:**

```
NEXT_PUBLIC_NEXT_PUBLIC_DEPLOYMENT_BASEPATH=https://ptv.kal.im/api/graphql
```

To set these environment variables, create a `.env.local` file in the project root directory and add the variables to it. The `.env.local` file should be ignored by Git.

**Note:** The public API endpoint will not work if you deploy this code to a public domain. It is designed for use for development purposes only. To access the full range of data, you'll need to register for your own API key.

I encourage you to explore the codebase and experiment with the GraphQL queries to learn more about the PTV Public Transport API.
