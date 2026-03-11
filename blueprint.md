
# Blueprint: Lotto Number Generator

## 1. Project Overview

This project is a web-based lottery number generator. It allows users to generate five sets of six unique numbers between 1 and 45, styled to look like lottery balls. The application is built using modern HTML, CSS, and JavaScript, leveraging Web Components for a modular and maintainable structure.

## 2. Implemented Features & Design

### Implemented Features & Design
*   **HTML:** A basic structure with a title, a container for results (`#result-container`), and a "draw" button (`#draw-btn`). Includes a theme toggle button for switching between dark and light modes.
*   **CSS:** A modern-looking design with a centered application container, custom fonts, and a subtle background texture. It uses CSS variables for colors and shadows, supporting both Light and Dark modes.
*   **JavaScript:** The `main.js` file implements the lottery logic and theme switching logic. It uses a custom Web Component `<lotto-set>` for display.
*   **Web Component (`<lotto-set>`):** Encapsulates the display logic for a set of lottery balls. Includes animations and color-coding based on number ranges, with theme-aware background styling.

## 3. Current State & Future Enhancements
*   **Current State:** The application is fully functional with a dynamic theme toggle. Clicking the "번호 추첨" button generates 5 sets of lottery numbers with smooth animations.
*   **Future Enhancements:**
    *   Add a "Save" feature to keep track of generated numbers.
    *   Implement a "Statistics" view to show frequency of generated numbers.
    *   Add more interactive sound effects when numbers appear.
