# Pillow.fund

So as per the assignment: \

-> We have to create a Request Limiter which does not allow a particular user to access some route after the user has exceeded the allowed limit per minute \

# Tech Stack

NodeJS \
MongoDB \
ExpressJS \

# Testing

-> Simply take a local pull of the repository. \

-> Go through a tutorial to setup MongoDB Atlas. As you will have to change the MONGO-DB Configuration variables [DATABASE_USERNAME, DATABASE_PASSWORD, MONGO_DB_URL] accordingly in the
.env file \

-> Once you have changed the configuration in .env file. Simply download the dependencies as per the package.json \

-> Then use [npm run start] to run the project \

-> Then use postman or any other similar tool to send [GET request] at http://localhost:8000/api/v1/url \

-> Before sending [GET request] in the Headers of the request set a variable [userId to any integer] \

# Approach

I have created 2 collections:
