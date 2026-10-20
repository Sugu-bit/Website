import React from 'react';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import ConnectWidget from '../components/connectwidget';
import Footer from '../components/footer';
import Suggest from '../components/home/suggest';
import BestSell from '../components/home/bestSell';
import Special from '../components/home/special';
function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <ConnectWidget />
      <div className="flex justify-center items-center mt-3 mb-3 relative">
        <div className="flex items-center justify-center relative px-5 py-2 text-orange-600 font-bold w-full">
            <div
            className="absolute bottom-[-3px] left-0 right-0 w-full h-[3px] bg-orange-600 rounded-md"
            ></div>
            <div
            tabIndex="0"
            className="text-xl uppercase text-center"
            >
            <span>sản phẩm bán chạy</span>
            </div>
        </div>
      </div>
      <BestSell />
      <div className="flex justify-center items-center mt-3 mb-3 relative">
        <div className="flex items-center justify-center relative px-5 py-2 text-orange-600 font-bold w-full">
            <div
            className="absolute bottom-[-3px] left-0 right-0 w-full h-[3px] bg-orange-600 rounded-md"
            ></div>
            <div
            tabIndex="0"
            className="text-xl uppercase text-center"
            >
            <span>giá ưu đãi</span>
            </div>
        </div>
      </div>
      <Special/>
      {/* <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 m-20'>
        {products.map((product, key) => (
          <ProductCart key={key} data={product} />
        ))}
      </div> */}
      <div className="flex justify-center items-center mt-3 mb-3 relative">
        <div className="flex items-center justify-center relative px-5 py-2 text-orange-600 font-bold w-full">
            <div
            className="absolute bottom-[-3px] left-0 right-0 w-full h-[3px] bg-orange-600 rounded-md"
            ></div>
            <div
            tabIndex="0"
            className="text-xl uppercase text-center"
            >
            <span>GỢI Ý HÔM NAY</span>
            </div>
        </div>
      </div>
      <Suggest />
      <Footer/>
    </div>
  );
}

export default Home;
