import {useState, FC} from "react"
import "./contactForm.css"
import { SlMap } from "react-icons/sl";
import { BsTelephoneInbound } from "react-icons/bs";
import { GoMail } from "react-icons/go";
import { SlEarphonesAlt } from "react-icons/sl";


const ContactForm:FC = () => {
    const [result, setResult] = useState("");

    const onSubmit = async (event: any) => {
      event.preventDefault();
      setResult("Sending....");
      const formData = new FormData(event.target);
  
      formData.append("access_key", "506fc2d0-ad5d-4155-8f8f-b2731d634270");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    };
  
    return (
      <>
        <form className="contact-form" onSubmit={onSubmit}>

        <h2 id="contact">How can we help?</h2>
        <h4>We usually responde in a few hours</h4>

        <div className="info">
          <div className="info-column">
            <div className="icon-item-container">
              <div className="icon-item">
                <SlMap className="icon" size={50}/>
                <span>LOCATION</span>
                <h4>Ankara, Turkey</h4>
             </div>
            </div>
            <div className="icon-item-container">
              <div className="icon-item">
               <BsTelephoneInbound className="icon" size={50}/>
               <span>PHONE NUMBER</span>
               <h4>+380669798557</h4>
              </div>
            </div>
          </div>
          <div className="info-column">
            <div className="icon-item-container">
              <div className="icon-item icon-item-email">
                <GoMail className="icon" size={50}/>
                <span>EMAIL</span>
               <h4>work.nariadov@gmail.com</h4>
              </div>
            </div>
           <div className="icon-item-container">
             <div className="icon-item">
               <SlEarphonesAlt className="icon" size={50}/>
               <span>TOLL FREE</span>
               <h4>200 430 5660</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-main">
         <div className="contact-main__inputs">
          <div className="contact-main__inputs-container">
            <input type="text" placeholder="Name*" name="name" required/>
            <input type="email" placeholder="Email*" name="email" required/>
          </div>

          <div className="contact-main__inputs-container">
            <input type="text" name="phone" placeholder="Phone"/>
            <input type="text" name="subject" placeholder="Subject*" required/>
          </div>
         </div>
          
         <div className="contact-main__textarea">
            <textarea name="message" placeholder="Message*" rows={7} required></textarea>
         </div>
         <button type="submit">Submit</button>
        </div>
          <br />
        <span style={{paddingLeft: 5}}>{result}</span>
        </form>
      </>
    )
}

export default ContactForm 