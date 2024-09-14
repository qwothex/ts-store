import React, {FC} from "react";
import './FAQPage.css'
import HiddenText from "../../components/hiddenText/HiddenText";
import NavBar from "../../components/navBar/NavBar";
import HiddenSection from "../../components/hiddenSection/HiddenSection";
import NavLayout from "../../components/navLayout/NavLayout";


const FAQPage:FC = () => {

    return(
        <NavLayout>
            <div className="FAQPage-container">
            <header>
                <h1>What is an FAQ page?</h1>
                <h4>An FAQ (frequently asked questions) page answers the most common questions customers and other website visitors have. It provides information related to products and policies, allowing people to source answers independently, without support.</h4>
            </header>
            <main>
                <HiddenSection title="Shipping timeframes and methods">
                    <HiddenText question="How long will it take for my order to arrive?" answer="In common, it's been less than 2 days, but sometimes package can delayed in post office." />
                    <HiddenText question="Do you offer express or expedited shipping options?" answer="We didn't. Because our shipping is always fast." />
                    <HiddenText question="Do you offer international shipping?" answer="Yes. You can order our services from every country." />
                    <HiddenText question="What shipping methods do you offer?" answer="We offer 3 shipping methods: 1.Courier delivery: the courier will ship your package right to your door. 2.Post office: the package will be delivered to the closest to you post office, then you need to get it. 3.Pick up from our store: you can order products in our site and then get it in our local store. " />
                </HiddenSection>
                <HiddenSection title="Tracking and updates">
                    <HiddenText question="Is there a tracking number for my order?" answer='You can see your tracking number in "order" section.' />
                    <HiddenText question="How do I track my order's shipping progress?" answer="You can use your tracking number, which must be entered on website of delivery service you choose." />
                    <HiddenText question="Do you offer shipping updates via email or SMS?" answer="Yes. If you choose post office delivery option, when package arrive you will get a message on your phone. Other way, when courier reach your house, he will call you." />
                    <HiddenText question="What happens if my package gets lost or damaged during shipping?" answer="If your package was damaged or lost, please contact to your delivery service." />
                </HiddenSection>
                <HiddenSection title="Address and delivery management">
                    <HiddenText question="Can I change my shipping address after placing the order?" answer="You can't, but if your package wasn't sent already you can cancel order and place it again, with correct shipping address." />
                    <HiddenText question="Can I reroute my package to a different address if I'm not available to receive it?" answer="You can. But in that case you must pay for shipping from current post office to different one." />
                    <HiddenText question="What happens if I miss the delivery attempt?" answer="Your package will be refunded. In common package will wait for you 7 days before it will be send back,so make sure you have enough time to receive it." />
                </HiddenSection>
                <HiddenSection title="General return and exchange questions">
                    <HiddenText question="Can I return or exchange a personalized/customized item?" answer="You can't. If you want to exchange your items, they must be in the same state as it was bought. We didn't accept back any of products what was modified in any way. " />
                    <HiddenText question="Can I return or exchange an item without a receipt?" answer="In that case you need to proof somehow what you actually bought it." />
                    <HiddenText question="How many days do I have to initiate a return or exchange?" answer="You always have 1 week to exchange or return your purchase, if your reason meets the requirements " />
                </HiddenSection>
                <HiddenSection title="General contact information">
                    <HiddenText question="What is your contact information (email address, telegram, etc.)?" answer="Telegram username: @qwothex, email adress: work.nariadov@gmail.com. Feel free to ask any question, if you don't find yours here :)" />
                    <HiddenText question="What are your customer support hours?" answer="You can text us any time, usually it takes a couple hours to answer." />
                </HiddenSection>
                <HiddenSection title="Condition of returned items">
                    <HiddenText question="What condition should the item be in for a successful return or exchange?" answer="For return or exchange item can't be modified in any way, he can`t be damaged or overused" />
                    <HiddenText question="Can I return an item that has been opened/used?" answer="You can, but only if it's not overused or damaged and you have a receipt" />
                    <HiddenText question="Do I need to include all original packaging and accessories when returning an item?" answer="You can have not all packaging, but still need had a receipt and you refund amount can be reduced" />
                    <HiddenText question="Can I return or exchange a damaged or defective item?" answer="Only in case when your item was defective." />
                </HiddenSection>
                <HiddenSection title="Feedback and complaints">
                    <HiddenText question="Can I provide feedback or make a complaint through your contact information?" answer="Sure. We always glad to hear about your experience using our apps, no matter if it's negative." />
                </HiddenSection>
            </main>
            </div>
        </NavLayout>
    )
}

export default FAQPage