class Voucher {
    constructor(VoucherID, Content, Discount, IsExpired, IsActive, DateCreated) {
      this.VoucherID = VoucherID; // Unique identifier for the voucher
      this.Content = Content; // Text or code representing the voucher
      this.Discount = Discount; // Percentage discount provided by the voucher
      this.IsExpired = IsExpired; // Indicates whether the voucher is expired
      this.IsActive = IsActive; // Indicates whether the voucher is currently active
      this.DateCreated = DateCreated; // Date and time when the voucher was created
    }
}
export default Voucher