

# Online (JS,HTML,CSS) code editor 

## Overview

This project is a web-based application that allows users to create, save, and reuse HTML, CSS, and JavaScript templates. It provides a user-friendly interface for coding and previewing templates, as well as saving them for future use.

## App is deployed here :
https://kuika-oce.vercel.app/

## Features

1. **Auto Run**: It will render your code on the go.

2. **Save Button**: Clicking the "Save" button allows users to save their templates using browser-based storage. Users can specify a template name when saving.

3. **History Dropdown**: Saved templates can be accessed and reused by selecting them from the History dropdown.

4. **Template Loading**: When a template is selected from the History dropdown, the corresponding HTML, CSS, and JS code will be loaded into their respective fields, and the template will be rendered in the Content area.

5. **Persistent State**: User progress and templates are saved, allowing users to continue from where they left off even after a page refresh.

6. **Minimize Button**: Clicking the "Minimize" button will trigger an animation. The HTML, CSS, and JS fields will collapse, while the Content area will expand.

7.  **Test Variable**: There is test variable input, so if use EXACTLY {{ TEST_VARIABLE }} in your code it will render with the value you provide inside test variable input

## Usage

1. Open the application in your web browser.

2. Enter your HTML, CSS, and JS code in their respective fields.

3. To save your template, click the "Save" button and provide a name for the template.

4. To load a saved template, select it from the History dropdown. The code will be loaded, and you can click "Run" to preview it.

6. Click the "Minimize" button to toggle the display of the code fields and Content area.

7. Use Test Variable input and give it a value then use it in your code as {{ TEST_VARIABLE }}  in many place 



## How to Run the App
To run the app locally, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```
**Attention!** &#x1F6AB; use peer deps !!! (causes by CodeMirror)
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to access the app.

## Technologies Used

This app is built with the following technologies:
- Browser-based storage (for saving templates)
- **React**: A JavaScript library for building user interfaces.
- **React Custom Hooks**
- **CodeMirror**: CodeMirror is a code editor component for the web. 
- **Tailwind CSS**: A utility-first CSS framework for styling.
  
## About the Author

You can find more of my projects and connect with me on my website: [aminghk.vercel.app](https://aminghk.vercel.app).
```
