public with sharing class LocationUpdater {
    @AuraEnabled(cacheable=true)
    public static ServiceAppointment getLocation(String saID) {
       return [SELECT id,FSL__InternalSLRGeolocation__Latitude__s,FSL__InternalSLRGeolocation__Longitude__s FROM ServiceAppointment WHERE id= :saID];
    }
}