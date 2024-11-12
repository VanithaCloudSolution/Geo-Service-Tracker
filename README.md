# Geo Service Tracker

The GeoLocationTrack Lightning Web Component (LWC) is designed to enhance the functionality of the Salesforce platform by leveraging the device's geolocation capabilities. This component allows users to retrieve their current geographic location using GPS and update the corresponding Internal SLR Geolocation fields on a ServiceAppointment record in Salesforce. The component provides a user-friendly interface to fetch, display, and update location data seamlessly.

# Features

- Fetches the user's current location using the device's GPS.
- Displays the current location on a map.
- Updates the Internal SLR Geolocation fields of the ServiceAppointment record with the fetched location.
- Provides feedback via toast messages.

# Usage Scenario

###  Accessing the Service Appointment:

Open the Salesforce FSL Mobile App on your mobile device. Then navigate to the list of Service Appointments assigned to you. select the specific Service Appointment you are currently working on.

<img src="https://github.com/user-attachments/assets/1dd7b6e0-6971-4383-bceb-c6d1eb99751f" height=600 width=500  />

### Opening the GeoLocation Component:

Within the Service Appointment record page, navigate to the <b>UpdateLocation</b> component embedded within the Action.

<img src="https://github.com/user-attachments/assets/a5eb9a27-f03d-46bb-a9ca-0b026618503d" height=600 width=500  />

### Fetching the Current Location:

- The technician sees the component interface, which includes the "Get Current Location" and "Update Location" buttons.
- The technician taps the Get Current Location button.
- The component initiates a request to fetch the technician's current geolocation using the device's GPS.

  <img src="https://github.com/user-attachments/assets/8157e58e-d6bd-4615-bd58-d56862632cb1" height=600 width=500  />


### Displaying the Location:
- Once the location is successfully fetched, the component displays the latitude and longitude coordinates in text format.
- The technician also sees a map with a marker indicating their current location.
- A success toast message is displayed: "Location Detected: Location determined successfully."
    <img src="https://github.com/user-attachments/assets/808bc226-46f4-4d3c-9841-78cfc0f55755" height=600 width=500  />


### Updating the Service Appointment Record:
- The technician verifies that the displayed location is accurate.
- They tap the Update Location button.
- The component updates the FSL__InternalSLRGeolocation__Latitude__s and FSL__InternalSLRGeolocation__Longitude__s fields of the Service Appointment record with the fetched coordinates.
- A success toast message is displayed: "Location Updated: Latitude and longitude fields updated successfully."

    <img src="https://github.com/user-attachments/assets/520fc5fd-7984-4de4-a4e8-fe0e2bdbc8a4" height=600 width=500  />


### Confirming the Update:

- The technician receives confirmation that the Service Appointment record has been updated with the correct geolocation data.
- This updated information is now available for dispatchers and managers to view in real-time, ensuring accurate tracking and reporting.


   <img src="https://github.com/user-attachments/assets/7a61d171-8377-4f4e-8cac-d420e357689c" height=600 width=500  />




