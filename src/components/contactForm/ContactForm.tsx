import {useState, FC} from "react"
import "./contactForm.css"
import NavLayout from "../navLayout/NavLayout";

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
      <NavLayout>
        <form className="contact-form" onSubmit={onSubmit}>

        <div className="contact-header">
        <h2 style={{fontWeight: 500, marginTop: "5px", marginBottom: 0}}>How can we help?</h2>
        <h4 style={{fontWeight: 400, marginTop: "5px", marginBottom: 0}}>We usually responde in a few hours</h4>
        </div>

        <div className="formBottomSide">
          <p>Full Name</p>
          <input type="text" placeholder="Josh Doe" name="name" required/>
          
          <p>Email Address</p>
          <input type="email" placeholder="example@company.com" name="email" required/>
          
          <p>Title</p>
          <input type="text" name="title" placeholder="Short description of your problem"/>
          
          <p>Message</p>
          <textarea name="message" placeholder="How can we help?" rows={6} required></textarea>
  
          <button type="submit">Submit Form</button>
          <br />
        <span>{result}</span>
        </div>
        </form>
  
      </NavLayout>
    )
}

export default ContactForm 