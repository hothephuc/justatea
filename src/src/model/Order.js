class Order 
{
    constructor(orderID, orderList, orderStatus, dateCreated, dateshipped = null, paymentInfo, contactInfo, totalPrice) {
        this.orderID = orderID; // string
        this.orderList = orderList; // Array<{ ProductID: string, Quantity: number, Size: string, Toppings: string, Price: number }>
        this.orderStatus = orderStatus; // string
        this.dateCreated = dateCreated; // Date
        this.dateshipped = dateshipped; // Date set by admin 
        this.paymentInfo = paymentInfo; // Object containing payment details
        this.contactInfo = contactInfo; // Object containing contact information
        this.totalPrice = totalPrice; //
    }
}
export default Order 