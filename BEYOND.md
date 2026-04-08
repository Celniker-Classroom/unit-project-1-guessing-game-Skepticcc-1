# Above and Beyond Features

## 1. CSS Styling and Visual Design
- Added a `style.css` file with modern styling including fonts, colors, button hover effects, and responsive layout.
- Implemented a dark mode toggle that changes the background and text colors for better user experience.
- Styled the stats section with a background box and the leaderboard with padding and borders.

## 2. Input Validation
- Enhanced input validation to check if the guess is within the selected range (1 to currentRange).
- Displays appropriate error messages for invalid inputs.

## 3. Keyboard Support
- Added event listener for the Enter key on the guess input field, allowing players to submit guesses without clicking the button.
- Improves usability and accessibility.

## 4. Score Quality Feedback
- After a correct guess, the game provides quality feedback: "Amazing!" for 1 guess, "Good job!" for 2-3 guesses, and "Keep practicing!" for more.
- Motivates players and adds engagement.

## 5. Dark Mode Toggle
- Added a "Toggle Dark Mode" button that switches between light and dark themes using CSS classes.
- Enhances visual appeal and user preference.

These features improve the game's user interface, usability, and engagement beyond the basic requirements, making it more polished and fun to play.
Added the dark mode toggle feature
Styled and added visual design like colors etc for better interactivity
Added score quality feedback as an engagement feature through JS
Input validations was buggy so i fixed it for example if i just inputed the number 1 it would tell me im correct when im not