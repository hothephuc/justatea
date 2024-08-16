import React, { useContext, useEffect, useState } from 'react'
import MenuContext from '../../context/MenuContext'
import Item from '../item/Item'
import ProductController from '../../controller/Product'
import './BestProduct.css'
import { Link } from 'react-router-dom'
import poster from '../assets/poster.png';
const BestProduct = () => {
    const [products, setProducts] = useState([]);
    const handleClick = () => {
        window.scrollTo(0, 0);
    };
    const bestProductID=['8DZraCor04d6ONpKjs5z','B1KTfnCOrnN4QLkEh4J5','KjfJY37qg5di2JvV6PdH','pcjYOgNZBnd3dtnDWJnL']
    useEffect(() => {
        const fetchBestProducts = async () => {
          try {
            const fetchedProducts = await Promise.all(bestProductID.map(id => ProductController.fetchProductByID(id)));
            setProducts(fetchedProducts);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
        fetchBestProducts();
      }, []); 
      console.log(products)
  return (
    <div>
        {products.length>0?(<div className='best-products'>
        <h1>Sản phẩm nổi bật</h1>
        <hr/>
        <div className='best-products-item'>
            {products.map((item, i)=>{
                return <Item key={i} id={item.id} name={item.name} imageUrl={item.imageUrl} price={item.price} tag={item.tag} />
            })}
        </div>
        <hr/>
        <div className='poster'>
            <img src={poster}
            alt=""></img>
            <div className='poster-text'>
                <h2>Chào mừng đến JustaTea</h2>
                {/* <p>JustaTea không chỉ là một quán cà phê; mà còn là thiên đường cho những người đam mê trà và những người yêu thích cà phê. 
                    Chúng tôi tin rằng mỗi tách trà đều kể một câu chuyện, 
                    và tách trà của chúng tôi là câu chuyện về đam mê, chất lượng và hương vị khó quên.</p>
                <p>Hãy đến thư giãn trong bầu không khí ấm cúng của chúng tôi,
                 thưởng thức đồ uống của bạn và để hương thơm nồng nàn đưa bạn đến một thế giới của sự nuông chiều thuần túy.
                 Tại JustaTea, đó không chỉ là một thức uống; đó là một trải nghiệm.</p> */}
                <p>Bạn đang tìm kiếm khoảnh khắc bình yên?</p>
                <p>JustaTea là nơi nghỉ ngơi ấm cúng của bạn. 
                    Chúng tôi là nơi mà hương thơm tinh tế của 
                    cà phê và trà hòa quyện nhau tạo nên bầu không khí thực sự đặc biệt, mang cho bạn một cảm giác ấm cúng và thư giãn.</p>
                <p>Cho dù bạn là người sành trà hay sành cà phê, 
                    chúng tôi đều có thứ gì đó có thế làm hài lòng vị giác của bạn. 
                    Thực đơn của chúng tôi có nhiều loại trà được lựa chọn cẩn thận và các loại cà phê pha chế chuyên nghiệp, 
                    tất cả đều được làm bằng niềm đam mê và sự chăm chút.</p>
                <p>Tại JustaTea, đó không chỉ là một thức uống; đó là một trải nghiệm.</p>
                <Link onClick={handleClick} style={{ color: '#f6edd9', textDecoration: 'none', border: 'none' }} to="/Menu">
                <button >Khám phá thực đơn của chúng tôi</button>
                </Link>
            </div>
        </div>
        </div>):(<div></div>)}
    </div>
  )
}

export default BestProduct