# sass-api v0.0.0



- [App](#app)
	- [Create app](#create-app)
	- [Delete app](#delete-app)
	- [Retrieve app](#retrieve-app)
	- [Retrieve apps](#retrieve-apps)
	- [Update app](#update-app)
	
- [Auth](#auth)
	- [Authenticate](#authenticate)
	- [Authenticate with Facebook](#authenticate-with-facebook)
	- [Authenticate with Google](#authenticate-with-google)
	
- [City](#city)
	- [Create city](#create-city)
	- [Delete city](#delete-city)
	- [Retrieve cities](#retrieve-cities)
	- [Retrieve city](#retrieve-city)
	- [Update city](#update-city)
	
- [PasswordReset](#passwordreset)
	- [Send email](#send-email)
	- [Submit password](#submit-password)
	- [Verify token](#verify-token)
	
- [Site](#site)
	- [Create site](#create-site)
	- [Delete site](#delete-site)
	- [Retrieve site](#retrieve-site)
	- [Retrieve sites](#retrieve-sites)
	- [Update site](#update-site)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# App

## Create app



	POST /apps


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>App's name.</p>							|
| type			| 			|  <p>App's type.</p>							|
| identifier			| 			|  <p>App's identifier.</p>							|
| apiKey1			| 			|  <p>App's apiKey1.</p>							|
| apiKey2			| 			|  <p>App's apiKey2.</p>							|
| active			| 			|  <p>App's active.</p>							|

## Delete app



	DELETE /apps/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve app



	GET /apps/:id


## Retrieve apps



	GET /apps


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update app



	PUT /apps/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>App's name.</p>							|
| type			| 			|  <p>App's type.</p>							|
| identifier			| 			|  <p>App's identifier.</p>							|
| apiKey1			| 			|  <p>App's apiKey1.</p>							|
| apiKey2			| 			|  <p>App's apiKey2.</p>							|
| active			| 			|  <p>App's active.</p>							|

# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

## Authenticate with Facebook



	POST /auth/facebook


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Facebook user accessToken.</p>							|

## Authenticate with Google



	POST /auth/google


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Google user accessToken.</p>							|

# City

## Create city



	POST /cities


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>City's name.</p>							|
| postcode			| 			|  <p>City's postcode.</p>							|
| city			| 			|  <p>City's city.</p>							|
| active			| 			|  <p>City's active.</p>							|
| area			| 			|  <p>City's area.</p>							|
| country			| 			|  <p>City's country.</p>							|

## Delete city



	DELETE /cities/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve cities



	GET /cities


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve city



	GET /cities/:id


## Update city



	PUT /cities/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>City's name.</p>							|
| postcode			| 			|  <p>City's postcode.</p>							|
| city			| 			|  <p>City's city.</p>							|
| active			| 			|  <p>City's active.</p>							|
| area			| 			|  <p>City's area.</p>							|
| country			| 			|  <p>City's country.</p>							|

# PasswordReset

## Send email



	POST /password-resets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>Email address to receive the password reset token.</p>							|
| link			| String			|  <p>Link to redirect user.</p>							|

## Submit password



	PUT /password-resets/:token


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Verify token



	GET /password-resets/:token


# Site

## Create site



	POST /sites


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Site's name.</p>							|
| config			| 			|  <p>Site's config.</p>							|
| url			| 			|  <p>Site's url.</p>							|
| active			| 			|  <p>Site's active.</p>							|
| plan			| 			|  <p>Site's plan.</p>							|
| color			| 			|  <p>Site's color.</p>							|
| logo			| 			|  <p>Site's logo.</p>							|
| apps			| 			|  <p>Site's apps.</p>							|
| custom			| 			|  <p>Site's custom.</p>							|
| blocked			| 			|  <p>Site's blocked.</p>							|

## Delete site



	DELETE /sites/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve site



	GET /sites/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve sites



	GET /sites


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update site



	PUT /sites/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Site's name.</p>							|
| config			| 			|  <p>Site's config.</p>							|
| url			| 			|  <p>Site's url.</p>							|
| active			| 			|  <p>Site's active.</p>							|
| plan			| 			|  <p>Site's plan.</p>							|
| color			| 			|  <p>Site's color.</p>							|
| logo			| 			|  <p>Site's logo.</p>							|
| apps			| 			|  <p>Site's apps.</p>							|
| custom			| 			|  <p>Site's custom.</p>							|
| blocked			| 			|  <p>Site's blocked.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|


