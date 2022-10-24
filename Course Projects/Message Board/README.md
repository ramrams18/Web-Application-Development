# PHP message board

A simple message board where registered users can post messages.

## Requirements 

1. The `login.php` script generates a form that has two text windows for username and password and a "Login" button. 
2. The `board.php` has a "Logout" button, a textarea to write a message, a "New Post" button, and a list of messages. 
3. The board script prints all the messages in the database as a flat list ordered by date/time (newest first, oldest last). 
4. From the login script, if the user enters a wrong username/password and pushes "Login", it should go to the login script again. If the user enters a correct username/password and pushes "Login", it should go to the board script. 
5. From the board script, if the user pushes "Logout", it should logout and go to the login script. The board script must always make sure that only authorized used (users who have logged-in properly) can view and post messages. 
6. From the board script, if the user fills out the textarea and pushes the "New Post" button, it will insert the new message in the database (with null replyto attribute) and will go to the board script again. If the user fills out the textarea and pushes the "Reply" button, it will insert the message in the database -- but this time it should set the replyto value, and will go to the board script again.