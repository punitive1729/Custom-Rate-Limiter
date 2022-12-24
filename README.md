# Pillow.fund

So as per the assignment: 

We have to create a Request Limiter which does not allow a particular user to access some route after the user has exceeded the allowed limit per minute 

# Tech Stack

NodeJS \
MongoDB \
ExpressJS 

# Testing

1. Simply take a local pull of the repository. 

2. Go through a tutorial to setup MongoDB Atlas. As you will have to change the MONGO-DB Configuration variables 
**DATABASE_USERNAME**  **DATABASE_PASSWORD**  **MONGO_DB_URL** accordingly in the .env file 

3. Once you have changed the configuration in .env file. Simply download the dependencies as per the package.json 

4. Then use **npm run start**  to run the project 

5. Then use postman or any other similar tool to send **GET request** at http://localhost:8000/api/v1/url 

6. Before sending **GET** request, we have to first set a variable **userId** = any integer in the Headers of the request

# Approach

I have created 2 collections:

1. **LastMinuteAccessTimes** - this stores **[userId, url, createdAt]**. A single document from this collection indicates that a user with **userId**, accessed **url** at Timestamp **createdAt**

2. **TotalAccessTimes** - this stores **[userId, url, count]**. A single document from this collection indicates that a user with **userId**, accessed **url** a total of **count** times

So when we make a request, we first process the **LastMinuteAccessTimes** table to check how many times did the user with userId, accessed url in last 1 minute.

If the number of times it accessed **url** is more than **RATE_LIMIT** we throw exception as well as **Min time** after which the request will work. Else we continue and we create a record in **LastMinuteAccessTimes** table where we store **userId, url, currentTime**.

Then we access **TotalAccessTimes** to get total number of times user with userId has accessed url in total.

# Regarding Auto Deletion

Since LastMinuteAccessTimes table only needs to store records for 1 minute only. Therefore I have set TTL indexes which allows MONGO-DB to run an Auto-Deletion script at regular intervals. So our DB does not get overloaded with unnecessary clutter.

# Alternative Approach
There are many Rate Limiting Libraries like express-rate-limit. But I have decided to use MongoDB as express-rate-limiter I think stores data in **Cache** which is not scalable

