import './Contact.css'
import React from 'react'

const Contact = () => {
  return (
    <div id="contact">
      <h1>CONTACT US</h1>
      <form
        action="https://formspree.io/f/mnqknqvk"
        method="POST"
        target="blank"
      >
        <input type="text" name="name" placeholder="Full Name" required />
        <input
          type="email"
          name="_replyto"
          placeholder="Type Your E-Mail"
          required
        />
        <textarea
          name="message"
          placeholder="Write Here...."
          required
        ></textarea>
        <input type="submit" value="Send" />
      </form>
    </div>
  )
}

export default Contact
