import React,{useEffect,useState} from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Line } 
 from 'recharts';
import AdminController from '../../controller/Admin';

function AdPanel() {
  const [alertCount, setAlertCount] = useState();
  const [productCount, setProductCount] = useState();
  const [customerCount, setCustomerCount] = useState();
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
      async function fetchCustomerCount() {
          try {
              const count = await AdminController.countUsers();
              setCustomerCount(count);
          } catch (error) {
              console.error("Error fetching customer count:", error);
          }
      }

      async function fetchProductCount() {
          try {
              const count = await AdminController.countProducts();
              setProductCount(count);
          } catch (error) {
              console.error("Error fetching product count:", error);
          }
      }

      async function fetchAlertCount() {
          try {
              const count = await AdminController.countOrdersAlert();
              setAlertCount(count);
          } catch (error) {
              console.error("Error fetching alert count:", error);
          }
      }

      async function fetchSalesData() {
          try {
              const sales = await AdminController.getTop5ProductsBySales();
              setSalesData(sales);
              console.log('Sales data:', sales);
          } catch (error) {
              console.error("Error fetching sales data:", error);
          }
      }

      fetchCustomerCount();
      fetchProductCount();
      fetchAlertCount();
      fetchSalesData();
  }, []);

  return (
      <main className='main-container'>
          <div className='main-title'>
              <h3>Bảng thống kê</h3>
          </div>

          <div className='main-cards'>
              <div className='card'>
                  <div className='card-inner'>
                      <h3>Sản phẩm</h3>
                      <BsFillArchiveFill className='card_icon' />
                  </div>
                  <h1>{productCount}</h1>
              </div>
              <div className='card'>
                  <div className='card-inner'>
                      <h3>Người dùng</h3>
                      <BsPeopleFill className='card_icon' />
                  </div>
                  <h1>{customerCount}</h1>
              </div>
              <div className='card'>
                  <div className='card-inner'>
                      <h3>Đơn hàng</h3>
                      <BsFillBellFill className='card_icon' />
                  </div>
                  <h1>{alertCount}</h1>
              </div>
          </div>
          <div className='main-title'>
              <h3>Số sản phẩm bán chạy nhất trong tháng</h3>
          </div>
          <div className='charts'>
              <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                      data={salesData}
                      margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                      }}
                  >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name"/>
                      <YAxis />
                      <Tooltip/>
                      <Legend />
                      <Bar dataKey="totalQuantity" fill="#8884d8">
                        <LabelList dataKey="totalQuantity" position="top" formatter={(value) => `${value} Sản Phẩm đã bán`} /> 
                      </Bar>
                  </BarChart>
              </ResponsiveContainer>
          </div>
      </main>
  );
}

export default AdPanel