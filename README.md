# Setup
Update for new enhancements 

Run,
    // add new packages
    $ npm install
    
Go to ios directory and run,

    $ cd ios 
    //delete pod folder and pod.lock file
    $ pod install && cd ..

start react-native

    $ react-native run-ios  --simulator="iPhone Xs"

# SocarProject



- Create Cars Tab

- Booking Screen

- Show Active and in-active Reservations List

- Used Redux for storing the states

Added Screenshots for reference 

![View Car Listing ](img/car_listing.png "Car Listing")

![Individual car detials ](img/details_page.png "Car Details") 

![Confirm Booking Loading Screen](img/confirm_booking.png "Confirm Booking")

![Updated Car Listing View](img/updated_car_listing.png "Updated Car Lists")
 
![All Reservation List View](img/reservation_list.png "Reservation List")

![Active Reservation List View](img/active_reservation_list.png "Active Reservation List")

**The reservations list is showing the wrong time for collection and returned due to the firestore timestamp, the server is synced to US.Sorry for that**