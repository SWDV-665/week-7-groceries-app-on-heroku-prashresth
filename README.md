# week-7-groceries-app-on-heroku-prashresth

### groceries app browser build hosted on firebase: https://groceries-8154d.web.app/
### backend REST API hosted on heroku and data stored in mongo atlas: https://groceriesswdv655.herokuapp.com/api/grocery

week-7-groceries-app-on-heroku-prashresth created by GitHub Classroom

By end of this week, the Groceries' app should have its services deployed to Heroku.  
To set up Heroku, you will need to register for a free account with a credit card at Heroku.com. 
You will submit your work on GitHub. Here is the GitHub Classroom assignment link: 

For our week 7 assignment, complete the following steps:

As discussed in the video, the current status of the app should deploy to Heroku.

Capture the screenshots of each tab or screencast, walking through the flow of each tab.

Create a folder called 'screenshots' or 'screenCasts,' depending on what you generate. 
It is OK to have both screenshots and screenCasts.

Commit the generated screenshots or screenCasts files in the GitHub assignment repository.

When you submit this assignment here in Canvas, I would like you to answer the following question(s):

- GitHub Repository URL
- How many hours do you estimate you used completing this assignment?
- What was easiest for you when completing this assignment?
- What was the most difficult challenge you experienced when completing this assignment?


##Test curl commands:

### GET list:
`curl --request GET --url https://groceriesswdv655.herokuapp.com/api/grocery`

### GET by ID:
`curl --request GET --url https://groceriesswdv655.herokuapp.com/api/grocery/60f202421addbd00043bd1b7`

### POST an item:
`curl --request POST --url https://groceriesswdv655.herokuapp.com/api/grocery --header 'Content-Type: application/json' --data '{"name": "Grapes", "quantity": 5, "price": 2.99 }'`

### PUT (update) an item:
`curl --request PUT --url https://groceriesswdv655.herokuapp.com/api/grocery/60f352934ea0ab0004648f92 --header 'Content-Type: application/json' --data '{"name": "Orange", "quantity": 5, "price": 1.99 }'`
