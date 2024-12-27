**HeroesDek - A Marvel Superhero Search Engine**

This web application allows users to search for Marvel superheroes using the Marvel API. 

**Features:**

* **Search Functionality:**
    - Users can enter a superhero name in the search bar.
    - The application fetches and displays relevant character information, including name, image, and description.
* **Autocomplete Suggestions:**
    - While typing in the search bar, the application provides real-time autocomplete suggestions based on matching superhero names.
* **Error Handling:**
    - The application displays informative messages for invalid searches or API issues.

**Technologies Used:**

* **HTML:** For the structure of the webpage.
* **CSS:** For styling and visual presentation.
* **JavaScript:** For application logic, API interactions, and user interface updates.
* **Marvel API:** For retrieving superhero data.

**Getting Started:**

1. **Obtain Marvel API Keys:**
   - Register for a Marvel Developer account at [https://developer.marvel.com/](https://developer.marvel.com/).
   - Upon approval, obtain your `publicKey` and `privateKey`.

2. **Generate `ts` and `hash`:**
   - **`ts`:** Generate a unique timestamp: 
      ```javascript
      const ts = Date.now().toString(); 
      ```
   - **`hash`:** Calculate the MD5 hash of `ts + privateKey + publicKey`:
      ```javascript
      const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString(); 
      ```
      * Note: You might need to install the `crypto-js` library.

3. **Set up Project:**
   - Save the provided HTML, CSS, and JavaScript code files.
   - Update the `ts`, `publicKey`, and `hash` values in the JavaScript code with your obtained credentials.

4. **Run the Application:**
   - Open the `index.html` file in a web browser.

**Code Structure:**

- **HTML:** Defines the page structure (search bar, autocomplete list, results container).
- **CSS:** Styles the page's appearance.
- **JavaScript:** Handles:
    - API requests (using `fetch`).
    - Autocomplete functionality (with debouncing).
    - Displaying search results and error messages.

**Additional Notes:**

- The code includes comments for better understanding.
- This project is for educational and demonstrational purposes.