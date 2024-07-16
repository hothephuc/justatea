const { uploadProductInfo } = require('./server/data-handle');
require('./config/firebase-config');

// Example test function
async function testUploadProductInfo() {
    try {
        // Example product information and image file (replace with actual data)
        const productInfo = {
            name: "Trà lài",
            price: 30000,
            ingredients: ["trà đen Anh", "hoa lái", "đường"],
            tag: "tea"
        };

        // Đường dẫn tới tệp ảnh trong cùng thư mục
        const imagePath = './tra_lai.jpg';

        // Đọc nội dung của tệp ảnh
        fs.readFile(imagePath, async (err, data) => {
            if (err) {
                console.error("Error reading image file:", err);
                return;
            }

            // Tạo đối tượng File từ dữ liệu và tên tệp
            const imageFile = new File([data], 'tra_lai.jpg', { type: 'image/jpeg' });

            // Gọi hàm uploadProductInfo với thông tin sản phẩm và đối tượng File
            const docId = await uploadProductInfo(productInfo, imageFile);
            console.log("Product uploaded successfully with ID:", docId);
        });

    } catch (error) {
        console.error("Error testing upload:", error);
    }
}

// Run the test function
testUploadProductInfo();