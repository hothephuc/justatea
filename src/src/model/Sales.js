class Sales {
    constructor(orderID, ProductID, NumSold, Date, Delivered = false) {
        this.orderID = orderID;      // String - Unique identifier for the order
        this.ProductID = ProductID;  // String - Unique identifier for the product
        this.NumSold = NumSold;      // Number - Quantity of the product sold
        this.Date = Date;            // Timestamp - Date and time of the sale
        this.Delivered = Delivered;  // Boolean - Whether the product has been delivered
    }
}
export default Sales