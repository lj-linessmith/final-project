# Boilerplate: Fullstack with Sass

## Setup

### What's included

This repo includes:

* a single, simple API endpoint (`/api/v1/fruits`)
* a single React component (`<App />`)
* an example database module (`server/db/fruits.js`)
* an API client module (`client/apis/fruits.js`)
* configuration for Vitest and testing library
* configuration for server-side debugging in VS Code
* configuration for preprocessing Sass

### Installation

#### **From the Github UI**

See the instructions [here](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) to use Github's feature to create a new repo from a template.

#### **From the command line**

```
git clone https://github.com/dev-academy-challenges/boilerplate-fullstack-query [your-project-name]
cd [your-project-name]
npm install # to install dependencies
npm run dev # to start the dev server
```

You can find the server running on [http://localhost:3000](http://localhost:3000) and the client running on [http://localhost:5173](http://localhost:5173).

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=boilerplate-fullstack-query)

---
## Documentation

*Here is some starter documentation to get things going, you will update this as a team at the start of the project.

## Workflow

- Use the KANBAN to assign yourself a task, post comments in the tickets to describe what needs to be done/what you are working on.
- Move the tickets along the KANBAN as you progress.
- When you're ready to commit new changes, first commit to your branch & create a pull request to dev. Tell Blue when that's done and it will be finalised with two group members confirming.
- When your changes are committed to the dev branch by Blue, he then will communicate this to everyone so they can pull the latest changes from dev.


## Git workflow

Branch structure:

Main -> Dev -> feature-name branches

Make sure that:

- file and function naming conventions are maintained across the app
- errors are well handled
- no sensitive data should be exposed on the client side
- it passes npm run lint without any code-related warnings or errors
- no unnecessary comments or log messages are remaining
- that Types are used where applicable, and any Type issues should be resolved
- user-facing updates (front end/ css crew) should be checked for accessibility concerns (using the WAVE tool)
- Good naming distinction between similar elements

## Data sources
 
For our project we will be consuming the Google Maps API, we will be using three different API's in this; 'Find Place', 'Place Details', and 'Nearby Search'. 

Google Maps API: 
- Find Place: This will be used to get the lattitude & longuitude of a location as an object, which will be used to search for the address.
- Nearby Search: This will be used to get the radius and locations in the zone from the Find Place API.
- Place Details: This will be used to display the details of a location, it is an object that contains all of the information we need. 

## Naming conventions

Be descriptive in each function/component name, reference the particular layer of the stack.
Note, more specific naming conventions to come.

Function names: 
- getAllLocationsApi()
- getLocationsDetailsApi()
- getCurrentLocationApi()
- getWinner()
- STRETCH
- getChosenLocationsDb()
- getChosenLocationsApi()
- getAllLocationsDb()

// -- More to come --

Component names
- App.tsx
- Home.tsx
- Locations.tsx
- Winner.tsx
- STRETCH
- Arena.tsx
- Landing.tsx
- CustomRound.tsx


### Views (Client Side)

| name | MVP | purpose |
| --- | --- | --- |
| Home | Yes | Welcomes users to site and has a form where you can input location, there is a 'GO!' button that links to the winner page, has a list of relevant locations|
| Winner | Yes | Displays the randomly selected location with information about it |
| Arena | No | Display an arena fghting zone where Locations battle, winner is then determined linking back to winner page |
| Landing | No | View for the user to choose between different modes (location or custom) |
| Custom | No | View for the user to input their own locations |

### API (Client - Server)

| Method | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- |
| Get | /api/v1/locations | No | Get all locations | Array of Locations Objects |
| Get | /api/v1/locations/:id | No | Get locations details for display | Single Location Data |
| Get | /api/v1/locations/winner/:id | No | Get one winner with information | Single Location Data |
| Post* | /api/v1/locations/stats | Yes | Add locations with stats to database | 201 status code |

Endpoints with a * are stretch

### DB (Server Side)

Here is a start on your database you can update these in your documentation. The bridge seed data has already been done for you. 


### locations/stats  - not set up

| Column Name | Data Type | Purpose |
| --- | --- | --- |
| id | integer | Unique identifier for each location |
| location_name| string | name of location taken from google maps|
| location_health | int | health points of location based on google ratings |
| location_damage | int | Randomy calculated damage points of location |



## Database functions:


- getLocationsDataApi()
- getWinner()
- STRETCH
- getAllLocationsDb()
- getChosenLocationsDb()
- getChosenLocationsApi()

getAllBridgesDb()

Returns:

```json
[
  {
    "id": 1,
    "name": "Auckland Harbour Bridge",
    "location": "Auckland Harbour Bridge",
    "type": "Motorway bridge",
    "year_built": 1959,
    "length_meters": 1020,
    "lanes": 8,
    "added_by_user": "",
  },
  // ...
]
```

getTollAnalyticsDb()

Returns:

```json
[
  {
    "id": 1,
    "bridgeId": 1,
    "timestamp": 1495083077243,
    "revenue": 2.39,
  },
  // ...
]
```
### API functions - not set up yet

- getCurrentLocationApi()
  Returns:
```json
{
  "candidates":
    [
      {
        "formatted_address": "140 George St, The Rocks NSW 2000, Australia",
        "geometry":
          {
            "location": { "lat": -33.8599358, "lng": 151.2090295 },
            "viewport":
              {
                "northeast":
                  { "lat": -33.85824377010728, "lng": 151.2104386798927 },
                "southwest":
                  { "lat": -33.86094342989272, "lng": 151.2077390201073 },
              },
          },
        "name": "Museum of Contemporary Art Australia",
        "opening_hours": { "open_now": false },
        "rating": 4.4,
      },
    ],
  "status": "OK",
}
```
- getAllLocationsApi()
  Returns:
```json
{
  "html_attributions": [],
  "results":
    [
      {
        "business_status": "OPERATIONAL",
        "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        "icon_background_color": "#FF9E67",
        "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
        "name": "Cruise Bar",
        "opening_hours": { "open_now": false },
        "place_id": "ChIJi6C1MxquEmsR9-c-3O48ykI",
        "price_level": 2,
        "rating": 4,
        "reference": "ChIJi6C1MxquEmsR9-c-3O48ykI",
        "scope": "GOOGLE",
        "types":
          ["bar", "restaurant", "food", "point_of_interest", "establishment"],
      }
    ]
    }
```

- getLocationsDataApi)
  Returns:
```json
{
  "html_attributions": [],
  "result":
    {
      "adr_address": '<span class="street-address">48 Pirrama Rd</span>, <span class="locality">Pyrmont</span> <span class="region">NSW</span> <span class="postal-code">2009</span>, <span class="country-name">Australia</span>',
      "business_status": "OPERATIONAL",
      "formatted_address": "48 Pirrama Rd, Pyrmont NSW 2009, Australia",
      "formatted_phone_number": "(02) 9374 4000",
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      "icon_background_color": "#7B9EB0",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      "international_phone_number": "+61 2 9374 4000",
      "name": "Google Workplace 6",
      "opening_hours":
        {
          "open_now": false,
          "weekday_text":
            [
              "Monday: 9:00 AM – 5:00 PM",
              "Tuesday: 9:00 AM – 5:00 PM",
              "Wednesday: 9:00 AM – 5:00 PM",
              "Thursday: 9:00 AM – 5:00 PM",
              "Friday: 9:00 AM – 5:00 PM",
              "Saturday: Closed",
              "Sunday: Closed",
            ],
        },
      
      "place_id": "ChIJN1t_tDeuEmsRUsoyG83frY4",
      "plus_code":
        {
          "compound_code": "45MW+C8 Pyrmont NSW, Australia",
          "global_code": "4RRH45MW+C8",
        },
      "rating": 4,
      "reference": "ChIJN1t_tDeuEmsRUsoyG83frY4",
      "url": "https://maps.google.com/?cid=10281119596374313554",
      "vicinity": "48 Pirrama Road, Pyrmont",
      "website": "http://google.com/",
    },
  "status": "OK",
}
```


### Helper Components

The helper component chooses the winner, which is a component that will render the winner conditionally

```
// Will only render the <Winner> component based on the winner of the random selection
<Winner>
      <p>And the winner is...</p>
</Winner>
```

## Setup

Run the following commands in your terminal:

```sh
npm install
npm run knex migrate:latest
npm run knex seed:run
cp .env.example .env
```

To run in development:
```sh
npm run dev
```

To run in production:
```sh
npm start
```
