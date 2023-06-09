# NEUCareer

Group members: Victor Wilm, Jacky Tung, Guoao Wei

## Iteration 1

### Tasks completed

Jacky:

- Completed authentication (sign in/sign up) with Firebase and maintained login persistency
- Created Firebase helper that stores user information into Firestore
- Built sign in and sign up pages
- Setup camera and photo library access that allows for customized profile picture

Victor:

- Created documents with fake data
- Integrated with firestore db to get logged in user Mentors
- Built My Mentors page with ListView and GridVew

Guoao:

- Built Home page, header and navigators
- Helped bug fixing and Android testing

Screenshots:

<img src="./screenshots/db.png" width="80%">
<img src="./screenshots/auth.png" width="80%">
<img src="./screenshots/login.png" width="30%">
<img src="./screenshots/signup.png" width="30%">
<img src="./screenshots/signup_info.png" width="30%">
<img src="./screenshots/my_mentors_list.png" width="30%">
<img src="./screenshots/my_mentors_grid.png" width="30%">

### Requirements

You should have React Native components created to represent the functionality you will be building, and the overall structure of your app should be in place.

- We have React Native components that are created for our sign-up/sign-in page. Our react component is also create for when the user inserts their information when they sign up.
- Our My Mentors list page is created. Creating the My Mentees page should be really quick since it is a duplicate of the same page.
- Calendar page and Profile page is not yet set up, but will be completed in the next iteration.
- Overall users can insert their information into the signup page, and we are able to push our information into firestorm.
- Book Meetings page needs to be done.
- Overall, we will need to also setup logout to end persistence.

* Navigation
  - Your app should have at least 2 navigators
    - Our app includes a bottom and top navigator once users signup/login
* The basis of CRUD operations to Firestore should be established and working.
  - The basis of CRUD operations work as we are able to set up our initial collection for users. Our other CRUD operations will work given that this works too.

### Next steps

Jacky:

- Setup permissions for photo and camera access
- Build user profile page
- Mentor profile page

Victor:

- Request to connect
- Accept connection

Guoao

- Book meeting page
- Obtain location and show static map

## Iteration 2

~~Authentication~~

Finished in iteration 1 and improved in iteration 2:

- Allow users to setup profile and background picture after signup.
- Allow users to provide more personal details for their profile page. Work and personal phone number, work and personal email, city, province/state, country,
  <img src="./screenshots/iteration-2/profile1.png" width="30%">
  <img src="./screenshots/iteration-2/profile2.png" width="30%">
  <img src="./screenshots/iteration-2/profile3.png" width="30%">
  <img src="./screenshots/iteration-2/profile4.png" width="30%">
  <img src="./screenshots/iteration-2/profile5.jpeg" width="30%">

~~Camera use~~

Users can use the camera to take a picture for their avatar in user profile

~~Location use~~

The booking page obtains the current location, and autocomplete nearby location when user is typing in the input box.

<img src="./screenshots/iteration-2/booking.png" width="30%">
<img src="./screenshots/iteration-2/booking_autocomplete.png" width="30%">

Notification

External API use

Guoao:

- Built a skeleton of the Booking page
- Added dropdown for selecting duration
- Added Autocomplete for address using Google API
- Fixed several bugs

Jacky:

- Header avatar now redirects to signupinfo page
- User profile and clicked profile now both has Headers. Profile Page is now the child component of User profile or Clicked Profile. Prop will be passed into Profile page to check this.
- Book meeting page UI completed for calendar, but does not get or update any data yet for real-time booking
  SignUp Info page is now both the signup page and the update profile page. This page's function changes depending on when the user is signed in or not.
- firestore now has helper that updates profile picture
- Profile page now has a button that can be used to update profile picture. This button will create an overlay for camera/libary options. This button is only available for User Profile and not Clicked Profile.
- Completed bug fixes. One of them includes that telephone numbers should be numbers not strings

Victor:

- Two new filters in my mentors page: New mentors and My mentors filters
- Filters allow users to hide any of the list
- Connect button: once clicked, a connection between the mentor and mentee is created, which will mentees to interact and meet with their mentors
- Disconnect button: ends the connection between a mentor and a mentee

<img src="./screenshots/iteration-2/mymentors.jpeg" width="30%">

## Iteration 3

~~Authentication~~

See Iteration 1

~~Camera use~~

<img src="./screenshots/iteration-3/camera_use.png" width="30%">

~~Location use~~
~~External API use~~

<img src="./screenshots/iteration-3/booking_1.jpeg" width="30%">
<img src="./screenshots/iteration-3/booking_2.png" width="30%">


~~Notification~~

<img src="./screenshots/iteration-3/my_mentees_2.jpeg" width="30%">
<img src="./screenshots/iteration-3/my_mentees_3.jpeg" width="30%">

Other pages:

<img src="./screenshots/iteration-3/my_mentees_1.png" width="30%">
<img src="./screenshots/iteration-3/my_mentees_4.png" width="30%">
<img src="./screenshots/iteration-3/calendar.png" width="30%">
<img src="./screenshots/iteration-3/my_mentor_profile.jpeg" width="30%">
<img src="./screenshots/iteration-3/my_profile.jpeg" width="30%">
<img src="./screenshots/iteration-3/edit_profile.png" width="30%">
<img src="./screenshots/iteration-3/setting_menu.png" width="30%">
<img src="./screenshots/iteration-3/time.png" width="30%">
<img src="./screenshots/iteration-3/date.png" width="30%">

### Contributions:

Guoao:

- Booking screen which allows one user to book meeting with another one
- Booking organizer and attendee will be notified by push notification
- Getting push token and store it into context and Firebase
- Date and time picker in the booking page for both IOS and Android
- Several bug fixing including adding SafeAreaView for setting overlay, abnormal behavior of saving token, etc.

Jacky:

- Create the calendar view which shows all the bookings
- Clicking left Avatar now redirects to Profile page
- Tab screen no longer contains user profile
- Improvements to design edit button on UserProfile page
- Calendar now has title. Clicking on other people's profile now also has a back button
- Sign out feature

Victor:

- My Mentees screen
- Mentees now request to connect with a mentor, which have to either accept or decline the connection
- Refactored connections to use onSnapshot for responsive rendering as users take action in the app
- Notify:
  - Mentor when mentee asks to connect
  - Mentee when mentor accepts/decline connection
  - Mentor or Mentee when the other party ends a connection
