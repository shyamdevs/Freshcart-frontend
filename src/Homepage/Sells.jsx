import React, { useEffect, useState } from "react";
import "../CSS/Sells.css";

export default function DailyBest() {


    const [time, setTime] = useState({
        days: 813,
        hours: 6,
        mins: 25,
        sec: 18
    });



    useEffect(() => {

        const timer = setInterval(() => {

            setTime((prev) => {

                let { days, hours, mins, sec } = prev;


                if(sec > 0){
                    sec--;
                }
                else{

                    sec = 59;

                    if(mins > 0){
                        mins--;
                    }
                    else{

                        mins = 59;

                        if(hours > 0){
                            hours--;
                        }
                        else{

                            hours = 23;

                            if(days > 0){
                                days--;
                            }

                        }
                    }
                }


                return {
                    days,
                    hours,
                    mins,
                    sec
                };

            });


        },1000);



        return () => clearInterval(timer);


    },[]);




    const products = [

        {
            img:"https://freshcart-next-js.vercel.app/images/products/product-img-11.jpg",
            category:"Tea, Coffee & Drinks",
            name:"Roast Ground Coffee",
            price:"$13.5",
            old:"$18"
        },

        {
            img:"https://freshcart-next-js.vercel.app/images/products/product-img-12.jpg",
            category:"Fruits & Vegetables",
            name:"Crushed Tomatoes",
            price:"$13.5",
            old:"$18"
        },

        {
            img:"https://freshcart-next-js.vercel.app/images/products/product-img-13.jpg",
            category:"Fruits & Vegetables",
            name:"Golden Pineapple",
            price:"$14.4",
            old:"$18"
        }

    ];



    return (

        <section className="daily-best">


            <h2>
                Daily Best Sells
            </h2>



            <div className="best-container">



                {/* Banner */}

                <div className="best-banner">


                    <h1>
                        100% Organic Coffee
                        <br/>
                        Beans.
                    </h1>


                    <p>
                        Get the best deal before close.
                    </p>


                    <button>
                        Shop Now →
                    </button>


                </div>





                {/* Products */}


                <div className="products">


                {
                    products.map((item,index)=>(


                        <div className="product-card" key={index}>


                            <img src={item.img} alt={item.name}/>



                            <p className="category">
                                {item.category}
                            </p>



                            <h3>
                                {item.name}
                            </h3>




                            <div className="price">

                                {item.price}

                                <del>
                                    {item.old}
                                </del>


                                <span>
                                    ⭐⭐⭐⭐⭐ 4.3
                                </span>


                            </div>




                            <button className="cart-btn">

                                ＋ Add to cart

                            </button>





                            {/* Countdown Timer */}

                            <div className="timer">


                                <div>
                                    <b>
                                        {time.days}
                                    </b>

                                    <small>
                                        Days
                                    </small>

                                </div>



                                <div>

                                    <b>
                                        {time.hours}
                                    </b>

                                    <small>
                                        Hours
                                    </small>

                                </div>




                                <div>

                                    <b>
                                        {time.mins}
                                    </b>

                                    <small>
                                        Mins
                                    </small>

                                </div>




                                <div>

                                    <b>
                                        {time.sec}
                                    </b>

                                    <small>
                                        Sec
                                    </small>

                                </div>


                            </div>



                        </div>


                    ))
                }


                </div>



            </div>



        </section>

    )

}