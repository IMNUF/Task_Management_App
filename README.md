
## ABOUT THE APP

This is a to-do list that lets you add tasks, track their progress and filter them. You enter a task name, pick a category, set a deadline and choose a starting status, then click Add Task To List (or press Enter). Each task is stored as an object in an array (id, name, category, deadline, status), and the page is redrawn from that array every time something changes. You can change a task’s status from its dropdown or delete it with the delete button. The filters at the top show only tasks in a chosen category or status. The array is saved in the browser’s local storage, so your tasks are still there after a refresh. 

### Additional features 

#### Tasks are automatically marked Overdue when their deadline has passed and they aren’t completed. This is checked on page load, after every change, and every minute. 
#### Duplicate task names and empty names are blocked with a message. 
#### Helpful messages show when the list is empty or no tasks match the filter. 
#### Completed tasks are crossed out, and overdue tasks have a red border. 
#### Long task names wrap instead of overflowing the page. 
#### Labels and ARIA attributes make the form and buttons work with screen readers. 

## Reflection
I am still struggling to grasp JavaScript concepts, and I am learning as I go. This project showed me how much I still have to learn. I ran into many problems, and most of them came from things I didn’t yet understand. The status filter failed because my dropdown said “In progress” while my code said “In Progress”, and “Past Due” never matched “Overdue.” I spent time searching my HTML for the classes my CSS used, before I learned that JavaScript creates them while the page runs. Turning input into objects, and saving them in local storage with JSON, were completely new ideas to me.
I handled these by referencing w3 schools, google searches, trial and error, checking the console for errors, and using DevTools to inspect the live page. I asked a lot of questions on google whenever I got stuck, wrote notes about what each piece of code does and try to understand them.
With more time, I would keep on practicing JavaScript concepts until they feel natural. I would also let users edit a task’s name and deadline, add sorting and search, use event delegation, and possibly keep the status names in one shared list 
