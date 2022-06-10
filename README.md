# pharmacy_finder_scraper

<a href="https://nodejs.org/en/" id="logo">
<h1 align="center">
        <img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" width="122" height="75">
      </a>

Web scraper for locating on duty pharmacies

## Requirements

* Node 16
* Git
* npm



## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/KostisGrf/pharmacy_finder_scraper.git
cd pharmacy_finder_scraper
```

```bash
npm install
```

## Run the app

To start the express server, run the following

```bash
node app.js
```

Open http://localhost:3000/api/pharmacy-duties?lon=$lng&lat=$lat' and take a look around,
replace $lng and $lat with real numbers for example 40.6401 and 22.9444