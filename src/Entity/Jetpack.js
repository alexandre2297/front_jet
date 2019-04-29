module.exports = class  {
    constructor() {
        this._id      = null;
        this._name    = null;
        this._image   = null;
        this._booking = null;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    get booking() {
        return this._booking
    }

    set booking(value){
        this._booking = value
    }
};