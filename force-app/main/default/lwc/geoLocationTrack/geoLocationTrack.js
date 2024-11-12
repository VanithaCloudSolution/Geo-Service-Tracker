import { LightningElement,api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getLocationService } from 'lightning/mobileCapabilities';
import { updateRecord } from 'lightning/uiRecordApi';
import getSa from '@salesforce/apex/LocationUpdater.getLocation';

export default class geoLocationTrack extends LightningElement {
    @api recordId;
    @wire(getSa, { saId: '$recordId' })
    serviceAppoitnment;
    myLocationService;
    currentLocation;
    locationButtonDisabled = false;
    requestInProgress = false;

    connectedCallback() {
        this.myLocationService = getLocationService();
        if (this.myLocationService == null || !this.myLocationService.isAvailable()) {
            this.locationButtonDisabled = true;
        }
    }

    handleGetCurrentLocationClick() {
        this.currentLocation = null;

        if (this.myLocationService != null && this.myLocationService.isAvailable()) {
            const locationOptions = {
                enableHighAccuracy: true
            };

            this.requestInProgress = true;

            this.myLocationService
                .getCurrentPosition(locationOptions)
                .then((result) => {
                    this.currentLocation = result;
                    console.log(JSON.stringify(result));

                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Location Detected',
                            message: 'Location determined successfully.',
                            variant: 'success'
                        })
                    );
                })
                .catch((error) => {
                    console.error(error);
                    this.dispatchEvent(  
                        new ShowToastEvent({
                            title: 'Location error',
                            message: 'Please enable the location' ,
                            variant: 'error'                        })
                    );
                })
                .finally(() => {
                    this.requestInProgress = false;
                });
        } else {
            console.log('Get Location button should be disabled and unclickable. ');
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'LocationService Is Not Available',
                    message: 'Try again from the Salesforce app on a mobile device.',
                    variant: 'error'
                })
            );
        }
    }

    handleUpdateLocationClick() {
        const fields = {};
        if (this.currentLocation) {
                 fields['Id'] = this.recordId;
                fields['FSL__InternalSLRGeolocation__Latitude__s'] = this.currentLocation.coords.latitude;
                fields['FSL__InternalSLRGeolocation__Longitude__s'] = this.currentLocation.coords.longitude;

                const recordInput = { fields };

            updateRecord(recordInput)
                .then((result) => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Location Updated',
                            message: 'Latitude and longitude fields updated successfully',
                            variant: 'success'
                        })
                    );
                })
                .catch((error) => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Location Update Error',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                })
                
        } else {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Location Not Available',
                        message: 'Please get your current location before updating',
                        variant: 'warning'
                    })
                );
            
        }
    }

    get currentLocationAsString() {
        return `Lat: ${this.currentLocation.coords.latitude}, Long: ${this.currentLocation.coords.longitude}`;
    }

    get currentLocationAsMarker() {
        return [{
            location: {
                Latitude: this.currentLocation.coords.latitude,
                Longitude: this.currentLocation.coords.longitude
            },
            title: 'My Location'
        }];
    }
    }