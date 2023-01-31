# Problem Statement

We have to create a Request Limiter which does not allow a particular user to access some route after the user has exceeded the **MAXIMUM NUMBER OF ALLOWED REQUEST** in a **TIME_WINDOW**

# Tech Stack

**NodeJS** \
**Redis** \
**ExpressJS**

# Testing

1. Simply take a local pull of the repository.

2. Go through a tutorial to setup **REDIS** locally. Change the Redis config as per requirement in .env file

3. Once you have changed the configuration in .env file. Simply download the dependencies as per the package.json using **npm install**

4. Then use **npm run start** to run the project

5. Then use postman or any other similar tool to send **GET request** at http://localhost:8000/api/v1/url

6. Before sending **GET** request, we have to first set a variable **userId** in the Headers of the request

# Approach

I have used Redis as DB to store information about the timestamps when any particular user successfully accessed the route.

The **REDIS_KEY** is of FORMAT: "userId:url"

And For each userId we store Sorted Set of all the timestamps when user was allowed successfull access to the route

Whenever we want to access the route we first make a Query in Redis DB to find all the timestamps when the user who is making the request for a particular URL has accessed the Route successfully and and if the number of access is less than the maximum LIMIT we simply put it into the list.

When the list exceeds the the **MAXIMUM_REQUEST_LIMIT** we remove all the access records which did not happen in the current window.

If the new window allows us to make a new request we add the **CURRENT_TIMESTAMP** in the sorted set for the REDIS_KEY

I have used Lua script to run the entire process to make it ATOMIC and free from any CONCURRENT access which might happen in DISTRIBUTED-SYSTEMS

# References:

1. **System Design Interview by Alex Xu**

2. **Redis University for Fantastic Course Tutorial on Redis**
