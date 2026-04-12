import { useState } from "react"
import { motion } from "framer-motion"

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 }
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
    // Clear error for field being edited
    if (errors[e.target.id]) {
      setErrors({ ...errors, [e.target.id]: "" })
    }
  }

  const validate = () => {
    let tempErrors = {}
    if (!formData.name.trim()) tempErrors.name = "Full Name is required"
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid"
    }
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required"
    if (!formData.message.trim()) tempErrors.message = "Message cannot be empty"
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setLoading(true)

    // Format WhatsApp message
    const text = `Hello, I have an inquiry.\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}`
    const encodedText = encodeURIComponent(text)
    const whatsappUrl = `https://wa.me/919818528815?text=${encodedText}`

    // Small delay to simulate loading for better UX
    setTimeout(() => {
      setLoading(false)
      window.open(whatsappUrl, "_blank")
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 600)
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="page contact-page"
      style={{ backgroundColor: 'var(--bg-section)' }}
    >
      <div className="container">
        <div className="section-header">
          <h4>Contact Us</h4>
          <h2>Get in Touch</h2>
        </div>

        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} className={errors.name ? 'error' : ''} />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" placeholder="Project Inquiry" value={formData.subject} onChange={handleChange} className={errors.subject ? 'error' : ''} />
              {errors.subject && <span className="error-text">{errors.subject}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="Tell us about your project..." rows="5" value={formData.message} onChange={handleChange} className={errors.message ? 'error' : ''}></textarea>
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>
            
            <button className="primary-btn solid-yellow" type="submit" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default Contact
