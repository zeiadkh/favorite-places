export class Place {
    constructor(title,  location, imageUri, id) {
        this.title = title;
        this.address = location.address;
        this.location = {lat: location.lat, lng: location.lng};
        this.imageUri = imageUri;
        this.id = id;
    }
}