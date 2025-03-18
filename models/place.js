class Place {
    constructor(title, address, location, imageUri) {
        this.title = title;
        this.address = address;
        this.location = location;
        this.imageUri = imageUri;
        this.id = new Date().toString() + Math.random().toString();
    }
}