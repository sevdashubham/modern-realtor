# Take-Home Programming Assignment

You have 6 hours to complete this assignment from when your Google Form is submitted. No need to host these webpages on the web; you can create them in separate folders with instructions on how I can open them on my local machine, or you can have all three pages running out of the same folder or file. Email your solution in a zip file to raymond.y.xu@gmail.com. Provide instructions to run your code, or if the instructions are long/complex, provide a shell script. You can copy code from anywhere and use LLMs like GPT or Claude, and this is encouraged. You can copy another GitHub repo or website, and this is encouraged. Use any cloud service you'd like, but make sure this is runnable from my laptop. Late submissions will not be counted. You will not get additional points for submitting faster.

All parts will be judged based on aesthetic appeal and functionality. I will only glance into your code if something breaks.

## Task 1: Guided Form Completion

**Objective:**

- Create a webpage that guides a user through filling out the first page of the California Residential Purchase Agreement (CAR RPA) form.

**Requirements:**

- Reference: [California-Residential-Purchase-Agreement-Realtor-Version.pdf](California-Residential-Purchase-Agreement-Realtor-Version.pdf).
- Implement a walkthrough similar to TurboTax, explaining fields that need user input.
- Example: Explain "THE REAL PROPERTY to be acquired is ___" with "1234 Main Street, Anytown, CA 12345, Lot 12 of Tract 345, Assessor's Parcel Number 678-901-234."
- Provide a button to download the filled-in PDF from the browser.
- Reference the current offer page implementation on modernrealtor.co for comparison. Yours should look better than mine though :)
- If you prefer, you may also generate a brand new form with similar text instead of filling in the existing CAR RPA.

## Task 2: Competitive Market Analysis

**Objective:**

- Create a webpage that allows users to view similar homes sold nearby based on a given address.

**Requirements:**

- Reference: One line report snippet image ( this is called "competitive market analysis").
- Implement a search functionality for addresses within San Francisco.
- Display up-to-date information on similar homes sold nearby, including pictures and $/sqft.
- You can use data from this repo: [HomeHarvest](https://github.com/Bunsly/HomeHarvest).

## Task 3: Property Price Trend Visualizer

**Objective:**

- Create a webpage with three inputs (address, radius, and number of days) to display various scatter plots of sold home data.

**Requirements:**

- Implement scatter plots for:
  - Time vs. home price.
  - Time vs. $/sqft of sold homes.
  - Number of homes sold per day.
- Graphs should show the data for the number of days specified.
- Use the same scrapes from the previous task.
- Ensure scatter plot points show detailed property information on hover or click.
- I will be looking an address within San Francisco.
- Consider ways to hide the slowness of running the HomeHarvest scrape code from the user.

---

**Submission Instructions:**

- **Email your solution in a zip file to raymond.y.xu@gmail.com.**
- **Include instructions to run your code locally, or provide a shell script if instructions are long/complex.**
- **If you can't finish, don't worry! Just submit what you have.**
