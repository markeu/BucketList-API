# BucketList-API
[![Build Status](https://travis-ci.com/markeu/BucketList-API.svg?branch=master)](https://travis-ci.com/markeu/BucketList-API)
[![Coverage Status](https://coveralls.io/repos/github/markeu/BucketList-API/badge.svg?branch=master)](https://coveralls.io/github/markeu/BucketList-API?branch=master)


# BucketList-API

BucketList API is the backend component of a platform where users can create a bucket list.

### Required Features

```
User can sign up.
User can sign in.
User can create a new bucket list
User can update this bucket list.
User can delete a single bucket list.
User can view all the created bucket lists.
User can view a specific single bucket list by id.
User can view a specific single bucket list by search.
User can view list all the created items in a bucket list.
User can create a new item in bucket list.
User can get a single item in a bucket list.
User can update a bucket list item.
User can delete an item in a bucket list.
```

## Installation and Running the Application

Ensure that you have nodejs and npm installed in your computer

a. Clone this repository into your named folder

```bash
git clone -b develop https://github.com/markeu/BucketList-API
git status
```

b. Install the project dependencies

```bash
npm install
```

c. start the application

```bash
npm start
```

## Test the endpoints

The application can be tested locally through localhost on port 5555 using postman

1. Run the application while postman is open
2. Go to postman and test against the endpoints below with the required property:-

### Endpoints to test

Method        | Endpoint      | Enable a user to: |
------------- | ------------- | ---------------
POST  | api/v1/auth/signup  | Create user account  |
POST  | api/v1/auth/login | Login a user |
POST  | api/v1/bucketLists | create a new bucket list |
GET  | api/v1/bucketLists | view all the created bucket lists |
GET  | api/v1/bucketLists/search?q =​ <bucketName> |
GET  | api/v1//bucketLists/<id>  |  view a specific single bucket list by id | 
PUT  | api/v1/property/bucketLists/<id> | update this bucket list |  
DELETE  | api/v1/bucketLists/<id> | delete a single bucket list |  
POST  | api/v1/bucketLists/<id>/items  | list all the created items in a bucket list |
GET  | api/v1/bucketLists/<id>/items  | View all bucket list items |
GET  | api/v1/bucketLists/<id>/items/<id>  | view specific bucket list item |
PUT  | api/v1/bucketLists/<id>/items/<id>  | Update a specific bucket list item |
DELETE  | api/v1/bucketLists/<id>/items/<id>  | Delete specific bucket list item |


## Author

* Uche Uzochukwu Mark
